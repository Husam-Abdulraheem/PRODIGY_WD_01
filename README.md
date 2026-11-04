# LUMINA Botanicals — Organic Luxury Skincare Landing Page
### Prodigy InfoTech Web Development Internship — Task 01 (`PRODIGY_WD_01`)

An interactive, responsive landing page for an organic botanical skincare brand (**عناية فاخرة بالبشرة**). Built with clean semantic HTML5, modern CSS3 (Custom properties, Flexbox, Grid, Container Queries, and Glassmorphism), and vanilla JavaScript.

---

## 🌟 Key Features

### 1. Interactive Navigation Menu (Core Task Requirement)
* **Fixed & Visible**: Positioned permanently at the top of the viewport.
* **Scroll-Activated Dynamic Styling**:
  * Starts transparent over the hero section.
  * Transitions smoothly upon scrolling into a modern frosted-glass blur (`backdrop-filter: blur(18px)`) with subtle borders and elevation shadows.
  * Dynamically compacts height (`84px` down to `68px`).
* **Active Section Tracking (ScrollSpy)**:
  * Implements modern CSS `scroll-target-group: auto` and `:target-current` with high-performance `IntersectionObserver` fallback.
  * Automatically highlights the active section link and maintains accessibility with dynamic `aria-current="page"`.
* **Micro-interactions & Hover Effects**:
  * Smooth pill highlights and color transitions on hover.
  * Animated accent underline indicator on active links.
* **Reading Scroll Progress Bar**:
  * Real-time progress bar positioned at the bottom edge of the navbar tracking viewport scroll depth.
* **Accessible Mobile Drawer**:
  * Animated hamburger toggle that morphs into a close `X`.
  * Slide-in navigation drawer with backdrop blur, keyboard trap support, and `Escape` key dismissal.

### 2. Full Organic Skincare Experience (عناية بالبشرة)
* **Announcement Bar**: Special promo and bilingual Arabic/English customer support header.
* **Hero Section**: High-resolution imagery, floating clinical result badges, and clear conversion calls-to-action.
* **Trust & Certification Bar**: Badges for 100% Vegan, Leaping Bunny Cruelty-Free, Dermatologist Approved, and Eco Glass.
* **Philosophy & Botanical Ingredients**: Highlights key actives (Centella Asiatica / Cica, Wild Rosehip Seed Elixir, Botanical Hyaluronic Acid, Camellia & Green Tea).
* **Interactive Collection**: Product cards with interactive category filtering (*All Rituals, Serums, Creams, Cleansers*), pricing, ratings, and instant notification feedback.
* **The 3-Step Ritual**: Interactive guide detailing Purify, Infuse, and Seal steps.
* **Verified Customer Testimonials**: Reviews from verified international and regional buyers.
* **Personalized Skin Consultation**: Accessible form with live field validation and immediate feedback.

---

## 📁 Project Structure

```
PRODIGY_WD_01/
├── index.html     # Semantic HTML5 structure & accessibility tags
├── styles.css     # Design tokens, responsive grid, glassmorphism, animations
├── script.js      # Navigation scroll listener, ScrollSpy, mobile drawer, filters
└── README.md      # Project documentation
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone git@github.com:Husam-Abdulraheem/PRODIGY_WD_01.git
   cd PRODIGY_WD_01
   ```
2. Open `index.html` in your web browser:
   - On Linux/Mac:
     ```bash
     xdg-open index.html   # or open index.html
     ```
   - Or using any local HTTP server:
     ```bash
     npx serve .
     # or
     python3 -m http.server 3000
     ```

---

## 🛠️ Built With
* **HTML5**: Semantic markup, ARIA roles, modern image attributes (`fetchpriority`, `loading="lazy"`).
* **CSS3**: Variables, Flexbox, CSS Grid, Glassmorphism, CSS Scroll-Target-Group & Target-Current.
* **JavaScript (ES6+)**: `requestAnimationFrame` scroll throttling, `IntersectionObserver` API, event delegation.

---

## 👤 Author
- **Husam Abdulraheem**
- **Internship**: Prodigy InfoTech — Web Development Track
- **Task**: 01 (Responsive Landing Page with Interactive Navigation)
