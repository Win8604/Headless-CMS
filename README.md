# FPT Internet Landing Page (Frontend & Proxy Server)

Trang Landing Page giới thiệu dịch vụ Internet FPT Telecom chất lượng cao, tích hợp đồng bộ dữ liệu động từ **Headless CMS (HCMS)** và sở hữu cơ chế tự phục hồi ngoại tuyến (Resilient Offline Caching) nâng cao. 

Dự án được xây dựng với cấu trúc gọn nhẹ, tối ưu hóa SEO và trải nghiệm người dùng, kết hợp với máy chủ Node.js đóng vai trò vừa là Proxy vừa phục vụ tài nguyên tĩnh.

---

## Mục lục
- [1. Tính Năng Nổi Bật](#1-tính-năng-nổi-bật)
- [2. Kiến Trúc Hệ Thống & Luồng Dữ Liệu](#2-kiến-trúc-hệ-thống--luồng-dữ-liệu)
- [3. Cấu Trúc Thư Mục](#3-cấu-trúc-thư-mục)
- [4. Yêu Cầu Hệ Thống & Cài Đặt](#4-yêu-cầu-hệ-thống--cài-đặt)
- [5. Hướng Dẫn Khởi Chạy](#5-hướng-dẫn-khởi-chạy)
- [6. Cấu Hình Biến Môi Trường](#6-cấu-hình-biến-môi-trường)
- [7. Danh Sách API Endpoints](#7-danh-sách-api-endpoints)
- [8. Cơ Chế Tự Phục Hồi Ngoại Tuyến (Resilient Caching)](#8-cơ-chế-tự-phục-hồi-ngoại-tuyến-resilient-caching)
- [9. Tiêu Chuẩn Code & Phát Triển](#9-tiêu-chuẩn-code--phát-triển)
- [10. Bảo Mật Thông Tin & Đẩy Lên Git](#10-bảo-mật-thông-tin--đẩy-lên-git)
- [11. Tài Liệu Tham Chiếu Khác](#11-tài-liệu-tham-chiếu-khác)

---

## 1. Tính Năng Nổi Bật

1. **Đồng bộ thời gian thực từ CMS:** Tự động hiển thị Banners, Packages (Gói cước), FAQs, Menus, chân trang (Footer Settings) trực tiếp theo cấu hình từ trang quản trị Headless CMS.
2. **Hiệu ứng Slider dọc (Vertical Slide-down):** Biểu ngữ chính (Hero Slider) áp dụng hiệu ứng chuyển động trượt từ trên xuống dưới mượt mà khi chuyển đổi giữa các slide.
3. **Đăng ký tư vấn nâng cao:** Popup đăng ký màu cam thương hiệu (`#ff7e00`) tích hợp các trường bắt buộc có dấu sao đỏ (`*`), nút đóng (Close Button) dạng vector nền tròn trắng đẹp mắt cùng hiệu ứng tương tác cao cấp.
4. **Resilient Offline Cache:** Máy chủ tự động lưu đệm (cache) toàn bộ dữ liệu JSON và tải ảnh lưu trữ cục bộ để duy trì hiển thị trang web 100% khi CMS bị ngoại tuyến hoặc mất kết nối.
5. **Tối ưu hóa SEO & Hiệu năng:** Sử dụng thẻ tiêu đề ngữ nghĩa HTML5, cấu hình meta tags chuẩn, hỗ trợ lazy-loading ảnh và cấu hình file `robots.txt`/`sitemap.xml` tự động.

---

## 2. Kiến Trúc Hệ Thống & Luồng Dữ Liệu

Dự án áp dụng mô hình **Single-Tier Web Application** ở môi trường Development và khuyến nghị mô hình **Reverse Proxy qua Nginx** cho Production.

### Luồng Hoạt Động (Development)
```
[Trình duyệt Client] 
     │ (1) Tải HTML, CSS, JS tĩnh
     ▼
[Node.js Server.js (Port 3001)] ───► (2) Static File Handler ──► [File System]
     │
     ├─► (3) Xử lý API requests (/api/fpt/*)
     │         │
     │         ├─► [Nếu CMS Online] ──► Gọi sang CMS (Port 3000) với API Key
     │         │                          │
     │         │                          └─► Trả dữ liệu + Lưu cache JSON & Ảnh cục bộ
     │         │
     │         └─► [Nếu CMS Offline] ─► Đọc từ thư mục /cache và /uploads cục bộ
     ▼
[Trả kết quả JSON chuẩn hóa về Client]
```

Để tìm hiểu chi tiết hơn về sơ đồ tuần tự và kiến trúc triển khai Production, vui lòng tham khảo [system-architecture.md](docs/system-architecture.md).

---

## 3. Cấu Trúc Thư Mục

```
d:\FPT-Internet-Landing-Page\
├── index.html                  # Single-page HTML chính chứa khung giao diện và mã render JS
├── server.js                   # Node.js API server & File server (cổng 3001)
├── package.json                # NPM dependencies & scripts chạy ứng dụng
├── .env                        # Biến môi trường (không commit lên Git)
├── .env.example                # File cấu hình mẫu
├── .gitignore                  # Chỉ định các tệp/thư mục Git bỏ qua
├── robots.txt                  # Hướng dẫn bot tìm kiếm thu thập dữ liệu
├── sitemap.xml                 # Sơ đồ trang web hỗ trợ SEO
│
├── assets/
│   ├── css/
│   │   └── style.css           # Mã CSS chính định hình giao diện
│   └── images/                 # Tài nguyên hình ảnh tĩnh của giao diện
│
├── docs/                       # Tài liệu thiết kế và tiêu chuẩn dự án
│   ├── project-overview-pdr.md # Tổng quan yêu cầu dự án
│   ├── code-standards.md       # Tiêu chuẩn viết code (HTML/CSS/JS/A11y)
│   ├── codebase-summary.md     # Tóm tắt cấu trúc mã nguồn hiện tại
│   ├── design-guidelines.md    # Hướng dẫn thiết kế giao diện & màu sắc
│   ├── system-architecture.md  # Sơ đồ và mô tả kiến trúc hệ thống
│   ├── deployment-guide.md     # Hướng dẫn triển khai lên VPS/Production
│   └── development-roadmap.md  # Lộ trình phát triển dự án
│
├── plans/                      # Nơi lưu trữ kế hoạch thực hiện các Phase phát triển
├── scripts/                    # Các kịch bản tự động hóa (Ví dụ: optimize-images.js)
├── cache/                      # Thư mục lưu trữ JSON cache tạm thời khi CMS mất kết nối
└── uploads/                    # Thư mục lưu trữ ảnh được tải tự động từ CMS
```

---

## 4. Yêu Cầu Hệ Thống & Cài Đặt

### Yêu Cầu Hệ Thống
- **Node.js**: Phiên bản 18.x trở lên.
- **NPM**: Phiên bản 9.x trở lên.

### Hướng Dẫn Cài Đặt

**Bước 1:** Clone hoặc sao chép mã nguồn vào thư mục làm việc của bạn.

**Bước 2:** Di chuyển vào thư mục gốc của dự án và cài đặt các thư viện phụ thuộc:
```bash
npm install
```

---

## 5. Hướng Dẫn Khởi Chạy

### Chạy ở Chế Độ Phát Triển (Development)
Khởi chạy máy chủ Node.js phục vụ frontend tĩnh và kết nối CMS:
```bash
npm run dev
```
Hoặc chạy trực tiếp bằng node:
```bash
node server.js
```
Truy cập ứng dụng tại địa chỉ: **[http://localhost:3001](http://localhost:3001)**

### Chạy Kịch Bản Tối Ưu Hóa Ảnh
Nếu bạn muốn tối ưu dung lượng của các ảnh trong thư mục `assets/images/` để tăng tốc độ tải trang:
```bash
npm run optimize-images
```

---

## 6. Cấu Hình Biến Môi Trường

Tạo tệp `.env` ở thư mục gốc của dự án bằng cách sao chép từ tệp `.env.example`:
```bash
cp .env.example .env
```
Mở tệp `.env` và cấu hình các giá trị phù hợp với hệ thống CMS của bạn:
```env
VITE_CMS_URL=http://localhost:3000
VITE_API_KEY=hcms_769befc7640e98bc1fbbee3390dd921dc00d6422c90be6590b01e31d974188f0
```
- `VITE_CMS_URL`: Đường dẫn gốc đến máy chủ Headless CMS đang hoạt động.
- `VITE_API_KEY`: Khóa API (API Key) được tạo ra từ trang quản trị CMS (Dashboard > API Keys) dùng để xác thực quyền truy xuất thông tin.

---

## 7. Danh Sách API Endpoints

Dữ liệu trên giao diện được tải động thông qua các cổng API được định nghĩa sẵn trong `server.js` (tất cả đều có tiền tố `/api/fpt`):

| Phương Thức | Endpoint | Mô Tả Dữ Liệu Trả Về |
|-------------|----------|----------------------|
| `GET` | `/api/fpt/banners` | Danh sách các slide banner quảng cáo lớn ở Hero |
| `GET` | `/api/fpt/packages` | Danh sách 6 gói cước Internet (Giga, Sky, Meta và các gói Combo) |
| `GET` | `/api/fpt/promotions` | Nội dung các biểu ngữ hoặc thông tin khuyến mãi |
| `GET` | `/api/fpt/menus` | Cấu hình thanh điều hướng (Navbar items) |
| `GET` | `/api/fpt/footer/settings` | Cấu hình chung của footer (Thông tin công ty, logo, bản quyền) |
| `GET` | `/api/fpt/footer/links` | Danh sách các nhóm liên kết hỗ trợ ở Footer |
| `GET` | `/api/fpt/faqs` | Các câu hỏi thường gặp phục vụ khu vực Accordion FAQs |
| `POST` | `/api/fpt/registrations` | Gửi dữ liệu đăng ký dịch vụ của khách hàng về CMS/Hệ thống |

*Chi tiết các ví dụ về cấu trúc dữ liệu JSON trả về có thể xem tại [Project Overview PDR](file:///d:/FPT-Internet-Landing-Page/docs/project-overview-pdr.md#5-api-endpoints).*

---

## 8. Cơ Chế Tự Phục Hồi Ngoại Tuyến (Resilient Caching)

Để đảm bảo Landing Page hoạt động liên tục ngay cả khi kết nối tới Headless CMS bị gián đoạn, `server.js` được thiết lập cơ chế dự phòng:
- **JSON Backup (`/cache`):** Mỗi khi máy chủ Proxy thực hiện một yêu cầu `GET` thành công tới CMS, nó sẽ lưu bản sao của kết quả JSON vào thư mục `/cache`. Khi CMS ngắt kết nối, proxy sẽ tự động chuyển sang đọc file cache này để phục vụ Frontend.
- **Image Proxy & Local Cache (`/uploads`):** Đối với các tệp hình ảnh được tải lên thông qua CMS (đường dẫn dạng `/uploads/...`), proxy server sẽ tự động tải ảnh về lưu trữ tại thư mục `/uploads` cục bộ ở lần gọi đầu tiên. Khi CMS ngoại tuyến, mọi đường dẫn ảnh này đều được phục vụ trực tiếp từ máy chủ proxy cục bộ.

---

## 9. Tiêu Chuẩn Code & Phát Triển

Để đảm bảo dự án dễ dàng bảo trì và phát triển lâu dài, tất cả các lập trình viên cần tuân thủ các nguyên tắc sau:
- **Triết lý:** Tuân thủ chặt chẽ **YAGNI** (Không vẽ thêm tính năng), **KISS** (Giữ code đơn giản) và **DRY** (Tránh lặp lại code).
- **Giới hạn kích thước:** Ngoại trừ file di sản `index.html` và `style.css` đang được tối ưu hóa dần, mỗi file code mới tạo ra hoặc tách module **không được vượt quá 200 dòng**.
- **Đặt tên file:** Sử dụng định dạng **kebab-case** có nghĩa (Ví dụ: `registration-modal.js`, `pricing-card.css`).
- **Đặt tên Class CSS:** Tuân theo quy tắc viết code hướng thành phần và cấu trúc BEM (Ví dụ: `.pricing-card`, `.pricing-card__header`, `.pricing-card--featured`).
- **Styling:** Sử dụng CSS variables định nghĩa trong `:root` cho các giá trị màu sắc, font chữ và khoảng cách đồng bộ.
- **JavaScript:** Sử dụng cú pháp ES6+ (`const/let`, Arrow Functions, Template Literals, Destructuring, Async/Await). Luôn kiểm tra lỗi đầu vào (Sanitize input) để chống tấn công XSS.

Chi tiết về các quy tắc này được mô tả cụ thể trong tài liệu [Code Standards](file:///d:/FPT-Internet-Landing-Page/docs/code-standards.md).

---

## 10. Bảo Mật Thông Tin & Đẩy Lên Git

- **KHÔNG COMMIT FILE `.env`:** Tệp `.env` chứa thông tin nhạy cảm (API Keys, thông tin máy chủ nội bộ) đã được thêm vào `.gitignore` để không bị đẩy lên GitHub.
- **Conventional Commits:** Định dạng thông điệp commit rõ ràng, không chứa các từ khóa liên quan đến AI (Ví dụ: `feat: add offline caching layer for images`, `fix: registration form validation phone input`).

---

## 11. Tài Liệu Tham Chiếu Khác

Vui lòng tham khảo các tài liệu chuyên biệt nằm trong thư mục `/docs` để biết thêm chi tiết:
- [Tài liệu Tiêu chuẩn Code](file:///d:/FPT-Internet-Landing-Page/docs/code-standards.md)
- [Hướng dẫn Triển khai Hệ thống](file:///d:/FPT-Internet-Landing-Page/docs/deployment-guide.md)
- [Nguyên tắc thiết kế UI/UX](file:///d:/FPT-Internet-Landing-Page/docs/design-guidelines.md)
- [Kiến trúc chi tiết hệ thống](file:///d:/FPT-Internet-Landing-Page/docs/system-architecture.md)
- [Roadmap phát triển tính năng](file:///d:/FPT-Internet-Landing-Page/docs/development-roadmap.md)

---
*Bản quyền © 2026 bởi Đội ngũ phát triển dự án.*