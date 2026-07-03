# Phase 01: Code Refactoring

## Context Links
- Plan: [plan.md](./plan.md)
- File chính: [index.html](../../index.html) — 3541 lines
- Stylesheet: [style.css](../../assets/css/style.css) — 562 lines

---

## Overview
- **Priority:** 🔴 High
- **Status:** ⏳ Pending
- **Depends on:** Nothing (base phase)
- **Blocks:** Phase 02, 03, 04

**Mô tả:** `index.html` hiện tại là 3541 lines — quá lớn để maintain. `style.css` có các `:root` CSS variables bị duplicate và overriding nhau, nhiều `!important` override thừa. Phase này tổ chức lại code mà không thay đổi visual output.

---

## Key Insights
- HTML file 3541 lines chứa toàn bộ: header, nav, banners, packages, FAQ, footer, modals, scripts
- `style.css` có nhiều `:root {}` block khai báo trùng lặp variable
- Inline `<style>` tags rải rác trong `index.html` cần extract ra file CSS
- Bootstrap 5.3.8 đã được dùng → tận dụng utility classes, bớt custom CSS
- Không có build system (Vite/Webpack) → dùng HTML comment sections thay vì file includes

---

## Requirements

### Functional
- Không thay đổi giao diện visual sau refactor
- Tất cả links, modals, JavaScript vẫn hoạt động bình thường
- Responsive layout giữ nguyên

### Non-functional
- Mỗi CSS section có comment header rõ ràng
- Loại bỏ tất cả duplicate `:root` CSS variable declarations
- Giảm `!important` usage xuống minimum cần thiết
- `style.css` tổ chức theo thứ tự: Variables → Reset → Layout → Components → Sections → Utilities → Media Queries

---

## Architecture

### CSS Organization Structure
```
assets/css/style.css
├── /* === 1. CSS VARIABLES (single :root block) === */
├── /* === 2. GLOBAL RESET & BASE === */
├── /* === 3. LAYOUT & GRID === */
├── /* === 4. COMPONENTS (buttons, cards, badges) === */
├── /* === 5. HEADER & NAVIGATION === */
├── /* === 6. HERO / BANNER SECTION === */
├── /* === 7. PACKAGES SECTION === */
├── /* === 8. PROMOTIONS SECTION === */
├── /* === 9. FAQ SECTION === */
├── /* === 10. FOOTER === */
├── /* === 11. MODALS === */
├── /* === 12. UTILITIES === */
└── /* === 13. MEDIA QUERIES === */
```

### HTML Section Comments
```html
<!-- ==================== HEADER ==================== -->
<!-- ==================== HERO BANNER ==================== -->
<!-- ==================== PACKAGES ==================== -->
<!-- ==================== PROMOTIONS ==================== -->
<!-- ==================== FAQ ==================== -->
<!-- ==================== FOOTER ==================== -->
<!-- ==================== MODALS ==================== -->
<!-- ==================== SCRIPTS ==================== -->
```

---

## Related Code Files

### Modify
- `index.html` — Thêm section comments, extract inline CSS, organize `<script>` tags
- `assets/css/style.css` — Merge duplicate `:root`, loại bỏ `!important` thừa, tổ chức theo sections

### Review Only
- `server.js` — Không thay đổi trong phase này
- `assets/js/*.js` — Không thay đổi trong phase này

---

## Implementation Steps

1. **Audit CSS variables**
   - Grep tất cả `:root` blocks trong `style.css`
   - Lập danh sách tất cả variables, identify duplicates
   - Xác định giá trị nào là "final" (giá trị cuối cùng override)

2. **Audit inline styles**
   - Grep `<style>` tags trong `index.html`
   - List tất cả inline CSS rules cần extract

3. **Merge CSS variables**
   - Tạo single `:root {}` block với tất cả unique variables
   - Dùng giá trị cuối cùng (override value) làm canonical value
   - Xóa tất cả `:root {}` blocks trùng lặp

4. **Extract inline CSS**
   - Move tất cả `<style>` tag content từ `index.html` vào `style.css`
   - Đặt vào đúng section trong CSS file
   - Xóa `<style>` tags khỏi `index.html`

5. **Organize CSS by sections**
   - Thêm section comment headers vào `style.css`
   - Di chuyển rules vào đúng section (header rules → HEADER section, v.v.)
   - Review và xóa `!important` không cần thiết (test visual sau mỗi lần xóa)

6. **Add HTML section comments**
   - Thêm comment headers vào `index.html` để phân chia các sections rõ ràng
   - Đảm bảo mỗi major section có opening và closing comment

7. **Audit and clean unused CSS**
   - Identify CSS selectors không có element tương ứng trong HTML
   - Comment out (không xóa ngay) các suspected unused rules
   - Verify visually trước khi xóa vĩnh viễn

8. **Final visual verification**
   - So sánh screenshot trước/sau
   - Test responsive trên mobile (375px), tablet (768px), desktop (1440px)
   - Test tất cả modals và interactive components

---

## Todo List

- [ ] Grep và audit tất cả `:root {}` blocks trong `style.css`
- [ ] List tất cả `<style>` inline tags trong `index.html`
- [ ] Tạo single merged `:root {}` block
- [ ] Extract tất cả inline `<style>` tags vào `style.css`
- [ ] Thêm section comments vào `style.css`
- [ ] Reorganize CSS rules theo section order
- [ ] Giảm/loại bỏ `!important` không cần thiết
- [ ] Thêm section comments vào `index.html`
- [ ] Audit unused CSS selectors
- [ ] Visual regression test (mobile/tablet/desktop)
- [ ] Test tất cả modals và JS interactions

---

## Success Criteria
- ✅ `style.css` chỉ có **một** `:root {}` block
- ✅ Không còn `<style>` inline tags trong `index.html`
- ✅ CSS được tổ chức theo 13 sections có comment headers
- ✅ `!important` giảm xuống < 10 occurrences
- ✅ Visual layout giống hệt trước refactor (screenshot comparison)
- ✅ Tất cả JavaScript interactions hoạt động bình thường
- ✅ `index.html` có section comment headers rõ ràng

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Breaking visual layout khi xóa `!important` | Medium | High | Test từng rule một, commit sau mỗi nhóm changes |
| Missed CSS rules khi reorganize | Medium | Medium | Use grep để verify sau khi move rules |
| JavaScript phụ thuộc vào inline CSS class | Low | High | Grep JS files cho class names trước khi xóa |

**Backup strategy:** Commit toàn bộ changes trước phase này. Tạo branch `refactor/phase-01` riêng biệt.

---

## Security Considerations
- Không có security implications trực tiếp
- Đảm bảo không vô tình remove CSP headers hoặc security-related meta tags trong `index.html`

---

## Next Steps
- Sau khi Phase 01 hoàn thành → bắt đầu **[Phase 02: CMS Integration](./phase-02-cms-integration.md)**
- Phase 01 cũng unblocks **[Phase 03: SEO Optimization](./phase-03-seo-optimization.md)** và **[Phase 04: Performance](./phase-04-performance-optimization.md)**
