# Hướng Dẫn Triển Khai (Deployment Guide)

> Tài liệu hướng dẫn triển khai **FPT Internet Landing Page** cho các môi trường khác nhau

---

## 1. Yêu Cầu Hệ Thống

### 1.1 Prerequisites

| Phần mềm | Phiên bản tối thiểu | Kiểm tra |
|---------|--------------------|---------||
| **Node.js** | >= 18.0.0 | `node --version` |
| **npm** | >= 9.0.0 | `npm --version` |
| **Git** | >= 2.30 | `git --version` |

### 1.2 Kiểm Tra Môi Trường

```bash
# Kiểm tra Node.js version
node --version
# Output mong đợi: v18.x.x hoặc cao hơn

# Kiểm tra npm version
npm --version
# Output mong đợi: 9.x.x hoặc cao hơn

# Kiểm tra port 3001 không bị chiếm dụng (Linux/Mac)
lsof -i :3001

# Kiểm tra port 3001 (Windows)
netstat -ano | findstr :3001
```

---

## 2. Local Development

### 2.1 Clone & Setup

```bash
# 1. Clone repository
git clone <repository-url> FPT-Internet-Landing-Page
cd FPT-Internet-Landing-Page

# 2. Cài đặt dependencies
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env

# 4. Mở file .env và cập nhật giá trị
# VITE_CMS_URL=http://localhost:3000
# VITE_API_KEY=hcms_your_api_key_here
```

### 2.2 Chạy Development Server

```bash
# Khởi chạy server
node server.js

# Hoặc nếu có npm script
npm start

# Output mong đợi:
# FPT Landing Page server running at http://localhost:3001
```

### 2.3 Verify Local Setup

```bash
# Test homepage
curl http://localhost:3001/

# Test API endpoints
curl http://localhost:3001/api/fpt/packages
curl http://localhost:3001/api/fpt/banners
curl http://localhost:3001/api/fpt/faqs

# Test static assets
curl -I http://localhost:3001/assets/css/style.css
# Header mong đợi: Content-Type: text/css
```

### 2.4 Hot Reload (Tùy chọn)

```bash
# Cài đặt nodemon cho auto-restart khi code thay đổi
npm install -D nodemon

# Chạy với nodemon
npx nodemon server.js

# Hoặc thêm script vào package.json:
# "dev": "nodemon server.js"
# npm run dev
```

---

## 3. Production Deployment

### 3.1 Option A: VPS với PM2 (Khuyến Nghị)

#### Bước 1: Chuẩn Bị Server

```bash
# Trên Ubuntu/Debian VPS
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài đặt Node.js 18.x (qua NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # v18.x.x
npm --version   # 9.x.x

# Cài đặt PM2 globally
sudo npm install -g pm2
```

#### Bước 2: Deploy Code

```bash
# Trên VPS, clone hoặc upload code
git clone <repository-url> /var/www/fpt-landing
cd /var/www/fpt-landing

# Cài đặt production dependencies
npm install --production

# Tạo .env file
nano .env
# Thêm:
# VITE_CMS_URL=https://cms.yourdomain.com
# VITE_API_KEY=hcms_production_key
```

#### Bước 3: Cấu Hình PM2

```bash
# Tạo PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'fpt-landing',
    script: 'server.js',
    cwd: '/var/www/fpt-landing',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/fpt-landing-error.log',
    out_file: '/var/log/pm2/fpt-landing-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
EOF

# Khởi chạy ứng dụng với PM2
pm2 start ecosystem.config.js --env production

# Lưu PM2 config để tự khởi động khi reboot
pm2 save
pm2 startup
# Chạy lệnh được in ra bởi pm2 startup

# Kiểm tra status
pm2 status
pm2 logs fpt-landing
```

#### Bước 4: PM2 Commands

```bash
# Xem status
pm2 status

# Restart ứng dụng
pm2 restart fpt-landing

# Reload không downtime (graceful)
pm2 reload fpt-landing

# Xem logs realtime
pm2 logs fpt-landing --lines 100

# Stop ứng dụng
pm2 stop fpt-landing

# Xóa khỏi PM2
pm2 delete fpt-landing
```

---

### 3.2 Option B: Docker

#### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

# Metadata
LABEL maintainer="FPT Telecom Dev Team"
LABEL description="FPT Internet Landing Page"

# Tạo app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài dependencies (production only)
RUN npm ci --only=production

# Copy source code (trừ .env và node_modules)
COPY . .

# Xóa .env nếu bị copy vào (dùng docker secrets thay thế)
RUN rm -f .env

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/fpt/packages || exit 1

# Start command
CMD ["node", "server.js"]
```

#### .dockerignore

```
node_modules
.env
.git
.gitignore
docs
plans
*.md
npm-debug.log
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  fpt-landing:
    build: .
    container_name: fpt-landing-page
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - VITE_CMS_URL=${VITE_CMS_URL}
      - VITE_API_KEY=${VITE_API_KEY}
    volumes:
      - ./assets:/app/assets:ro  # Mount assets as read-only
    networks:
      - fpt-network

  nginx:
    image: nginx:alpine
    container_name: fpt-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - fpt-landing
    networks:
      - fpt-network

networks:
  fpt-network:
    driver: bridge
```

#### Build & Run Docker

```bash
# Build image
docker build -t fpt-landing:latest .

# Run với Docker Compose
docker-compose up -d

# Xem logs
docker-compose logs -f fpt-landing

# Stop
docker-compose down

