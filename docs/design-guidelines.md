# Hướng Dẫn Thiết Kế (Design Guidelines)

> Tài liệu quy định ngôn ngữ thiết kế thị giác cho **FPT Internet Landing Page**

---

## 1. Brand Colors (Màu Sắc Thương Hiệu)

### 1.1 Primary Colors

| Tên | Hex | RGB | Sử dụng |
|-----|-----|-----|---------|
| **FPT Orange** | `#FF7E00` | rgb(255, 126, 0) | Màu chủ đạo, CTA buttons, accents |
| **FPT Orange Dark** | `#E86E00` | rgb(232, 110, 0) | Hover states, darker variants |
| **FPT Orange Light** | `#FF9A33` | rgb(255, 154, 51) | Highlights, backgrounds nhẹ |
| **FPT Orange Pale** | `#FFF3E6` | rgb(255, 243, 230) | Background cards, tags nhẹ |

### 1.2 Text Colors

| Tên | Hex | Sử dụng |
|-----|-----|---------|
| **Text Primary** | `#1A1A1A` | Nội dung chính, headings |
| **Text Secondary** | `#444444` | Phụ đề, mô tả |
| **Text Muted** | `#888888` | Placeholder, ghi chú nhỏ |
| **Text White** | `#FFFFFF` | Text trên nền tối/cam |
| **Text Link** | `#FF7E00` | Hyperlinks |

### 1.3 Background Colors

| Tên | Hex | Sử dụng |
|-----|-----|---------|
| **White** | `#FFFFFF` | Background mặc định |
| **Light Gray** | `#F8F9FA` | Background sections xen kẽ |
| **Border Gray** | `#E0E0E0` | Đường viền, dividers |
| **Dark** | `#1A1A1A` | Footer background |
| **Dark Secondary** | `#2D2D2D` | Footer section headers |

### 1.4 Status Colors

| Trạng thái | Hex | Sử dụng |
|-----------|-----|---------|
| **Success** | `#28A745` | Form submit thành công |
| **Error** | `#DC3545` | Validation errors |
| **Warning** | `#FFC107` | Thông báo cảnh báo |
| **Info** | `#17A2B8` | Thông tin chung |

### 1.5 CSS Implementation

```css
:root {
  /* Primary Brand Colors */
  --color-primary: #FF7E00;
  --color-primary-dark: #E86E00;
  --color-primary-light: #FF9A33;
  --color-primary-pale: #FFF3E6;

  /* Text Colors */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #444444;
  --color-text-muted: #888888;
  --color-text-white: #FFFFFF;

  /* Backgrounds */
  --color-bg-white: #FFFFFF;
  --color-bg-light: #F8F9FA;
  --color-bg-dark: #1A1A1A;
  --color-border: #E0E0E0;
}
```

---

## 2. Typography (Kiểu Chữ)

### 2.1 Font Family

**Primary Font:** [Outfit](https://fonts.google.com/specimen/Outfit) — Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Outfit', sans-serif;
}
```

**Lý do chọn Outfit:**
- Hiện đại, dễ đọc trên màn hình
- Hỗ trợ đầy đủ tiếng Việt
- Nhiều font weight cho đa dạng typographic hierarchy
- Phù hợp với phong cách tech/telecom

### 2.2 Font Size Scale

| Token | Rem | Px | Sử dụng |
|-------|-----|-----|---------|
| `--text-xs` | 0.75rem | 12px | Fine print, tooltips |
| `--text-sm` | 0.875rem | 14px | Labels, captions |
| `--text-base` | 1rem | 16px | Body text (mặc định) |
| `--text-lg` | 1.125rem | 18px | Emphasized body |
| `--text-xl` | 1.25rem | 20px | Large body, lead text |
| `--text-2xl` | 1.5rem | 24px | H3, section subtitles |
| `--text-3xl` | 1.875rem | 30px | H2, section titles |
| `--text-4xl` | 2.25rem | 36px | H1, hero subtitle |
| `--text-5xl` | 3rem | 48px | Hero title (desktop) |
| `--text-6xl` | 3.75rem | 60px | Extra large hero (4K) |

### 2.3 Font Weights

| Weight | Sử dụng |
|--------|---------|
| **400 (Regular)** | Body text, mô tả |
| **500 (Medium)** | Labels, navigation links |
| **600 (SemiBold)** | Subheadings, card titles |
| **700 (Bold)** | Headings, CTA text |
| **800 (ExtraBold)** | Hero title, price display |

### 2.4 Line Heights

```css
/* Tiêu đề - line height chặt */
h1, h2, h3 { line-height: 1.2; }

