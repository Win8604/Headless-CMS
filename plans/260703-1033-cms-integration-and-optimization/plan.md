# Plan: CMS Integration & Optimization
**Date:** 260703-1033 | **Status:** In Progress

## Goal
Tích hợp CMS API thực, tối ưu hóa codebase, cải thiện SEO và performance cho FPT Internet Landing Page.

## Context
- Single-page HTML landing page cho dịch vụ Internet FPT Telecom
- Hiện tại: Static page + mock API (server.js)
- Tech: HTML5, CSS3 Vanilla, Bootstrap 5.3.8, Node.js
- `index.html` = 3541 lines (cần refactor), `style.css` = 562 lines (có duplicate variables)
- `.env` có `VITE_CMS_URL=http://localhost:3000` → chuẩn bị cho CMS integration

## Phases

| # | Phase | Description | Status |
|---|-------|-------------|--------|
| 01 | [Code Refactoring](./phase-01-code-refactoring.md) | Split monolithic index.html, clean CSS | ⏳ Pending |
| 02 | [CMS Integration](./phase-02-cms-integration.md) | Replace mock API with real CMS endpoints | ⏳ Pending |
| 03 | [SEO Optimization](./phase-03-seo-optimization.md) | Meta tags, structured data, sitemap | ⏳ Pending |
| 04 | [Performance Optimization](./phase-04-performance-optimization.md) | Image compression, lazy loading, CSS cleanup | ⏳ Pending |
| 05 | Analytics & Tracking | Google Analytics, conversion tracking | ⏳ Pending |
| 06 | Testing & QA | Cross-browser, responsive, API integration tests | ⏳ Pending |

## Key Dependencies
- Phase 01 phải hoàn thành trước Phase 02, 03, 04 (clean codebase làm nền)
- Phase 02 yêu cầu CMS backend thực sự đang chạy tại `VITE_CMS_URL`
- Phase 04 phụ thuộc Phase 01 (CSS đã được tổ chức lại)
- Phase 05, 06 chạy sau khi các phase core (01-04) hoàn thành

## Target Metrics
- Lighthouse SEO Score > 90
- Lighthouse Performance Score > 80
- LCP < 2.5s
- Zero duplicate CSS variables
- No file > 200 lines (except index.html sections documented)
