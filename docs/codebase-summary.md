# Tóm Tắt Codebase

> Tài liệu mô tả tổng quan về codebase dự án **FPT Internet Landing Page**

---

## 1. Thống Kê Tổng Quan

| File | Loại | Dòng | Mô tả |
|------|------|------|-------|
| `index.html` | HTML | 3541 | Single-page HTML chính, toàn bộ UI |
| `assets/css/style.css` | CSS | 562 | Stylesheet tùy chỉnh toàn trang |
| `server.js` | Node.js | 233 | Mock REST API server + static file serving |
| `package.json` | Config | ~20 | NPM dependencies và scripts |
| `.env` | Config | 2 | Biến môi trường (không commit) |

### Tổng kết

- **Tổng dòng code:** ~4.358 dòng
- **Số file HTML:** 1 (single-page architecture)
- **Số file CSS:** 1 (style.css)
- **Số file JS backend:** 1 (server.js)
- **Số assets (images):** 60 file PNG
- **Số NPM packages:** 3 (bootstrap, bootstrap-icons, jimp)

---

## 2. Kiến Trúc & Quyết Định Thiết Kế

### 2.1 Single-Page Design

**Quyết định:** Toàn bộ trang web nằm trong một file `index.html` duy nhất.

**Lý do:**
- Đơn giản hóa deployment (chỉ cần 1 file HTML)
- Không cần router hoặc SPA framework
- Loading nhanh vì không có page transitions
- Phù hợp với mục đích landing page (không cần multi-page)

**Trade-offs:**
- File HTML lớn (3541 dòng) — khó maintain nếu trang mở rộng
- Khó tái sử dụng component
- Không có code splitting

### 2.2 Mock REST API

**Quyết định:** `server.js` cung cấp mock data thay vì gọi trực tiếp HCMS.

**Lý do:**
- Cho phép phát triển frontend độc lập với CMS backend
- Dễ dàng test và demo
- CMS URL được cấu hình qua `.env` để dễ chuyển đổi

**Lộ trình:** Phase 2 sẽ thay mock data bằng real CMS API calls.

### 2.3 Static File Serving

**Quyết định:** `server.js` phục vụ cả static files lẫn API.

**Lý do:**
- Không cần web server riêng (Nginx/Apache) trong development
- Đơn giản hóa local setup
- Dễ dàng thêm CORS headers và MIME types tùy chỉnh

---

## 3. Phân Tích File index.html (3541 dòng)

### 3.1 Cấu Trúc Tổng Quan

```
index.html
├── <head> (dòng 1-50)
│   ├── Meta tags, title, SEO
│   ├── Bootstrap CSS
│   ├── Bootstrap Icons
│   ├── Google Fonts (Outfit)
│   └── style.css
│
├── <body> (dòng 51-3500)
│   ├── Navbar (dòng ~52-150)
│   ├── Hero Section (dòng ~151-400)
│   │   ├── Banner Slider
│   │   └── Registration Form
│   ├── Marquee Section (dòng ~401-450)
│   ├── Pricing Section (dòng ~451-900)
│   │   └── 6 Package Cards
│   ├── WiFi 7 Section (dòng ~901-1100)
│   ├── FPT Play Box Section (dòng ~1101-1300)
│   ├── Promotions Section (dòng ~1301-1500)
│   ├── Trust/News Section (dòng ~1501-2500)
│   ├── FAQ Section (dòng ~2501-3200)
│   └── Footer (dòng ~3201-3480)
│
└── <script> block (dòng ~3481-3541)
    ├── Bootstrap JS
    └── Inline JavaScript
```

### 3.2 Chi Tiết Từng Section

