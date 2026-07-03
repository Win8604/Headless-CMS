# Phase 04: Performance Optimization

## Context Links
- Plan: [plan.md](./plan.md)
- Phase trước: [Phase 01: Code Refactoring](./phase-01-code-refactoring.md)
- Phase liên quan: [Phase 03: SEO Optimization](./phase-03-seo-optimization.md)
- Main page: [index.html](../../index.html)
- Assets: `assets/images/` — chứa các banner images lớn
- Package.json: [package.json](../../package.json) — `jimp` đã installed

---

## Overview
- **Priority:** 🟡 Medium
- **Status:** ⏳ Pending
- **Depends on:** Phase 01 (CSS đã tổ chức lại)
- **Blocks:** Phase 06 (Testing & QA)

**Mô tả:** Các banner images hiện tại rất lớn (Main-Banner-2.png = 2.8MB, Main-Banner-3.png = 2MB), không có lazy loading, Bootstrap CSS chứa nhiều unused rules, và không có critical CSS separation. Phase này tối ưu toàn diện để đạt Lighthouse Performance > 80, LCP < 2.5s.

---

## Key Insights
- `Main-Banner-2.png` (2.8MB) và `Main-Banner-3.png` (2MB) là major LCP bottlenecks
- Không có `loading="lazy"` trên bất kỳ `<img>` nào trong page
- Bootstrap 5.3.8 full CSS ~220KB → nhiều components không dùng (modals, carousel styles thừa, v.v.)
- `jimp` đã được install trong `package.json` → có thể dùng để compress/resize images
- WebP format có thể giảm file size 30-40% so với PNG
- Critical CSS (above-the-fold) nên được inline trong `<head>` để tránh render-blocking
- No-JS skeleton cần được đảm bảo trong trường hợp JS chưa load xong

---

## Requirements

### Functional
- Tất cả `<img>` elements có `loading="lazy"` (trừ LCP image — above-the-fold banner đầu tiên)
- Banner images được convert sang WebP với fallback PNG
- LCP image (first banner) được preload với `<link rel="preload">`
- Bootstrap CSS được purge các unused rules
- Critical CSS được tách và inline trong `<head>`
- `width` và `height` attributes được thêm vào tất cả `<img>` để tránh CLS (Cumulative Layout Shift)

### Non-functional
- Lighthouse Performance score > **80**
- LCP (Largest Contentful Paint) < **2.5s**
- CLS (Cumulative Layout Shift) < **0.1**
- FID/INP (Interaction to Next Paint) < **200ms**
- Total page weight giảm ít nhất **50%** so với hiện tại

---

## Architecture

### Image Optimization Pipeline
```
Original PNG (2-3MB)
      ↓ [jimp resize]
Resized PNG (max 1920px wide)
      ↓ [cwebp / sharp]
WebP version (500-800KB)
      ↓ [<picture> element with fallback]
Browser serves WebP nếu supported, PNG nếu không
```

### `<picture>` Element Pattern
```html
<picture>
  <source srcset="assets/images/Main-Banner-2.webp" type="image/webp">
  <img src="assets/images/Main-Banner-2.png"
       alt="FPT Telecom Internet Cáp Quang"
       width="1920" height="600"
       loading="lazy">
</picture>
```

### LCP Image Preload Pattern
```html
<head>
  <!-- Preload LCP image (first banner) — KHÔNG lazy load -->
  <link rel="preload" as="image" href="assets/images/Main-Banner-1.webp" type="image/webp">
</head>
```

### Critical CSS Inline Pattern
```html
<head>
  <style>
    /* Critical CSS — above the fold only */
    /* Header, hero banner, navigation */
    :root { --primary-color: ...; }
    header { ... }
    .hero-banner { ... }
    nav { ... }
  </style>
  <!-- Non-critical CSS loaded asynchronously -->
  <link rel="stylesheet" href="assets/css/style.css" media="print" onload="this.media='all'">
</head>
```

### Bootstrap CSS Purge Strategy
```
Bootstrap full CSS (220KB)
      ↓ [PurgeCSS hoặc manual]
Bootstrap used CSS (~60-80KB)
      ↓ [minification]
Bootstrap minified (~45-60KB)
```

---

## Related Code Files

### Modify
- `index.html` — Thêm `loading="lazy"`, `width/height`, `<picture>` elements, preload tags, inline critical CSS
- `assets/css/style.css` — Remove unused rules (từ Phase 01 audit)

### Create
- `scripts/optimize-images.js` — Node.js script dùng `jimp` để resize và compress images
- `assets/images/*.webp` — WebP versions của tất cả banner images
- `assets/css/critical.css` — Critical above-the-fold CSS (sẽ inline vào HTML)

### Review Only
- `package.json` — Verify `jimp` version và thêm npm scripts nếu cần

---

## Implementation Steps

1. **Audit tất cả images**
   - List tất cả `<img>` và background images trong `index.html` và `style.css`
   - Ghi lại file size hiện tại của từng image
   - Identify LCP image (image lớn nhất, visible trong viewport khi load)

2. **Tạo image optimization script**
   - Tạo `scripts/optimize-images.js` sử dụng `jimp`
   - Script resize images xuống max 1920px width (giữ aspect ratio)
   - Script compress PNG quality
   - Thêm npm script: `"optimize-images": "node scripts/optimize-images.js"`

