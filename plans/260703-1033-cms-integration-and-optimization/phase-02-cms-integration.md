# Phase 02: CMS Integration

## Context Links
- Plan: [plan.md](./plan.md)
- Phase trước: [Phase 01: Code Refactoring](./phase-01-code-refactoring.md)
- Mock API: [server.js](../../server.js)
- Main page: [index.html](../../index.html)
- Env config: [.env](../../.env) — `VITE_CMS_URL=http://localhost:3000`

---

## Overview
- **Priority:** 🔴 High
- **Status:** ⏳ Pending
- **Depends on:** Phase 01 (clean codebase)
- **Blocks:** Phase 05, 06

**Mô tả:** Hiện tại `server.js` chứa hardcoded mock data cho tất cả API endpoints (`/api/fpt/*`). Phase này thay thế toàn bộ mock data bằng calls thực đến CMS tại `VITE_CMS_URL`, thêm API service layer, xử lý loading states và error handling với fallback UI.

---

## Key Insights
- `.env` file có `VITE_CMS_URL=http://localhost:3000` nhưng server.js chưa đọc biến này
- Tất cả `/api/fpt/*` endpoints hiện trả về hardcoded mock JSON
- `index.html` fetch data từ `/api/fpt/*` (relative URLs → qua Node.js server)
- Cần API service layer để centralize fetch logic, error handling, và retry logic
- CMS backend phải expose các endpoints tương ứng (xem danh sách bên dưới)
- Fallback UI quan trọng: nếu CMS down, page vẫn hiển thị (dùng mock data từ server.js làm fallback)

---

## Requirements

### Functional
- `server.js` đọc `VITE_CMS_URL` từ environment variable (thay vì hardcode)
- Mỗi `/api/fpt/*` endpoint proxy đến CMS tương ứng
- Nếu CMS không available → fallback về mock data (graceful degradation)
- Loading states hiển thị khi đang fetch data từ CMS
- Error states hiển thị khi CMS trả về error (với fallback UI)
- Registration form (`POST /api/fpt/registrations`) gửi đến CMS

### Non-functional
- API service layer tập trung trong `assets/js/api-service.js`
- Timeout 10 giây cho mỗi CMS request
- Console logging rõ ràng (CMS source vs fallback source)
- Không expose CMS URL trực tiếp ra client-side HTML

---

## Architecture

### Request Flow
```
Browser → /api/fpt/* (Node.js server.js) → CMS_URL/api/* → JSON Response
                                         ↘ [on error] → Mock Fallback Data
```

### API Service Layer (assets/js/api-service.js)
```javascript
// Centralized API service
const ApiService = {
  baseUrl: '/api/fpt',
  timeout: 10000,

  async fetch(endpoint, options = {}) { /* fetch with timeout & error handling */ },
  async getBanners() { return this.fetch('/banners'); },
  async getPackages() { return this.fetch('/packages'); },
  async getPromotions() { return this.fetch('/promotions'); },
  async getMenus() { return this.fetch('/menus'); },
  async getSettings() { return this.fetch('/footer/settings'); },
  async getFooterLinks() { return this.fetch('/footer/links'); },
  async getFaqs() { return this.fetch('/faqs'); },
  async submitRegistration(data) { return this.fetch('/registrations', { method: 'POST', body: data }); }
};
```

### Server.js Proxy Pattern
```javascript
// Đọc CMS_URL từ .env
const CMS_URL = process.env.VITE_CMS_URL || 'http://localhost:3000';

// Proxy helper với fallback
async function proxyToCMS(cmsPath, fallbackData, res) {
  try {
    const response = await fetch(`${CMS_URL}${cmsPath}`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`CMS returned ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.warn(`[CMS] ${cmsPath} failed (${err.message}), using fallback`);
    res.json(fallbackData);
  }
}
```

---

## Related Code Files

### Modify
- `server.js` — Thêm dotenv config, implement CMS proxy với fallback
- `index.html` — Thêm loading states, sử dụng `ApiService` thay vì raw fetch

### Create
- `assets/js/api-service.js` — Centralized API service module

### Reference (không thay đổi)
- `.env` — Source của `VITE_CMS_URL`

---

## API Endpoints

| Local Endpoint | CMS Endpoint | Method | Fallback |
|---------------|-------------|--------|---------|
| `GET /api/fpt/banners` | `{CMS_URL}/api/banners` | GET | Mock banners array |
| `GET /api/fpt/packages` | `{CMS_URL}/api/packages` | GET | Mock 6 packages |
| `GET /api/fpt/promotions` | `{CMS_URL}/api/promotions` | GET | Mock promotions array |
| `GET /api/fpt/menus` | `{CMS_URL}/api/menus` | GET | Mock nav menu |
| `GET /api/fpt/footer/settings` | `{CMS_URL}/api/footer/settings` | GET | Mock company info |
| `GET /api/fpt/footer/links` | `{CMS_URL}/api/footer/links` | GET | Mock footer links |
| `GET /api/fpt/faqs` | `{CMS_URL}/api/faqs` | GET | Mock FAQ list |
| `POST /api/fpt/registrations` | `{CMS_URL}/api/registrations` | POST | Error message |

---

## Error Handling Strategy

1. **Network timeout (>10s):** Log warning, trả về fallback data
2. **CMS HTTP 4xx/5xx:** Log error với status code, trả về fallback data
3. **CMS unreachable (ECONNREFUSED):** Log critical warning, trả về fallback data
4. **Invalid JSON response:** Log parse error, trả về fallback data
5. **POST /registrations failure:** Không có fallback → hiển thị error message cho user, suggest gọi hotline

### Loading State UI Pattern
```html
<!-- Skeleton loading cho packages section -->
<div class="packages-skeleton" id="packages-loading">
  <div class="skeleton-card"></div>
  <!-- ... -->