| Section | Khoảng dòng | Components chính |
|---------|-------------|-----------------|
| Head | 1-50 | Meta, links, preload |
| Navbar | 51-150 | Logo, nav links, hotline, CTA |
| Hero | 151-400 | Carousel/slider, registration form |
| Marquee | 401-450 | Scrolling text/logos |
| Pricing | 451-900 | 6 package cards với tabs |
| WiFi 7 | 901-1100 | Feature highlights, image |
| FPT Play Box | 1101-1300 | Product showcase |
| Promotions | 1301-1500 | Promotional banners |
| Trust/News | 1501-2500 | Stats, news cards, testimonials |
| FAQ | 2501-3200 | Accordion FAQ items |
| Footer | 3201-3480 | Links, company info, social |
| Script | 3481-3541 | JS initialization |

---

## 4. Phân Tích File style.css (562 dòng)

### 4.1 Phân Bổ Dòng Theo Section

| Section | Khoảng dòng | Dòng |
|---------|-------------|------|
| CSS Variables & Base | 1-60 | ~60 |
| Navbar styles | 61-120 | ~60 |
| Hero & Slider | 121-200 | ~80 |
| Marquee | 201-230 | ~30 |
| Pricing cards | 231-330 | ~100 |
| WiFi & Play Box | 331-410 | ~80 |
| Promotions | 411-445 | ~35 |
| Trust/News | 446-490 | ~45 |
| FAQ Accordion | 491-525 | ~35 |
| Footer | 526-550 | ~25 |
| Responsive/Media | 551-562 | ~12 |

### 4.2 Key CSS Classes Inventory

#### Button Classes

| Class | Mô tả | Màu sắc |
|-------|-------|---------|
| `.btn-orange` | Nút chính màu cam | bg: #FF7E00, text: white |
| `.btn-outline-orange` | Nút viền cam | border: #FF7E00, text: #FF7E00 |
| `.btn-register` | Nút đăng ký (hero form) | Gradient cam đậm |
| `.btn-phone` | Nút gọi điện thoại | Với icon phone |
| `.btn-zalo` | Nút liên hệ Zalo | Màu xanh Zalo |
| `.signup-button` | Nút đăng ký gói cước | Màu cam FPT |

#### Layout Classes

| Class | Mô tả |
|-------|-------|
| `.hero-title` | Tiêu đề chính section Hero |
| `.hero-subtitle` | Phụ đề section Hero |
| `.marquee-container` | Container băng chuyền |
| `.pricing-tag` | Nhãn giá gói cước |
| `.trust-card` | Card thành tựu/tin tức |
| `.promotional-banner` | Banner khuyến mãi |

#### Component Classes

| Class | Mô tả |
|-------|-------|
| `.faq-accordion` | Container FAQ accordion |
| `.fpt-footer` | Footer toàn trang |
| `.hero-slider` | Banner slider chính |
| `.package-card` | Card gói cước |
| `.wifi-feature` | Feature item WiFi section |

---

## 5. Phân Tích File server.js (233 dòng)

### 5.1 Cấu Trúc

```javascript
// server.js structure
├── Imports & Config (dòng 1-20)
│   ├── http module
│   ├── fs module
│   ├── path module
│   └── dotenv config
│
├── CORS Headers (dòng 21-40)
├── MIME Types Map (dòng 41-60)
├── Static File Server (dòng 61-100)
│
├── Mock Data (dòng 101-180)
│   ├── banners data
│   ├── packages data
│   ├── promotions data
│   ├── menus data
│   ├── footer settings
│   ├── footer links
│   └── faqs data
│
├── API Route Handler (dòng 181-220)
│   ├── GET /api/fpt/banners
│   ├── GET /api/fpt/packages
│   ├── GET /api/fpt/promotions
│   ├── GET /api/fpt/menus
│   ├── GET /api/fpt/footer/settings
│   ├── GET /api/fpt/footer/links
│   ├── GET /api/fpt/faqs
│   └── POST /api/fpt/registrations
│
└── Server Start (dòng 221-233)
```

### 5.2 Đặc Điểm Kỹ Thuật

- Sử dụng Node.js `http` module thuần túy (không dùng Express)
- CORS được set thủ công với `Access-Control-Allow-Origin: *`
- MIME types được map thủ công cho các loại file
- Static files được serve từ thư mục gốc của project
- Mock data được hardcode trong file (cần migrate sang CMS)

---

## 6. Assets Inventory

