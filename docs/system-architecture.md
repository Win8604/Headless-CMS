# Kiến Trúc Hệ Thống (System Architecture)

> Tài liệu mô tả kiến trúc kỹ thuật của **FPT Internet Landing Page**

---

## 1. Tổng Quan Kiến Trúc

Dự án sử dụng kiến trúc **Single-Tier Web Application** đơn giản:
- Một Node.js server phục vụ cả static files lẫn mock API
- Frontend là pure HTML/CSS/JS không có build step
- Tất cả chạy trên cùng port 3001

```mermaid
graph TB
    subgraph Client["Browser (Client)"]
        HTML["index.html\n(3541 lines)"]
        CSS["style.css\n(562 lines)"]
        JS["Inline JavaScript\nVanilla ES6+"]
        BS["Bootstrap 5.3.8"]
        FONT["Outfit Font\nGoogle Fonts CDN"]
    end

    subgraph Server["Node.js Server (port 3001)"]
        SRV["server.js\n(233 lines)"]
        STATIC["Static File Handler"]
        API["Mock API Router"]
        DATA["In-memory Mock Data"]
    end

    subgraph External["External Services"]
        GCDN["Google Fonts CDN"]
        CMS["HCMS Backend\n(localhost:3000)\nFuture Integration"]
    end

    HTML --> CSS
    HTML --> JS
    HTML --> BS
    JS -->|"fetch() API calls"| API
    HTML -->|"GET /"|  SRV
    SRV --> STATIC
    SRV --> API
    API --> DATA
    FONT --> GCDN
    CMS -.->|"Phase 2"| SRV
```

---

## 2. Luồng Request (Request Flow)

```mermaid
sequenceDiagram
    participant U as User Browser
    participant S as server.js (port 3001)
    participant FS as File System
    participant MD as Mock Data

    U->>S: GET http://localhost:3001/
    S->>FS: Read index.html
    FS-->>S: HTML content
    S-->>U: 200 OK + HTML

    U->>S: GET /assets/css/style.css
    S->>FS: Read style.css
    FS-->>S: CSS content
    S-->>U: 200 OK + CSS (text/css)

    U->>S: GET /api/fpt/packages
    S->>MD: Query mock packages
    MD-->>S: Package array
    S-->>U: 200 OK + JSON

    U->>S: GET /api/fpt/banners
    S->>MD: Query mock banners
    MD-->>S: Banner array
    S-->>U: 200 OK + JSON

    U->>S: POST /api/fpt/registrations
    Note over U,S: Form data: fullName, phone, address, packageId
    S-->>U: 200 OK + { success: true }
```

---

## 3. Sơ Đồ Component Hierarchy

```mermaid
graph TD
    ROOT["index.html (root)"]

    ROOT --> NAVBAR["Navbar Component"]
    ROOT --> MAIN["main content"]
    ROOT --> FOOTER["Footer Component"]

    NAVBAR --> LOGO["Logo FPT"]
    NAVBAR --> NAV["Navigation Links"]
    NAVBAR --> HOTLINE["Hotline Button\n024 7300 2222"]
    NAVBAR --> CTA["Register CTA Button"]

    MAIN --> HERO["Hero Section\n#hero-section"]
    MAIN --> MARQUEE["Marquee Section"]
    MAIN --> PRICING["Pricing Section\n#pricing-section"]
    MAIN --> WIFI["WiFi 7 Section\n#wifi-section"]
    MAIN --> PLAYBOX["FPT Play Box\n#fpt-play-box"]
    MAIN --> PROMO["Promotions Section"]
    MAIN --> TRUST["Trust & News\n#trust-section"]
    MAIN --> FAQ["FAQ Section\n#faq-section"]

    HERO --> SLIDER["Banner Slider\n(Carousel)"]
    HERO --> REGFORM["Registration Form"]

    SLIDER --> SLIDE1["Slide 1"]
    SLIDER --> SLIDE2["Slide 2"]
    SLIDER --> SLIDENN["Slide N..."]

    REGFORM --> FIELDS["Form Fields\n(name, phone, address)"]
    REGFORM --> PKG_SELECT["Package Selector"]
    REGFORM --> SUBMIT["Submit Button"]

    PRICING --> TABS["Package Type Tabs\n(Individual / Combo)"]
    PRICING --> CARDS["6 Package Cards\n(Giga, Sky, Meta,\nCombo Giga, Sky, VVIP)"]

    FAQ --> ACCORDION["Bootstrap Accordion\n(FAQ items)"]

    FOOTER --> FOOTERINFO["Company Info"]
    FOOTER --> FOOTERLINKS["Link Groups"]
    FOOTER --> FOOTERSOCIAL["Social Links"]
    FOOTER --> COPYRIGHT["Copyright"]
```