# Update deployment
git pull origin main
docker-compose build fpt-landing
docker-compose up -d fpt-landing
```

---

## 4. Nginx Configuration

### 4.1 Basic Nginx Config

```nginx
# /etc/nginx/sites-available/fpt-landing.conf

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Static assets - cache aggressively
    location /assets/ {
        proxy_pass http://localhost:3001;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # node_modules static (Bootstrap CSS/JS)
    location /node_modules/ {
        proxy_pass http://localhost:3001;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API endpoints - no cache
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Rate limiting for registrations
        limit_req zone=api burst=20 nodelay;
    }

    # Main application
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Cache HTML - short duration
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Logging
    access_log /var/log/nginx/fpt-landing-access.log;
    error_log /var/log/nginx/fpt-landing-error.log;
}

# Rate limiting zone (in http block)
# limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
```

### 4.2 Enable Site

```bash
# Tạo symlink để enable site
sudo ln -s /etc/nginx/sites-available/fpt-landing.conf /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4.3 SSL Certificate (Let's Encrypt)

```bash
# Cài đặt Certbot
sudo apt install -y certbot python3-certbot-nginx

# Lấy certificate (domain phải trỏ về server)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (đã được cài đặt tự động bởi certbot)
# Kiểm tra
sudo certbot renew --dry-run
```

---

## 5. Environment Variables Setup

### 5.1 Development

```bash
# File .env (local development - không commit)
VITE_CMS_URL=http://localhost:3000
VITE_API_KEY=hcms_dev_key_here
NODE_ENV=development
PORT=3001
```

### 5.2 Production

```bash
# Cách 1: File .env trên server (quyền đọc giới hạn)
VITE_CMS_URL=https://cms.fptinternet.vn
VITE_API_KEY=hcms_production_secure_key
NODE_ENV=production
PORT=3001

# Đặt quyền file
chmod 600 .env
chown www-data:www-data .env

# Cách 2: Environment variables của hệ thống
export VITE_CMS_URL=https://cms.fptinternet.vn
export VITE_API_KEY=hcms_production_secure_key

# Cách 3: PM2 ecosystem.config.js
env_production: {
  VITE_CMS_URL: 'https://cms.fptinternet.vn',
  VITE_API_KEY: process.env.HCMS_API_KEY  // Lấy từ system env
}
```

---

## 6. .gitignore Recommendations

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files - NEVER COMMIT!
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
pm2-*.json

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/settings.json
.idea/
*.swp
*.swo

# Build outputs (nếu có)
dist/
build/

# PM2
.pm2/
ecosystem.config.js  # Nếu chứa secrets
```

---

## 7. Deployment Checklist

### 7.1 Pre-deployment

- [ ] Tất cả code đã được commit và push lên repository
- [ ] File `.env` **KHÔNG** bị commit
- [ ] Dependencies đã được update (`npm install`)
- [ ] Không có `console.log()` debug statements trong production code
- [ ] CORS origin đã được restrict về domain production (không để `*`)
- [ ] API rate limiting đã được cấu hình

### 7.2 Deployment

- [ ] Kết nối SSH vào server thành công
- [ ] Code đã được pull/deploy lên server
- [ ] `npm install --production` đã chạy thành công
- [ ] File `.env` production đã được tạo với giá trị đúng
- [ ] PM2 process đã được start/restart
- [ ] Nginx config đã được test (`nginx -t`)
- [ ] Nginx đã được reload

### 7.3 Post-deployment Verification

- [ ] Homepage tải được: `curl https://yourdomain.com/`
- [ ] API packages trả về data: `curl https://yourdomain.com/api/fpt/packages`
- [ ] Static assets tải được (CSS, images)
- [ ] Form đăng ký hoạt động
- [ ] HTTPS đang hoạt động và redirect từ HTTP
- [ ] SSL certificate hợp lệ
- [ ] PM2 process đang chạy: `pm2 status`
- [ ] Logs không có errors: `pm2 logs fpt-landing`

---

## 8. Troubleshooting

### 8.1 Port đã được sử dụng

```bash
# Tìm process đang dùng port 3001
lsof -i :3001
# Kill process (thay PID bằng số thực)
kill -9 <PID>
```

### 8.2 Permission Issues

```bash
# Nếu npm install bị lỗi permission
sudo chown -R $(whoami) ~/.npm
npm install

# Nếu không đọc được .env
chmod 600 .env
```

### 8.3 PM2 Issues

```bash
# Xem chi tiết lỗi
pm2 logs fpt-landing --err
pm2 describe fpt-landing

# Reset PM2
pm2 kill
pm2 start ecosystem.config.js --env production
```

### 8.4 Nginx Issues

```bash
# Test config
sudo nginx -t

# Xem Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## 9. Monitoring

### 9.1 PM2 Monitoring

```bash
# Dashboard realtime
pm2 monit

# Xem metrics
pm2 info fpt-landing

# Memory và CPU
pm2 status
```

### 9.2 Health Check Endpoint (Đề Xuất)

Thêm vào `server.js`:

```javascript
// Health check endpoint
if (url === '/health') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: require('./package.json').version
  }));
}
```

```bash
# Monitor health
watch -n 30 "curl -s http://localhost:3001/health | jq ."
```

---

## 10. Rollback Strategy

```bash
# Rollback với Git
git log --oneline -10  # Xem 10 commits gần nhất
git checkout <commit-hash>  # Rollback về commit cụ thể
pm2 restart fpt-landing

# Hoặc rollback về tag/release
git checkout v1.0.0
pm2 restart fpt-landing
```
