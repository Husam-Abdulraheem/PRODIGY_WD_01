# LUMINA Botanicals — Organic Skincare Landing Page
### Prodigy InfoTech Web Development Internship — Task 01 (`PRODIGY_WD_01`)

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://husam-abdulraheem.github.io/PRODIGY_WD_01/)
[![Deploy to GitHub Pages](https://github.com/Husam-Abdulraheem/PRODIGY_WD_01/actions/workflows/deploy.yml/badge.svg)](https://github.com/Husam-Abdulraheem/PRODIGY_WD_01/actions/workflows/deploy.yml)

An interactive, responsive landing page for a clean and organic botanical skincare brand. Built using semantic HTML5, modern CSS3, and vanilla JavaScript.

🌐 **Live URL**: [https://husam-abdulraheem.github.io/PRODIGY_WD_01/](https://husam-abdulraheem.github.io/PRODIGY_WD_01/)

---

## 📋 Task Requirements & Implementation Checklist

| Task Requirement (from Specification) | Implementation Details |
| :--- | :--- |
| **Interactive Navigation Menu** | Pinned fixed navigation header with dynamic styling, hover effects, and ScrollSpy. |
| **Fixed Position & Visible on All Pages** | `position: fixed; top: 0; width: 100%;` implemented on `index.html`, `about.html`, `products.html`, and `contact.html`. |
| **Changes Color or Style When Scrolled** | JavaScript `scroll` event dynamically transforms navbar background color (from porcelain to solid `#FFFFFF`), adds shadow, and compacts height. |
| **Changes Color When Hovering Over Item** | JavaScript `mouseenter` & `mouseleave` event listeners dynamically set `backgroundColor = '#1F362A'` and `color = '#FFFFFF'`. |
| **HTML Structure, CSS Styling, JS Interactivity** | Fully modular structure: `index.html` (markup), `styles.css` (design tokens & layout), and `script.js` (interactivity). |
| **100% English Language** | All copy, UI text, labels, and documentation are in English. |

---

## 🌟 Key Features

1. **Fixed & Ubiquitous Navigation**:
   - Pinned at the very top across all pages (`index.html`, `about.html`, `products.html`, `contact.html`).
2. **JavaScript-Driven Color & Style Transitions**:
   - **On Scroll**: JavaScript detects viewport offset and updates the navigation bar background color, border, and elevation.
   - **On Hover**: JavaScript directly changes the menu item's background color and font color upon `mouseenter` and resets it on `mouseleave`.
3. **ScrollSpy & Progress Indicator**:
   - Automatically tracks the visible section using `IntersectionObserver` and updates active states (`aria-current="page"`).
   - Real-time scroll progress bar running along the bottom border of the navbar.
4. **Mobile Responsive Drawer**:
   - Animated hamburger toggle transforming into an 'X'.
   - Slide-in navigation drawer with backdrop blur and `Escape` key support.
5. **Clean & Organic Skincare UI**:
   - Real high-resolution product photography (Unsplash).
   - Sections: Hero, Trust Certifications, Ingredients & Philosophy, Product Collection with Category Filters, 3-Step Daily Ritual, Verified Customer Reviews, and Skin Consultation Form.

---

## 📁 Project Structure

```
PRODIGY_WD_01/
├── index.html     # Primary landing page
├── about.html     # Brand philosophy page (shares the fixed navigation menu)
├── products.html  # Full product catalog (shares the fixed navigation menu)
├── contact.html   # Skin consultation page (shares the fixed navigation menu)
├── styles.css     # Design tokens, responsive grid, glassmorphism, transitions
├── script.js      # JavaScript interactivity for scroll and hover color changes
└── README.md      # Documentation
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone git@github.com:Husam-Abdulraheem/PRODIGY_WD_01.git
   cd PRODIGY_WD_01
   ```
2. Open `index.html` in your web browser:
   ```bash
   xdg-open index.html
   ```
   Or launch a local server:
   ```bash
   python3 -m http.server 3000
   ```
   Then visit `http://localhost:3000`.

---

## 👤 Author
- **Husam Abdulraheem**
- **Internship**: Prodigy InfoTech — Web Development Track
- **Task**: 01 (Responsive Landing Page with Interactive Navigation)