---

## 4. Data Flow (Luồng Dữ Liệu)

```mermaid
flowchart LR
    subgraph Frontend["Frontend (Browser)"]
        direction TB
        INIT["DOMContentLoaded\nEvent"]
        FETCH["fetch() calls\n(Parallel)"]
        RENDER["DOM Rendering\n(innerHTML/createElement)"]
        CACHE["In-memory State\n(JS variables)"]
    end

    subgraph Backend["Backend (server.js)"]
        direction TB
        ROUTER["URL Router\n(switch/if-else)"]
        MOCKDATA["Mock Data\n(hardcoded arrays)"]
        JSONRES["JSON Response\n(JSON.stringify)"]
    end

    INIT -->|"triggers"| FETCH
    FETCH -->|"GET /api/fpt/banners"| ROUTER
    FETCH -->|"GET /api/fpt/packages"| ROUTER
    FETCH -->|"GET /api/fpt/faqs"| ROUTER
    ROUTER --> MOCKDATA
    MOCKDATA --> JSONRES
    JSONRES -->|"response.json()"| RENDER
    RENDER --> CACHE
    CACHE -->|"user interacts"| RENDER
```

---

## 5. Kiến Trúc server.js

### 5.1 Cấu Trúc Code

```javascript
// server.js - Kiến trúc tổng quan
const http = require('http');
const fs = require('fs');
const path = require('path');

// ==========================================
// 1. CONFIGURATION
// ==========================================
const PORT = 3001;
const HOST = 'localhost';

// ==========================================
// 2. MIME TYPES MAP
// ==========================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
};

// ==========================================
// 3. CORS HEADERS
// ==========================================
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
}

// ==========================================
// 4. MOCK DATA (Phase 1)
// ==========================================
const mockData = {
  banners: [...],
  packages: [...],
  promotions: [...],
  menus: [...],
  footerSettings: {...},
  footerLinks: [...],
  faqs: [...],
};

// ==========================================
// 5. HTTP SERVER (Request Handler)
// ==========================================
const server = http.createServer((req, res) => {
  setCORSHeaders(res);

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = req.url.split('?')[0]; // Strip query params

  // Route: API endpoints
  if (url.startsWith('/api/fpt/')) {
    return handleAPIRequest(req, res, url);
  }

  // Route: Static files
  return handleStaticFile(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`FPT Landing Page running at http://${HOST}:${PORT}`);
});
```

### 5.2 Static File Serving

```mermaid
flowchart TD
    REQ["Incoming Request\nGET /assets/css/style.css"]
    CHECK_API{"URL starts with\n/api/fpt/?"}
    CHECK_FILE{"File exists\non disk?"}
    READ_FILE["Read file from disk\nfs.readFile()"]
    SERVE["Send response\nwith correct MIME type"]
    NOT_FOUND["404 Not Found"]
    API_HANDLER["Handle as API route"]

    REQ --> CHECK_API
    CHECK_API -->|"Yes"| API_HANDLER
    CHECK_API -->|"No"| CHECK_FILE
    CHECK_FILE -->|"Yes"| READ_FILE
    READ_FILE --> SERVE
    CHECK_FILE -->|"No"| NOT_FOUND
```

### 5.3 API Route Handling

```mermaid
flowchart TD
    APIREQ["API Request\nGET /api/fpt/packages"]
    PARSE["Parse URL path"]
    ROUTE{"Match route"}

    ROUTE -->|"/banners"| R1["Return banners array"]
    ROUTE -->|"/packages"| R2["Return packages array"]
    ROUTE -->|"/promotions"| R3["Return promotions array"]
    ROUTE -->|"/menus"| R4["Return menus array"]
    ROUTE -->|"/footer/settings"| R5["Return footer settings"]
    ROUTE -->|"/footer/links"| R6["Return footer links"]
    ROUTE -->|"/faqs"| R7["Return FAQs array"]
    ROUTE -->|"POST /registrations"| R8["Parse body + return success"]
    ROUTE -->|"No match"| R9["404 Not Found"]

    APIREQ --> PARSE
    PARSE --> ROUTE

    R1 --> JSON["JSON.stringify()\n+ Content-Type: application/json"]
    R2 --> JSON
    R3 --> JSON
    R4 --> JSON
    R5 --> JSON
    R6 --> JSON
    R7 --> JSON
    R8 --> JSON
