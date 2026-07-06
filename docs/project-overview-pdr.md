# Tổng Quan Dự Án & Tài Liệu Tham Chiếu Dự Án (PDR)

> **FPT Internet Landing Page** — Trang đích giới thiệu dịch vụ Internet FPT Telecom

---

## 1. Mục Tiêu Dự Án

### 1.1 Mục Tiêu Tổng Quát

Xây dựng một trang đích (landing page) chuyên nghiệp, tối ưu hiệu suất để giới thiệu các gói dịch vụ Internet của **CÔNG TY CỔ PHẦN VIỄN THÔNG FPT**, nhằm:

- Trình bày rõ ràng và hấp dẫn các gói cước Internet cho khách hàng cá nhân và gia đình
- Thu thập thông tin đăng ký dịch vụ từ khách hàng tiềm năng
- Tích hợp nội dung động thông qua CMS API (HCMS)
- Đảm bảo tương thích đa thiết bị (responsive design)

### 1.2 Mục Tiêu Cụ Thể

| STT | Mục tiêu | Trạng thái |
|-----|----------|------------|
| 1 | Hiển thị đầy đủ 6 gói cước Internet | ✅ Hoàn thành |
| 2 | Form đăng ký dịch vụ trực tuyến | ✅ Hoàn thành |
| 3 | Banner slider quảng cáo | ✅ Hoàn thành |
| 4 | Tích hợp CMS API động | 🔄 Đang phát triển |
| 5 | Tối ưu SEO | 📋 Kế hoạch |
| 6 | A/B Testing | 📋 Kế hoạch |

---

## 2. Tech Stack

| Thành phần | Công nghệ | Phiên bản | Ghi chú |
|-----------|-----------|-----------|---------|
| **Markup** | HTML5 | — | Semantic HTML, single-page |
| **Styling** | CSS3 | — | Vanilla CSS, 562 dòng |
| **JavaScript** | Vanilla JS | ES6+ | Fetch API, DOM manipulation |
| **UI Framework** | Bootstrap | 5.3.8 | Grid, components |
| **Icons** | Bootstrap Icons | Latest | SVG icon set |
| **Font** | Google Fonts - Outfit | — | Trọng số: 400, 500, 600, 700, 800 |
| **Runtime** | Node.js | >= 18 | Backend server |
| **Server** | server.js | — | Express-like, port 3001 |
| **Image Processing** | Jimp | Latest | Xử lý ảnh server-side |
| **Environment** | dotenv | — | Quản lý biến môi trường |

---

## 3. Cấu Trúc Thư Mục

```
d:\FPT-Internet-Landing-Page\
├── index.html                  # Single-page HTML chính (3541 dòng)
├── server.js                   # Node.js API server (233 dòng, port 3001)
├── package.json                # NPM dependencies & scripts
├── .env                        # Biến môi trường (không commit)
├── .gitignore                  # Git ignore rules
│
├── assets/
│   ├── css/
│   │   └── style.css           # Stylesheet chính (562 dòng)
│   └── images/                 # 60 file PNG assets
│       ├── logo.png
│       ├── hero-*.png
│       ├── package-*.png
│       ├── banner-*.png
│       └── ...
│
├── docs/                       # Tài liệu dự án
│   ├── project-overview-pdr.md
│   ├── code-standards.md
│   ├── codebase-summary.md
│   ├── design-guidelines.md
│   ├── system-architecture.md
│   ├── deployment-guide.md
│   └── development-roadmap.md
│
├── plans/                      # Implementation plans
│
├── .agent/                     # Agent configuration
│   ├── rules/
│   └── workflows/
│
└── node_modules/               # NPM packages
    ├── bootstrap/
    ├── bootstrap-icons/
    └── jimp/
```

---

## 4. Các Section Của Trang

| STT | Section | ID/Class | Mô tả |
|-----|---------|----------|-------|
| 1 | **Navbar** | `#navbar` | Logo, menu điều hướng, hotline, nút đăng ký |
| 2 | **Hero** | `#hero-section` | Banner slider + Form đăng ký dịch vụ |
| 3 | **Marquee** | `.marquee-container` | Băng chuyền thương hiệu/thông báo |
| 4 | **Pricing** | `#pricing-section` | 6 gói cước Internet |
| 5 | **Wi-Fi 7** | `#wifi-section` | Giới thiệu công nghệ Wi-Fi 7 |
| 6 | **FPT Play Box** | `#fpt-play-box` | Thiết bị FPT Play Box |
| 7 | **Promotions** | `.promotions-section` | Banner khuyến mãi |
| 8 | **Trust/News** | `#trust-section` | Thành tựu, tin tức, đánh giá |
| 9 | **FAQ** | `#faq-section` | Câu hỏi thường gặp (accordion) |
| 10 | **Footer** | `.fpt-footer` | Thông tin công ty, links, liên hệ |