### 6.1 Images (60 file PNG)

| Nhóm | Pattern | Số lượng ước tính | Mô tả |
|------|---------|---------|-------|
| Logo | `logo*.png` | 2-3 | Logo FPT các variant |
| Hero Banners | `banner*.png` | 5-8 | Ảnh banner slider |
| Package Images | `package*.png`, `giga*.png` | 10-15 | Ảnh minh họa gói cước |
| WiFi Section | `wifi*.png` | 3-5 | Ảnh công nghệ WiFi 7 |
| FPT Play Box | `playbox*.png` | 3-5 | Ảnh sản phẩm Play Box |
| Trust/News | `trust*.png`, `news*.png` | 10-15 | Ảnh tin tức, thành tựu |
| Decorative | Các ảnh còn lại | 10-15 | Ảnh trang trí, icons |

### 6.2 Dependencies (node_modules)

| Package | Version | Mục đích |
|---------|---------|---------|
| `bootstrap` | 5.3.8 | UI framework, grid system |
| `bootstrap-icons` | Latest | Icon library (SVG) |
| `jimp` | Latest | Xử lý ảnh phía server |

---

## 7. Vấn Đề Kỹ Thuật & Tech Debt

### 7.1 Vấn Đề Đã Biết (Known Issues)

| ID | Vấn đề | Mức độ | Giải pháp đề xuất |
|----|--------|--------|------------------|
| TD-001 | `index.html` quá lớn (3541 dòng) | Cao | Tách thành components/partials |
| TD-002 | Mock data hardcoded trong `server.js` | Cao | Kết nối CMS thật (Phase 2) |
| TD-003 | Inline JavaScript trong HTML | Trung bình | Tách ra file JS riêng |
| TD-004 | Thiếu error boundary khi API fail | Trung bình | Thêm fallback content |
| TD-005 | Không có caching strategy | Trung bình | Thêm HTTP cache headers |
| TD-006 | Images chưa được lazy-load | Thấp | Thêm `loading="lazy"` |
| TD-007 | Thiếu sitemap.xml và robots.txt | Thấp | Tạo file SEO cơ bản |
| TD-008 | Không có loading states | Thấp | Thêm skeleton UI |

### 7.2 Security Concerns

| ID | Vấn đề | Mức độ | Giải pháp |
|----|--------|--------|----------|
| SEC-001 | CORS set `*` (allow all origins) | Trung bình | Restrict to production domain |
| SEC-002 | API key trong `.env` (không commit) | Thấp | OK nếu không commit |
| SEC-003 | Không có rate limiting trên registrations | Trung bình | Thêm rate limit middleware |

### 7.3 Performance Concerns

| ID | Vấn đề | Mức độ | Giải pháp |
|----|--------|--------|----------|
| PERF-001 | 60 images không có compression | Cao | Chuyển sang WebP, optimize |
| PERF-002 | Bootstrap full bundle (không tree-shake) | Trung bình | Chỉ import modules cần dùng |
| PERF-003 | Google Fonts block render | Thấp | Thêm `font-display: swap` |

---

## 8. Data Flow

```
User Browser
    |
    v
[index.html loaded from server.js port 3001]
    |
    v
[JavaScript DOMContentLoaded]
    |
    +-- fetch('/api/fpt/banners')     --> Render Hero Slider
    +-- fetch('/api/fpt/packages')    --> Render Pricing Cards
    +-- fetch('/api/fpt/promotions')  --> Render Promotion Banners
    +-- fetch('/api/fpt/menus')       --> Render Navigation
    +-- fetch('/api/fpt/footer/...')  --> Render Footer
    +-- fetch('/api/fpt/faqs')        --> Render FAQ Accordion
    |
    v
[User fills Registration Form]
    |
    v
POST /api/fpt/registrations --> Log to console (mock)
```

---

## 9. Liên Kết

- [Project Overview](./project-overview-pdr.md)
- [Design Guidelines](./design-guidelines.md)
- [System Architecture](./system-architecture.md)
- [Code Standards](./code-standards.md)
