# Tiêu Chuẩn Code

> Tài liệu quy định tiêu chuẩn viết code cho dự án **FPT Internet Landing Page**

---

## 1. Nguyên Tắc Chung

### 1.1 Triết Lý Phát Triển

Dự án tuân thủ 3 nguyên tắc cốt lõi:

| Nguyên tắc | Định nghĩa | Áp dụng |
|-----------|-----------|---------|
| **YAGNI** | You Aren't Gonna Need It | Không thêm tính năng chưa cần thiết |
| **KISS** | Keep It Simple, Stupid | Ưu tiên giải pháp đơn giản nhất |
| **DRY** | Don't Repeat Yourself | Tái sử dụng code, tránh lặp lại |

### 1.2 Quy Tắc Đặt Tên File

- Sử dụng **kebab-case** cho tên file: `hero-section.css`, `pricing-card.js`
- Tên file phải mô tả rõ mục đích, không viết tắt khó hiểu
- Ví dụ tốt: `registration-form-handler.js`, `pricing-section.css`
- Ví dụ xấu: `rgh.js`, `style2.css`, `temp.html`

### 1.3 Giới Hạn Kích Thước File

- **Giới hạn tối đa: 200 dòng** mỗi file code
- Nếu file vượt quá 200 dòng, phải tách thành các module nhỏ hơn
- Ưu tiên composition thay vì inheritance cho các component phức tạp
- Tách utility functions thành các module riêng biệt

---

## 2. Tiêu Chuẩn HTML

### 2.1 Sử Dụng Semantic Elements

Luôn ưu tiên các HTML5 semantic elements thay vì `div` thuần túy:

```html
<!-- ĐÚNG: Sử dụng semantic elements -->
<header class="site-header">
  <nav class="main-nav" aria-label="Main navigation">
    <ul class="nav-list">
      <li class="nav-item"><a href="#pricing-section">Gói cước</a></li>
    </ul>
  </nav>
</header>

<main>
  <section id="hero-section" aria-label="Hero banner">
    <article class="registration-form">
      <h1>Đăng ký Internet FPT</h1>
    </article>
  </section>

  <section id="pricing-section" aria-labelledby="pricing-title">
    <h2 id="pricing-title">Bảng Giá Gói Cước</h2>
  </section>
</main>

<footer class="fpt-footer">
  <address>024 7300 2222</address>
</footer>

<!-- SAI: Dùng div cho mọi thứ -->
<div class="header">
  <div class="nav">
    <div class="nav-item">...</div>
  </div>
</div>
```

### 2.2 BEM-like Naming Convention

Sử dụng quy ước đặt tên class theo phong cách BEM (Block Element Modifier):

```html
<!-- Block: thành phần độc lập -->
<div class="pricing-card">

  <!-- Element: thành phần con của block -->
  <div class="pricing-card__header">
    <h3 class="pricing-card__title">Giga</h3>
    <span class="pricing-card__badge">Phổ biến</span>
  </div>

  <div class="pricing-card__body">
    <div class="pricing-card__price">
      <span class="pricing-card__price-amount">165.000đ</span>
      <span class="pricing-card__price-period">/tháng</span>
    </div>
  </div>

  <!-- Modifier: trạng thái hoặc biến thể -->
  <div class="pricing-card pricing-card--featured">...</div>
  <div class="pricing-card pricing-card--combo">...</div>
</div>
```

### 2.3 Accessibility (A11y)

```html
<!-- Luôn thêm alt text cho ảnh -->
<img src="assets/images/logo.png" alt="FPT Telecom logo" width="120" height="40">

<!-- Sử dụng aria-label cho các element không có text rõ ràng -->
<button class="btn-close" aria-label="Đóng modal">
  <i class="bi bi-x-lg" aria-hidden="true"></i>
</button>

<!-- Sử dụng role khi cần thiết -->
<div role="alert" class="form-error" id="form-error-message">
  Vui lòng điền đầy đủ thông tin
</div>

<!-- Form labels phải liên kết với input -->
<label for="customer-phone">Số điện thoại</label>
<input type="tel" id="customer-phone" name="phone"
       placeholder="Nhập số điện thoại" required
       aria-describedby="phone-hint">
<small id="phone-hint">Ví dụ: 0901234567</small>

<!-- Skip links cho keyboard navigation -->
<a href="#main-content" class="skip-link">Bỏ qua điều hướng</a>
```

### 2.4 Meta Tags & SEO

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Đăng ký Internet FPT - Gói cước từ 165.000đ/tháng. Tốc độ cao, ổn định, phủ sóng toàn quốc. Hotline: 024 7300 2222">
  <meta name="keywords" content="Internet FPT, đăng ký internet, gói cước internet, FPT Telecom">
  <title>Đăng Ký Internet FPT - Gói Cước Từ 165.000đ/tháng</title>
  <!-- Mỗi trang chỉ có 1 thẻ h1 -->