</div>
<div id="packages-container" style="display:none">
  <!-- Populated bằng JS sau khi fetch -->
</div>
```

---

## Implementation Steps

1. **Cài đặt và config dotenv trong server.js**
   - Thêm `require('dotenv').config()` ở đầu `server.js`
   - Verify `process.env.VITE_CMS_URL` được đọc đúng
   - Log CMS URL khi server khởi động

2. **Implement `proxyToCMS` helper trong server.js**
   - Helper function nhận: `cmsPath`, `fallbackData`, `res`
   - Fetch đến `${CMS_URL}${cmsPath}` với AbortSignal timeout
   - Catch errors → log warning → serve fallback data

3. **Update từng API route trong server.js**
   - Thay thế `res.json(mockData)` bằng `proxyToCMS(cmsPath, mockData, res)`
   - Giữ nguyên mock data như fallback (không xóa)
   - Test từng endpoint với CMS down để verify fallback hoạt động

4. **Tạo `assets/js/api-service.js`**
   - Implement `ApiService` object với tất cả API methods
   - Implement fetch wrapper với timeout, error handling
   - Export hoặc attach vào `window.ApiService`

5. **Thêm loading states vào index.html**
   - Thêm skeleton UI cho: banners, packages, promotions, FAQ
   - CSS cho skeleton animation (shimmer effect)

6. **Update fetch calls trong index.html**
   - Replace raw `fetch('/api/fpt/...')` bằng `ApiService.getXxx()`
   - Implement show/hide loading states
   - Implement error fallback UI (hiển thị cached/static content)

7. **Test registration form**
   - Test POST với CMS available → success message
   - Test POST với CMS down → error message với hotline info

8. **End-to-end testing**
   - Test với `VITE_CMS_URL` trỏ đến CMS thực
   - Test với CMS deliberately down → verify fallback
   - Test với invalid `VITE_CMS_URL` → verify graceful degradation

---

## Todo List

- [ ] Thêm `require('dotenv').config()` vào `server.js`
- [ ] Implement `proxyToCMS()` helper function
- [ ] Update route: `GET /api/fpt/banners` → proxy
- [ ] Update route: `GET /api/fpt/packages` → proxy
- [ ] Update route: `GET /api/fpt/promotions` → proxy
- [ ] Update route: `GET /api/fpt/menus` → proxy
- [ ] Update route: `GET /api/fpt/footer/settings` → proxy
- [ ] Update route: `GET /api/fpt/footer/links` → proxy
- [ ] Update route: `GET /api/fpt/faqs` → proxy
- [ ] Update route: `POST /api/fpt/registrations` → proxy
- [ ] Tạo `assets/js/api-service.js`
- [ ] Thêm skeleton loading CSS
- [ ] Thêm loading states vào index.html
- [ ] Replace raw fetch calls bằng ApiService
- [ ] Test tất cả endpoints với CMS available
- [ ] Test fallback behavior với CMS down
- [ ] Test registration form flow (success + error)

---

## Success Criteria
- ✅ `server.js` đọc `VITE_CMS_URL` từ `.env`
- ✅ Tất cả 8 endpoints proxy đến CMS khi available
- ✅ Tất cả 8 endpoints fallback về mock data khi CMS down
- ✅ Console log rõ ràng: "[CMS]" prefix, source indicator
- ✅ Loading skeleton hiển thị trong quá trình fetch
- ✅ Registration form hoạt động end-to-end với CMS
- ✅ Không có unhandled promise rejections trong console
- ✅ Page vẫn load đầy đủ khi CMS completely unavailable

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CMS API response format khác mock data | High | High | Map/transform CMS response sang expected format |
| CORS issues khi server.js proxy đến CMS | Medium | High | CMS phải whitelist server's origin hoặc dùng server-side proxy |
| CMS rate limiting | Low | Medium | Implement request caching trong server.js |
| Registration data loss khi CMS down | Medium | High | Queue failed registrations, notify admin |

---

## Security Considerations
- `VITE_CMS_URL` chỉ được đọc ở server-side (`server.js`), không expose ra client HTML
- CMS authentication credentials (nếu có) phải lưu trong `.env`, không hardcode
- Sanitize/validate POST body trước khi forward đến CMS
- Rate limit `/api/fpt/registrations` endpoint để tránh spam
- Add `helmet` middleware vào `server.js` nếu chưa có

---

## Next Steps
- Sau Phase 02 → **[Phase 03: SEO Optimization](./phase-03-seo-optimization.md)**
- Song song có thể chạy **[Phase 04: Performance](./phase-04-performance-optimization.md)**
- Phase 05 (Analytics) cần Phase 02 hoàn thành để track CMS-driven content events