3. **Convert images sang WebP**
   - Cài `cwebp` CLI tool hoặc sử dụng online converter
   - Convert từng banner PNG sang WebP
   - Verify chất lượng visual sau conversion
   - Target: < 500KB cho mỗi banner WebP

4. **Update HTML: thêm `<picture>` elements**
   - Wrap từng `<img>` banner với `<picture>` element
   - Thêm WebP source với fallback PNG
   - Thêm explicit `width` và `height` attributes
   - Thêm descriptive `alt` text

5. **Implement lazy loading**
   - Thêm `loading="lazy"` vào tất cả `<img>` NGOẠI TRỪ LCP image
   - LCP image (first visible banner): thêm `loading="eager"` (explicit)

6. **Preload LCP image**
   - Thêm `<link rel="preload">` cho LCP banner WebP
   - Đặt trong `<head>` trước tất cả stylesheets

7. **Extract và inline Critical CSS**
   - Identify CSS cần cho above-the-fold render: variables, header, nav, hero banner
   - Extract vào `assets/css/critical.css`
   - Inline content của file này vào `<head>` như `<style>` block
   - Load toàn bộ `style.css` asynchronously với print media hack

8. **Bootstrap CSS optimization**
   - Dùng Chrome DevTools Coverage tab để identify unused Bootstrap CSS
   - Tạo custom Bootstrap build chỉ include components được dùng, HOẶC
   - Sử dụng PurgeCSS để strip unused selectors
   - Minify Bootstrap CSS output

9. **Optimize font loading**
   - Thêm `font-display: swap` vào tất cả `@font-face` declarations
   - Preload critical fonts với `<link rel="preload" as="font">`

10. **Minify CSS và JavaScript**
    - Minify `style.css` nếu không có build pipeline
    - Defer non-critical JavaScript với `defer` attribute

11. **Chạy Lighthouse và iterate**
    - Chạy Lighthouse Performance audit
    - Address từng cụ thể recommendation
    - Mục tiêu: Performance > 80, LCP < 2.5s, CLS < 0.1

---

## Todo List

- [ ] Audit tất cả images (filename, size, dimensions, visible trong viewport?)
- [ ] Identify LCP image
- [ ] Tạo `scripts/optimize-images.js` với jimp
- [ ] Chạy script để resize/compress PNG images
- [ ] Convert tất cả banner images sang WebP format
- [ ] Verify WebP quality (visual comparison)
- [ ] Update HTML: wrap banners với `<picture>` elements
- [ ] Thêm `width` và `height` vào tất cả `<img>` elements
- [ ] Thêm `loading="lazy"` vào tất cả non-LCP images
- [ ] Thêm `loading="eager"` vào LCP image
- [ ] Thêm `<link rel="preload">` cho LCP image WebP
- [ ] Extract critical above-the-fold CSS
- [ ] Inline critical CSS vào `<head>`
- [ ] Setup async loading cho non-critical CSS
- [ ] Bootstrap CSS purge/optimization
- [ ] Thêm `font-display: swap` vào font declarations
- [ ] Add `defer` cho non-critical JS scripts
- [ ] Chạy Lighthouse → fix issues → target Performance > 80
- [ ] Verify LCP < 2.5s
- [ ] Verify CLS < 0.1

---

## Success Criteria
- ✅ Lighthouse Performance score **> 80**
- ✅ LCP (Largest Contentful Paint) **< 2.5s**
- ✅ CLS (Cumulative Layout Shift) **< 0.1**
- ✅ Tất cả banner images có WebP version được serve
- ✅ Tất cả non-LCP `<img>` có `loading="lazy"`
- ✅ Tất cả `<img>` có `width` và `height` attributes
- ✅ LCP image được preload với `<link rel="preload">`
- ✅ Critical CSS được inline trong `<head>`
- ✅ Tổng page weight giảm ít nhất **50%**
- ✅ Banner images < **500KB** mỗi file (WebP)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| WebP không được support (IE11) | Low | Low | `<picture>` element tự động fallback về PNG |
| Critical CSS extraction thiếu sót | Medium | Medium | Test visual trên nhiều viewport sizes trước khi async-load full CSS |
| Bootstrap purge xóa nhầm used styles | Medium | High | Test toàn bộ components sau purge, dùng safelist cho dynamic classes |
| Image resize làm giảm chất lượng visual | Low | High | Preview trước khi commit, giữ nguyên PNG gốc như backup |
| LCP tệ hơn do preload conflict | Low | Medium | Test với và không có preload, dùng Lighthouse để verify |

---

## Security Considerations
- Không có security implications trực tiếp từ performance optimization
- Đảm bảo không inline bất kỳ user-generated content nào vào critical CSS
- WebP files vẫn phải được serve với đúng MIME type: `image/webp`

---

## Next Steps
- Sau Phase 04 → **Phase 05: Analytics & Tracking** (Google Analytics setup)
- Phase 06 (Testing & QA) sẽ verify toàn bộ Lighthouse scores từ Phase 03 và 04
- Nếu Performance vẫn < 80 sau Phase 04 → consider server-side compression (gzip/brotli) trong Phase 06
