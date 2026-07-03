# Phase 03: SEO Optimization

## Context Links
- Plan: [plan.md](./plan.md)
- Phase trước: [Phase 01: Code Refactoring](./phase-01-code-refactoring.md)
- Main page: [index.html](../../index.html)
- Server: [server.js](../../server.js) — cần serve robots.txt và sitemap.xml

---

## Overview
- **Priority:** 🟡 Medium
- **Status:** ⏳ Pending
- **Depends on:** Phase 01 (clean HTML structure)
- **Blocks:** Phase 06 (Testing & QA)

**Mô tả:** `index.html` hiện tại chỉ có title cơ bản `FPT Telecom - Internet Cáp Quang`, thiếu meta description, Open Graph tags, Twitter Cards, canonical URL, và structured data. Phase này implement đầy đủ SEO best practices để đạt Lighthouse SEO score > 90.

---

## Key Insights
- Hiện tại không có `<meta name="description">` → Google sẽ tự generate snippet (không tối ưu)
- Không có OG/Twitter tags → khi share lên Facebook/Zalo sẽ không có preview đẹp
- Không có `canonical` URL → có thể bị duplicate content nếu có nhiều URLs trỏ đến cùng page
- LocalBusiness schema giúp Google hiển thị rich snippets (địa chỉ, giờ làm việc, phone)
- FPT Telecom là local business → LocalBusiness + InternetServiceProvider schema phù hợp
- `robots.txt` cần thiết để guide search engine crawlers
- `sitemap.xml` cần thiết mặc dù chỉ có 1 page (helps with indexing speed)
- Vietnamese language tag `lang="vi"` cần được thêm vào `<html>` nếu chưa có

---

## Requirements

### Functional
- `<meta name="description">` với nội dung Vietnamese mô tả dịch vụ Internet FPT
- Open Graph tags cho Facebook/Zalo sharing preview
- Twitter Card tags
- Canonical URL tag
- `lang="vi"` trên `<html>` element
- Structured data: `LocalBusiness` + `InternetServiceProvider` JSON-LD
- `robots.txt` phục vụ tại `/robots.txt`
- `sitemap.xml` phục vụ tại `/sitemap.xml`
- Proper heading hierarchy: một `<h1>` duy nhất per page

### Non-functional
- Lighthouse SEO score > 90
- Không thêm external dependencies
- `robots.txt` và `sitemap.xml` được serve bởi `server.js`

---

## Architecture

### Meta Tags Structure
```html
<head>
  <!-- Primary Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="...">
  <meta name="keywords" content="internet FPT, cáp quang FPT, ...">
  <meta name="author" content="FPT Telecom">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://fpt.vn/">

  <!-- Open Graph (Facebook/Zalo) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="...">
  <meta property="og:url" content="...">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="FPT Telecom">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="...">
  <meta name="twitter:description" content="...">
  <meta name="twitter:image" content="...">

  <!-- Structured Data -->
  <script type="application/ld+json">{ "@context": "...", "@type": "LocalBusiness" }</script>
</head>
```