---

## 5. API Endpoints

### Base URL

```
http://localhost:3001/api/fpt
```

### Danh Sách Endpoints

| Method | Endpoint | Mô tả | Response |
|--------|----------|-------|----------|
| `GET` | `/api/fpt/banners` | Danh sách banner slider | Array of banner objects |
| `GET` | `/api/fpt/packages` | 6 gói cước Internet | Array of package objects |
| `GET` | `/api/fpt/promotions` | Banner/nội dung khuyến mãi | Array of promotion objects |
| `GET` | `/api/fpt/menus` | Cấu hình menu điều hướng | Array of menu items |
| `GET` | `/api/fpt/footer/settings` | Thông tin footer (logo, mô tả) | Footer settings object |
| `GET` | `/api/fpt/footer/links` | Nhóm liên kết footer | Array of link groups |
| `GET` | `/api/fpt/faqs` | Câu hỏi thường gặp | Array of FAQ objects |
| `POST` | `/api/fpt/registrations` | Gửi form đăng ký dịch vụ | Success/error response |

### Ví Dụ Response

```json
{
  "data": [
    {
      "id": 1,
      "name": "Giga",
      "speed": "100 Mbps",
      "price": "165.000d/thang",
      "features": ["Wi-Fi 5", "1 thiet bi dau cuoi"]
    }
  ]
}
```

---

## 6. Các Gói Cước Internet

| Gói | Loại | Đặc điểm |
|-----|------|----------|
| **Giga** | Individual | Gói cơ bản, tốc độ tiêu chuẩn |
| **Sky** | Individual | Gói trung cấp, tốc độ cao hơn |
| **Meta** | Individual | Gói cao cấp, tốc độ cao nhất |
| **Combo Giga** | Combo | Internet + Truyền hình |
| **Combo Sky** | Combo | Internet + Truyền hình HD |
| **Combo VVIP** | Combo | Internet + Truyền hình 4K premium |

---

## 7. Biến Môi Trường

| Biến | Giá trị Mặc Định | Mô tả |
|------|-----------------|-------|
| `VITE_CMS_URL` | `http://localhost:3000` | URL của HCMS backend |
| `VITE_API_KEY` | `hcms_...` | API key xác thực với CMS |

> **QUAN TRỌNG:** Không bao giờ commit file `.env` vào git repository!

---

## 8. Hướng Dẫn Khởi Chạy

### Yêu Cầu Hệ Thống

- **Node.js** >= 18.x
- **npm** >= 9.x

### Các Bước Chạy Local

```bash
# 1. Clone repository
git clone <repository-url>
cd FPT-Internet-Landing-Page

# 2. Cài đặt dependencies
npm install

# 3. Tạo file .env
cp .env.example .env
# Cập nhật VITE_CMS_URL và VITE_API_KEY

# 4. Khởi chạy server
node server.js

# 5. Truy cập trang web tại http://localhost:3001
```

---

## 9. Thông Tin Công Ty

| Thông tin | Chi tiết |
|----------|---------|
| **Tên công ty** | CÔNG TY CỔ PHẦN VIỄN THÔNG FPT |
| **Tên thương mại** | FPT Telecom |
| **Lĩnh vực** | Dịch vụ viễn thông, Internet |
| **Hotline** | 024 7300 2222 |
| **Zalo** | https://zalo.me/0324102101 |
| **Website chính** | https://fpt.vn |
| **Màu chủ đạo** | #FF7E00 (Cam FPT) |

---

## 10. Liên Kết Tài Liệu

- [Code Standards](./code-standards.md)
- [Codebase Summary](./codebase-summary.md)
- [Design Guidelines](./design-guidelines.md)
- [System Architecture](./system-architecture.md)
- [Deployment Guide](./deployment-guide.md)
- [Development Roadmap](./development-roadmap.md)