/* Body text - dễ đọc */
p, li { line-height: 1.6; }

/* Lead text */
.lead { line-height: 1.4; }
```

---

## 3. Spacing System (Hệ Thống Khoảng Cách)

### 3.1 Spacing Scale

Dựa trên base unit = 4px:

| Token | Value | Sử dụng |
|-------|-------|---------|
| `--space-1` | 4px | Icon padding, micro gaps |
| `--space-2` | 8px | Tight component padding |
| `--space-3` | 12px | Form element gaps |
| `--space-4` | 16px | Default component padding |
| `--space-5` | 20px | Medium gaps |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section inner padding |
| `--space-10` | 40px | Component to component |
| `--space-12` | 48px | Section padding (mobile) |
| `--space-16` | 64px | Section padding (desktop) |
| `--space-20` | 80px | Large section gaps |
| `--space-24` | 96px | XL section padding |

### 3.2 Section Padding

```css
/* Mobile */
.section {
  padding: var(--space-12) 0; /* 48px top/bottom */
}

/* Desktop */
@media (min-width: 768px) {
  .section {
    padding: var(--space-16) 0; /* 64px top/bottom */
  }
}
```

---

## 4. Button Variants

### 4.1 Primary Button - `.btn-orange`

```css
.btn-orange {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.15s ease;
}