### LocalBusiness JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "InternetServiceProvider"],
  "name": "FPT Telecom",
  "description": "Dịch vụ Internet cáp quang tốc độ cao FPT Telecom",
  "url": "https://fpt.vn",
  "telephone": "19006600",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressLocality": "TP. Hồ Chí Minh"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "07:30",
    "closes": "22:00"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Gói Cước Internet",
    "itemListElement": [/* 6 packages */]
  }
}
```

---

## Related Code Files

### Modify
- `index.html` — Thêm meta tags, canonical, lang attribute, JSON-LD schema, fix heading hierarchy
- `server.js` — Thêm routes để serve `robots.txt` và `sitemap.xml`

### Create
- `robots.txt` — Search engine crawler instructions
- `sitemap.xml` — XML sitemap với 1 URL (landing page)

---

## Implementation Steps

1. **Audit heading hierarchy trong index.html**
   - Tìm tất cả `<h1>`, `<h2>`, `<h3>` elements
   - Đảm bảo chỉ có **một** `<h1>` chứa main headline của page
   - Điều chỉnh heading levels cho đúng hierarchy (h1 → h2 → h3)

2. **Thêm `lang="vi"` vào `<html>` tag**
   - `<html lang="vi">` hoặc `<html lang="vi-VN">`

3. **Viết và thêm meta description**
   - Độ dài: 150-160 ký tự
   - Nội dung: bao gồm keyword chính, benefit, CTA
   - Ví dụ: *"Đăng ký Internet cáp quang FPT tốc độ cao từ 200Mbps. Gói Giga, Sky, Meta với giá ưu đãi. Kỹ thuật lắp đặt miễn phí tại nhà. Hotline 19006600."*

4. **Thêm meta keywords và author**
   - Keywords: `internet FPT, cáp quang FPT, gói cước internet, đăng ký internet FPT, FPT Telecom`

5. **Thêm Open Graph tags**
   - Tạo/chọn OG image (1200×630px) — dùng banner hiện có hoặc generate new
   - Fill tất cả required OG properties

6. **Thêm Twitter Card tags**
   - `summary_large_image` type
   - Reuse OG image

7. **Thêm canonical URL**
   - `<link rel="canonical" href="https://[domain]/">` — điều chỉnh domain thực

8. **Tạo JSON-LD structured data**
   - LocalBusiness + InternetServiceProvider schema
   - Bao gồm tất cả 6 packages trong `hasOfferCatalog`
   - Thêm vào `<head>` của `index.html`

9. **Tạo `robots.txt`**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://[domain]/sitemap.xml
   ```

10. **Tạo `sitemap.xml`**
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://[domain]/</loc>
        <lastmod>2026-07-03</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>
    ```

11. **Thêm routes trong server.js**
    - `GET /robots.txt` → serve `./robots.txt`
    - `GET /sitemap.xml` → serve `./sitemap.xml`

12. **Verify với Lighthouse**
    - Chạy Lighthouse SEO audit
    - Fix bất kỳ issues nào được báo cáo

---

## Todo List

- [ ] Audit và fix heading hierarchy (chỉ 1 `<h1>`)
- [ ] Thêm `lang="vi"` vào `<html>` tag
- [ ] Viết meta description (150-160 ký tự, Vietnamese)
- [ ] Thêm meta keywords và author
- [ ] Chọn/tạo OG image (1200×630px)
- [ ] Thêm Open Graph meta tags
- [ ] Thêm Twitter Card meta tags
- [ ] Thêm canonical URL
- [ ] Tạo LocalBusiness JSON-LD schema
- [ ] Thêm JSON-LD `<script>` vào `<head>`
- [ ] Tạo `robots.txt`
- [ ] Tạo `sitemap.xml`
- [ ] Thêm routes trong `server.js` để serve robots.txt và sitemap.xml
- [ ] Chạy Lighthouse SEO audit → score > 90
- [ ] Validate JSON-LD tại schema.org validator
- [ ] Test OG tags tại Facebook Sharing Debugger

---

## Success Criteria
- ✅ Lighthouse SEO score **> 90**
- ✅ Có `<meta name="description">` với nội dung ý nghĩa
- ✅ Đầy đủ Open Graph tags (type, title, description, image, url)
- ✅ Đầy đủ Twitter Card tags
- ✅ Canonical URL được set
- ✅ `<html lang="vi">` được set
- ✅ Chỉ có **một** `<h1>` element trên page
- ✅ JSON-LD LocalBusiness schema validate thành công
- ✅ `/robots.txt` trả về HTTP 200 với content đúng
- ✅ `/sitemap.xml` trả về HTTP 200 với valid XML

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| OG image URL không accessible | Medium | Medium | Dùng absolute URL, test sau deploy |
| JSON-LD syntax error | Low | Medium | Validate tại https://validator.schema.org |
| Canonical URL sai domain | Medium | High | Dùng placeholder, update khi deploy |
| Heading hierarchy phá layout | Low | Medium | Chỉ thay đổi semantic tag, không xóa CSS classes |

---

## Security Considerations
- Canonical và OG URLs không nên hard-code development URL (`localhost`)
- Dùng environment variable `SITE_URL` để configure canonical domain
- Không expose internal paths hoặc server structure trong sitemap

---

## Next Steps
- Sau Phase 03 → **[Phase 04: Performance Optimization](./phase-04-performance-optimization.md)**
- Phase 06 (Testing & QA) sẽ verify Lighthouse scores từ Phase 03 và 04