</head>
```

---

## 3. Tiêu Chuẩn CSS

### 3.1 CSS Custom Properties (Variables)

Định nghĩa tất cả giá trị tái sử dụng trong `:root`:

```css
:root {
  /* === COLORS === */
  --color-primary: #FF7E00;
  --color-primary-dark: #E86E00;
  --color-primary-light: #FF9A33;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-bg-white: #FFFFFF;
  --color-bg-light: #F8F9FA;
  --color-border: #E0E0E0;

  /* === TYPOGRAPHY === */
  --font-family-primary: 'Outfit', sans-serif;
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  /* === SPACING === */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* === BORDER RADIUS === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);

  /* === TRANSITIONS === */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### 3.2 Mobile-First Approach

Viết CSS theo hướng mobile-first — style mặc định cho mobile, override cho màn hình lớn hơn:

```css
/* Mobile first - style mặc định */
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.hero-title {
  font-size: var(--font-size-2xl);
  line-height: 1.3;
}

/* Tablet - 576px+ */
@media (min-width: 576px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop - 768px+ */
@media (min-width: 768px) {
  .hero-title {
    font-size: var(--font-size-4xl);
  }

  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
  }
}

/* Large Desktop - 992px+ */
@media (min-width: 992px) {
  .pricing-grid {
    padding: var(--spacing-2xl);
  }
}
```

### 3.3 Quy Tắc Sử Dụng `!important`

- **KHÔNG** sử dụng `!important` ngoại trừ trường hợp override utility class của Bootstrap
- Nếu cần override Bootstrap, hãy tăng specificity thay vì dùng `!important`

```css
/* ĐÚNG: Tăng specificity */
.fpt-section .btn-primary {
  background-color: var(--color-primary);
}

/* ĐÚNG: Override Bootstrap utility khi thực sự cần */
.hero-section .text-white {
  color: #FFFFFF !important; /* override Bootstrap color utility */
}

/* SAI: Dùng !important không có lý do */
.pricing-card {
  padding: 24px !important;
  margin: 0 !important;
}
```

### 3.4 Tổ Chức CSS

```css
/* 1. CSS Variables */
:root { }

/* 2. Base/Reset styles */
* { box-sizing: border-box; }
body { }

/* 3. Typography */
h1, h2, h3 { }

/* 4. Layout components */
.container { }
.section { }

/* 5. Navigation */
.navbar { }

/* 6. Sections (theo thứ tự xuất hiện trên trang) */
.hero-section { }
.pricing-section { }
.wifi-section { }

/* 7. Components (dùng chung nhiều nơi) */
.btn-orange { }
.pricing-card { }

/* 8. Utilities */
.text-orange { }

/* 9. Media queries (ở cuối file) */
@media (min-width: 768px) { }
```

---

## 4. Tiêu Chuẩn JavaScript

### 4.1 ES6+ Features

```javascript
// Luôn dùng const/let, không dùng var
const API_BASE = 'http://localhost:3001/api/fpt';
let currentSlide = 0;

// Arrow functions cho callbacks
const packages = data.map(pkg => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price
}));

// Template literals thay vì string concatenation
const apiUrl = `${API_BASE}/packages`;
const cardHtml = `
  <div class="pricing-card" data-package-id="${pkg.id}">
    <h3 class="pricing-card__title">${pkg.name}</h3>
  </div>
`;

// Destructuring
const { fullName, phone, address } = formData;
const [firstBanner, ...restBanners] = banners;

// Default parameters
function renderPackage(pkg, isHighlighted = false) { }

// Optional chaining
const price = pkg?.price?.amount ?? 'Liên hệ';

// Async/Await thay vì promise chains
async function fetchPackages() {
  try {
    const response = await fetch(`${API_BASE}/packages`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi tải gói cước:', error);
    return null;
  }
}
```

### 4.2 Error Handling

```javascript
// Luôn wrap fetch calls trong try/catch
async function loadSection(endpoint, renderFn) {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    renderFn(data);
  } catch (error) {
    console.error(`[FPT] Lỗi tải dữ liệu từ ${endpoint}:`, error.message);
    // Hiển thị fallback content thay vì crash
    showFallbackContent();
  }
}

// Form validation với error messages rõ ràng
function validateForm(formData) {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên';
  }

  if (!formData.phone?.match(/^(0|\+84)[0-9]{9}$/)) {
    errors.phone = 'Số điện thoại không hợp lệ (ví dụ: 0901234567)';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
```

### 4.3 DOM Manipulation Patterns

