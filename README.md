# Headless CMS (Backend)

Hệ thống quản trị nội dung (CMS) Backend được xây dựng bằng Next.js, Prisma ORM và cơ sở dữ liệu MySQL nhằm quản lý dữ liệu động cho landing page (banners, packages, games, faqs, settings, và media).

## Mục lục
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt & Thiết lập](#cài-đặt--thiết-lập)
  - [Bước 1: Cài đặt thư viện](#bước-1-cài-đặt-thư-viện)
  - [Bước 2: Cấu hình biến môi trường](#bước-2-cấu-hình-biến-môi-trường)
  - [Bước 3: Chạy Migration database](#bước-3-chạy-migration-database)
  - [Bước 4: Nạp dữ liệu mẫu (Seed)](#bước-4-nạp-dữ-liệu-mẫu-seed)
- [Khởi chạy ứng dụng](#khởi-chạy-ứng-dụng)
- [Cơ cấu thư mục API chính](#cơ-cấu-thư-mục-api-chính)

---

## Yêu cầu hệ thống
- **Node.js**: Phiên bản 18+ hoặc cao hơn
- **Cơ sở dữ liệu**: MySQL (đã cài đặt và đang chạy)

--

## Cài đặt & Thiết lập

### Bước 1: Cài đặt thư viện
Di chuyển vào thư mục gốc của Backend và cài đặt toàn bộ gói phụ thuộc:
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường
Tạo tệp `.env` tại thư mục gốc của dự án Next.js (hoặc sao chép từ `.env.example`):
```env
DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database_name>"
JWT_SECRET="tự-chọn-khóa-bảo-mật-jwt"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
*Ví dụ cấu hình mẫu:*
```env
DATABASE_URL="mysql://root:123456@127.0.0.1:3306/headless"
JWT_SECRET="hyperfast-secret-key-1234567890-qwertyuiop"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Bước 3: Chạy Migration database
Sử dụng Prisma để đồng bộ hóa và tạo các bảng cần thiết trong cơ sở dữ liệu MySQL của bạn:
```bash
npx prisma migrate dev --name init
```
*(Nếu cơ sở dữ liệu đã có sẵn cấu trúc migration, bạn có thể chạy `npx prisma migrate deploy`)*

### Bước 4: Nạp dữ liệu mẫu (Seed)
Nạp dữ liệu khởi tạo ban đầu cho các bảng (như cấu hình, danh sách game, FAQs mẫu...) vào cơ sở dữ liệu:
```bash
npx prisma db seed
```

---

## Khởi chạy ứng dụng

Chạy máy chủ phát triển (Development Server):
```bash
npm run dev
```

Máy chủ backend sẽ chạy tại địa chỉ: [http://localhost:3000](http://localhost:3000)

* Các API quản trị yêu cầu xác thực JWT hoặc phân quyền.
* Các API công khai dành cho Landing Page bắt đầu bằng tiền tố `/api/public/...` và cần có tiêu đề `x-api-key`.

---

## Cơ cấu thư mục API chính

- `/api/auth/...`: API xác thực và đăng nhập trang quản trị.
- `/api/public/...`: Các API công khai dùng cho Landing Page không cần đăng nhập admin.
- `/api/banners`, `/api/packages`, `/api/faqs`, `/api/games`, `/api/media`: Quản lý nội dung trong trang Dashboard (sử dụng Dynamic Route `[id]` hỗ trợ Next.js 15+).