.btn-orange:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn-orange:active {
  transform: translateY(0);
}
```

**Sử dụng:** CTA chính, form submit, "Đăng ký ngay"

### 4.2 Outline Button - `.btn-outline-orange`

```css
.btn-outline-orange {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  padding: 10px 26px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-orange:hover {
  background-color: var(--color-primary);
  color: white;
}
```

**Sử dụng:** Nút phụ, "Xem thêm", secondary actions

### 4.3 Register Button - `.btn-register`

```css
.btn-register {
  background: linear-gradient(135deg, #FF7E00, #FF5500);
  color: white;
  border: none;
  border-radius: 50px; /* Pill shape */
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 126, 0, 0.4);
  transition: all 0.3s ease;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 126, 0, 0.5);
}
```

**Sử dụng:** Hero section registration form submit

### 4.4 Phone Button - `.btn-phone`

```css
.btn-phone {
  background-color: #FF7E00;
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
```

**Sử dụng:** Navbar hotline button

### 4.5 Zalo Button - `.btn-zalo`

```css
.btn-zalo {
  background-color: #0068FF; /* Zalo brand blue */
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
```

**Sử dụng:** Zalo contact button

### 4.6 Signup Button - `.signup-button`

```css
.signup-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
  margin-top: 16px;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: var(--color-primary-dark);
}
```

**Sử dụng:** Nút đăng ký trong pricing cards

---

## 5. Component Styles

### 5.1 Pricing Cards

```css
.pricing-card {
  background: white;
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pricing-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 32px rgba(255, 126, 0, 0.15);
  transform: translateY(-4px);
}

.pricing-card--featured {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, #FFF3E6, white);
}

.pricing-tag {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
}
```

### 5.2 FAQ Accordion

```css
.faq-accordion {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.faq-accordion .accordion-item {
  border: none;
  border-bottom: 1px solid var(--color-border);
}

.faq-accordion .accordion-button {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  color: var(--color-text-primary);
  background: white;
  padding: 20px 24px;
}

.faq-accordion .accordion-button:not(.collapsed) {
  color: var(--color-primary);
  background: var(--color-primary-pale);
  box-shadow: none;
}

.faq-accordion .accordion-button::after {
  /* Bootstrap custom arrow - orange color */
  filter: none;
}
```

### 5.3 Hero Banner/Slider

```css
.hero-slider {
  position: relative;
  overflow: hidden;
  border-radius: 0;
  min-height: 500px;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.hero-slide.active {
  opacity: 1;
}

.hero-title {
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  font-weight: 800;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}
```

### 5.4 Promotional Banners

```css
.promotional-banner {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #FF7E00, #FF4500);
}

.promotional-banner img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.promotional-banner:hover img {
  transform: scale(1.03);
}
```

### 5.5 Trust Cards

```css
.trust-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.trust-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
}

.trust-card__number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
}
```

### 5.6 Footer

```css
.fpt-footer {
  background-color: var(--color-bg-dark);
  color: var(--color-text-white);
  padding: 60px 0 30px;
}

.fpt-footer__logo {
  filter: brightness(0) invert(1); /* Logo trắng trên nền tối */
}

.fpt-footer__link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.fpt-footer__link:hover {
  color: var(--color-primary);
}

.fpt-footer__copyright {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  color: rgba(255,255,255,0.5);
  font-size: 0.875rem;
}
```

---

## 6. Responsive Breakpoints

| Breakpoint | Min-width | Target devices |
|-----------|-----------|---------------|
| **xs** | 0px | Mobile nhỏ (< 576px) |
| **sm** | 576px | Mobile lớn, phablet |
| **md** | 768px | Tablet portrait |
| **lg** | 992px | Tablet landscape, laptop nhỏ |
| **xl** | 1200px | Desktop |
| **xxl** | 1400px | Desktop lớn, 4K |

### Ví Dụ Responsive Pattern

```css
/* Mobile first: 1 column */
.pricing-grid {
  grid-template-columns: 1fr;
  gap: 16px;
}

/* sm: 2 columns */
@media (min-width: 576px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* lg: 3 columns */
@media (min-width: 992px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
```

---

## 7. Animation & Transition Standards

### 7.1 Transition Durations

| Tên | Duration | Easing | Sử dụng |
|-----|----------|--------|---------|
| **Instant** | 0ms | — | No animation |
| **Fast** | 150ms | ease | Hover states nhỏ |
| **Base** | 300ms | ease | Button hover, card hover |
| **Slow** | 500ms | ease | Slider transitions |
| **Lazy** | 600ms | ease-in-out | Page-level transitions |

### 7.2 Standard Transitions

```css
/* Hover lift effect */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* Button press */
.btn-press {
  transition: transform 0.15s ease;
}
.btn-press:active {
  transform: scale(0.97);
}

/* Fade in on scroll */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.5s ease forwards;
}

/* Marquee scroll */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  animation: marquee 20s linear infinite;
}
```

### 7.3 Slider Animation

```css
/* Hero banner crossfade */
.slide {
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.slide.active {
  opacity: 1;
}
```

---

## 8. Image Guidelines

### 8.1 Format & Optimization

| Loại ảnh | Format khuyến nghị | Kích thước tối đa |
|---------|--------------------|------------------|
| Hero banners | WebP (với PNG fallback) | 1920x800px, 200KB |
| Package icons | PNG (transparent bg) | 200x200px, 30KB |
| Promotional | WebP | 800x400px, 100KB |
| Logo | SVG hoặc PNG | 200x60px, 10KB |
| Trust icons | SVG | 64x64px |

### 8.2 Responsive Images

```html
<!-- Sử dụng srcset cho responsive images -->
<img
  src="assets/images/banner-desktop.png"
  srcset="
    assets/images/banner-mobile.png 576w,
    assets/images/banner-tablet.png 768w,
    assets/images/banner-desktop.png 1200w
  "
  sizes="100vw"
  alt="FPT Internet - Đăng ký gói cước ưu đãi"
  width="1200"
  height="500"
  loading="lazy"
>
```

### 8.3 Object Fit Patterns

```css
/* Card images */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

/* Logo images */
.logo-image {
  width: auto;
  height: 40px;
  object-fit: contain;
}
```

---

## 9. Iconography

Sử dụng **Bootstrap Icons** cho toàn bộ icons:

```html
<!-- Phone icon -->
<i class="bi bi-telephone-fill" aria-hidden="true"></i>

<!-- Check icon trong feature list -->
<i class="bi bi-check-circle-fill text-success" aria-hidden="true"></i>

<!-- Arrow icon -->
<i class="bi bi-arrow-right" aria-hidden="true"></i>

<!-- Zalo icon (custom SVG nếu cần) -->
<img src="assets/images/zalo-icon.png" alt="" width="20" height="20" aria-hidden="true">
```

---

## 10. Do's and Don'ts

### Do's ✅
- Sử dụng màu cam FPT (`#FF7E00`) nhất quán cho tất cả CTAs
- Đảm bảo contrast ratio >= 4.5:1 cho text accessibility
- Thêm hover states cho tất cả interactive elements
- Dùng `transition` cho smooth UX
- Test responsive trên Chrome DevTools (375px, 768px, 1440px)

### Don'ts ❌
- KHÔNG dùng màu đỏ/xanh lá cho CTAs (dễ nhầm với error/success)
- KHÔNG dùng font chữ khác Outfit cho nội dung chính
- KHÔNG bỏ alt text của ảnh
- KHÔNG dùng box-shadow quá nặng làm trang chậm
- KHÔNG set font-size < 12px cho bất kỳ text nào