```javascript
// Cache DOM references
const DOM = {
  pricingGrid: document.getElementById('pricing-section'),
  heroSlider: document.querySelector('.hero-slider'),
  registrationForm: document.getElementById('registration-form'),
  faqContainer: document.getElementById('faq-section'),
};

// Sử dụng DocumentFragment cho bulk inserts
function renderPackages(packages) {
  const fragment = document.createDocumentFragment();

  packages.forEach(pkg => {
    const card = createPackageCard(pkg);
    fragment.appendChild(card);
  });

  DOM.pricingGrid.appendChild(fragment);
}

// Event delegation thay vì gắn listener cho từng element
document.addEventListener('click', (event) => {
  if (event.target.matches('.btn-register')) {
    handleRegisterClick(event.target.dataset.packageId);
  }

  if (event.target.matches('.faq-question')) {
    toggleFAQ(event.target.closest('.faq-item'));
  }
});

// Sử dụng data attributes để lưu state
function selectPackage(packageId) {
  // Remove active từ tất cả cards
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.classList.remove('pricing-card--active');
    card.removeAttribute('aria-selected');
  });

  // Set active cho card được chọn
  const selectedCard = document.querySelector(`[data-package-id="${packageId}"]`);
  if (selectedCard) {
    selectedCard.classList.add('pricing-card--active');
    selectedCard.setAttribute('aria-selected', 'true');
  }
}
```

### 4.4 Module Pattern

```javascript
// Tổ chức code theo module pattern
const HeroSlider = (() => {
  let currentIndex = 0;
  let slides = [];
  let autoplayTimer = null;

  function init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    slides = Array.from(container.querySelectorAll('.slide'));
    setupControls(container);
    startAutoplay();
  }

  function goTo(index) {
    slides[currentIndex]?.classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex]?.classList.add('active');
  }

  function startAutoplay(interval = 5000) {
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), interval);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  return { init, goTo, stopAutoplay };
})();
```

---

## 5. Quy Tắc Đặt Tên

### 5.1 HTML IDs & Classes

| Loại | Quy tắc | Ví dụ |
|------|---------|-------|
| Section IDs | `#section-name` | `#pricing-section`, `#faq-section` |
| Component classes | `.component-name` | `.pricing-card`, `.hero-slider` |
| State classes | `.is-active`, `.is-open` | `.is-active`, `.is-loading` |
| JS hooks | `.js-hook-name` | `.js-toggle-faq` |
| Utility classes | `.u-text-center` | `.u-hidden`, `.u-mt-md` |

### 5.2 JavaScript Variables & Functions

```javascript
// Variables: camelCase
const apiBaseUrl = 'http://localhost:3001';
let currentPackageId = null;
const MAX_RETRY_COUNT = 3; // Constants: UPPER_SNAKE_CASE

// Functions: camelCase, verb prefix
function fetchPackages() { }
function renderPricingCards(packages) { }
function handleFormSubmit(event) { }
function toggleFAQItem(element) { }
function formatPrice(amount) { }

// Event handlers: handle prefix
function handleSliderNext() { }
function handleRegistrationSubmit(event) { }

// Async functions: async prefix hoặc Async suffix
async function loadPageData() { }
async function submitRegistrationAsync(formData) { }
```

---

## 6. Tổ Chức File

### 6.1 Cấu Trúc CSS (style.css)

```
/* === SECTION 1: Variables === (dòng 1-60) */
/* === SECTION 2: Base === (dòng 61-100) */
/* === SECTION 3: Navbar === (dòng 101-150) */
/* === SECTION 4: Hero === (dòng 151-220) */
/* === SECTION 5: Marquee === (dòng 221-250) */
/* === SECTION 6: Pricing === (dòng 251-330) */
/* === SECTION 7: WiFi & FPT Play === (dòng 331-400) */
/* === SECTION 8: Promotions === (dòng 401-430) */
/* === SECTION 9: Trust/News === (dòng 431-470) */
/* === SECTION 10: FAQ === (dòng 471-510) */
/* === SECTION 11: Footer === (dòng 511-545) */
/* === SECTION 12: Responsive === (dòng 546-562) */
```

### 6.2 Thứ Tự Script trong HTML

```html
<!-- 1. Critical CSS inline (nếu cần) -->
<style>/* above-the-fold styles */</style>

<!-- 2. External CSS -->
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/style.css">

<!-- 3. Google Fonts (preconnect + stylesheet) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/..." rel="stylesheet">

<!-- 4. Scripts ở cuối body -->
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script>/* Inline JS chính của trang */</script>
```

---

## 7. Security Standards

### 7.1 Input Sanitization

```javascript
// Luôn sanitize user input trước khi inject vào DOM
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ĐÚNG: Dùng textContent hoặc sanitize
element.textContent = userInput;
element.innerHTML = sanitizeHTML(userInput);

// SAI: Inject raw user input vào innerHTML
element.innerHTML = userInput; // XSS risk!
```

### 7.2 Form Security

```javascript
// Validate input cả phía client và server
function validatePhone(phone) {
  // Chỉ cho phép số và dấu + ở đầu
  return /^(0|\+84)[0-9]{9}$/.test(phone.trim());
}

// Không lưu sensitive data trong localStorage
// ĐÚNG: Lưu preference không nhạy cảm
localStorage.setItem('selected-package', packageId);

// SAI: Lưu thông tin cá nhân
localStorage.setItem('user-phone', phone); // Privacy risk!
```

---

## 8. Performance Standards

```javascript
// Lazy loading cho images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});
images.forEach(img => imageObserver.observe(img));

// Debounce cho search/filter inputs
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle cho scroll events
function throttle(fn, limit = 100) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn(...args);
    }
  };
}
```