```

---

## 6. Frontend Rendering Pattern

### 6.1 Initialization Flow

```javascript
// Pattern: DOMContentLoaded → Parallel fetches → Render
document.addEventListener('DOMContentLoaded', async () => {
  // Parallel data fetching (không block lẫn nhau)
  const [banners, packages, faqs, menus] = await Promise.allSettled([
    fetchData('/api/fpt/banners'),
    fetchData('/api/fpt/packages'),
    fetchData('/api/fpt/faqs'),
    fetchData('/api/fpt/menus'),
  ]);

  // Render sau khi có data
  if (banners.status === 'fulfilled') renderHeroSlider(banners.value);
  if (packages.status === 'fulfilled') renderPricingCards(packages.value);
  if (faqs.status === 'fulfilled') renderFAQ(faqs.value);
  if (menus.status === 'fulfilled') renderNavigation(menus.value);
});
```

### 6.2 DOM Injection Pattern

```javascript
// Pattern: Template string + innerHTML
function renderPricingCards(packages) {
  const container = document.getElementById('pricing-grid');
  if (!container) return;

  container.innerHTML = packages.map(pkg => `
    <div class="pricing-card" data-package-id="${pkg.id}">
      <div class="pricing-card__header">
        <h3 class="pricing-card__name">${pkg.name}</h3>
      </div>
      <div class="pricing-card__price">
        <span class="pricing-tag">${pkg.price}</span>
      </div>
      <ul class="pricing-card__features">
        ${pkg.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="signup-button" data-package="${pkg.id}">
        Đăng ký ngay
      </button>
    </div>
  `).join('');
}
```

---

## 7. Cấu Hình Môi Trường

### 7.1 Environment Variables

```
# .env file
VITE_CMS_URL=http://localhost:3000    # HCMS backend URL
VITE_API_KEY=hcms_xxxxxxxxxxxx        # HCMS authentication key
```

### 7.2 Cách server.js đọc config

```javascript
require('dotenv').config();

const CMS_URL = process.env.VITE_CMS_URL || 'http://localhost:3000';
const API_KEY = process.env.VITE_API_KEY || '';

// Phase 2: Dùng để proxy requests tới CMS thật
async function fetchFromCMS(endpoint) {
  const response = await fetch(`${CMS_URL}${endpoint}`, {
    headers: { 'X-API-Key': API_KEY }
  });
  return response.json();
}
```

### 7.3 Phase 2 Architecture (Kế Hoạch)

```mermaid
graph LR
    subgraph Phase2["Phase 2: CMS Integration"]
        direction LR
        CLIENT["Browser"] -->|"fetch /api/fpt/packages"| PROXY["server.js\n(Proxy)"]
        PROXY -->|"GET /api/content/packages\nX-API-Key: hcms_..."| HCMS["HCMS Backend\n:3000"]
        HCMS -->|"Real content"| PROXY
        PROXY -->|"Normalized JSON"| CLIENT
    end
```

---

## 8. Xem Xét Triển Khai (Deployment)

### 8.1 Development Setup

```
[Local Machine]
├── node server.js (port 3001)
│   ├── Serves: index.html, assets/*
│   └── API: /api/fpt/* (mock data)
└── Browser → http://localhost:3001
```

### 8.2 Production Setup (Recommended)

```
[VPS/Cloud Server]
├── Nginx (port 80/443) ← Public traffic
│   ├── SSL termination
│   ├── Static files: /assets/* (cached)
│   └── Proxy: /api/* → Node.js :3001
│
├── Node.js (port 3001, PM2 managed)
│   └── server.js (API only in production)
│
└── HCMS (port 3000, internal only)
    └── Real CMS data
```

### 8.3 Security Architecture

```mermaid
graph TD
    INTERNET["Internet\n(Public)"]
    NGINX["Nginx\n(Reverse Proxy)"]
    NODE["Node.js :3001\n(App Server)"]
    HCMS["HCMS :3000\n(Internal Only)"]
    DB["Database\n(Internal Only)"]

    INTERNET -->|"HTTPS :443"| NGINX
    NGINX -->|"HTTP (internal)"| NODE
    NODE -->|"API Key auth"| HCMS
    HCMS --> DB

    INTERNET -.->|"BLOCKED"| NODE
    INTERNET -.->|"BLOCKED"| HCMS
    INTERNET -.->|"BLOCKED"| DB
```

---

## 9. Giám Sát & Logging

### 9.1 Server Logging (Hiện tại)

```javascript
// server.js logs ra console
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${statusCode}`);
```

### 9.2 Khuyến Nghị Production Logging

```javascript
// Dùng winston hoặc pino cho structured logging
const logger = require('pino')({
  level: process.env.LOG_LEVEL || 'info',
  transport: { target: 'pino-pretty' }
});

logger.info({ method: req.method, url: req.url, status: 200 }, 'Request handled');
```

---

## 10. Liên Kết

- [Deployment Guide](./deployment-guide.md)
- [Codebase Summary](./codebase-summary.md)
- [Project Overview](./project-overview-pdr.md)
