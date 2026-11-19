# APS Perjuangan — Ayam Penyet Surabaya Website

> **Academic prototype developed for university assessment purposes.**
> This is NOT the official website of Ayam Penyet Surabaya.

A complete, responsive restaurant information website for **Ayam Penyet Surabaya (APS) Cabang Perjuangan, Cirebon**, built as an academic web development project.

---

## 🌐 Live URL

```
https://masjidbaitussalamkdjy-ops.github.io/aps-perjuangan-website/
```

---

## 📋 Project Overview

| Item | Detail |
|---|---|
| Website Name | APS Perjuangan |
| Business | Ayam Penyet Surabaya Cabang Perjuangan |
| Location | Cirebon, Jawa Barat, Indonesia |
| Technology | HTML5, CSS3, Vanilla JavaScript |
| Hosting | GitHub Pages |
| GA4 Measurement ID | `G-MKHGKC67B9` |
| Repository | `aps-perjuangan-website` |
| GitHub Username | `masjidbaitussalamkdjy-ops` |

---

## 📁 Project Structure

```
aps-perjuangan-website/
│
├── index.html                  ← Main entry point (GitHub Pages root)
├── README.md                   ← This file
│
├── assets/
│   ├── css/
│   │   └── style.css           ← Complete design system
│   │
│   ├── images/
│   │   ├── logo.jpg            ← APS Surabaya official logo
│   │   └── favicon.svg         ← SVG favicon
│   │
│   └── js/
│       ├── analytics.js        ← GA4 event tracking module
│       ├── menu-data.js        ← Complete menu catalogue (90 items)
│       ├── menu.js             ← Menu rendering, search, filter, modal
│       └── main.js             ← Navbar, hours, scroll, GA4 bindings
│
├── ayam penyet surabaya logo.jpg   ← Source logo file
└── Pasted markdown.md              ← Source menu data file
```

---

## ✨ Features

### Website Sections
- **Navigation Bar** — Sticky, responsive with mobile hamburger menu
- **Hero Section** — Full-screen with logo, headline, CTA buttons
- **About Section** — Restaurant description (Indonesian & English), highlights
- **Menu Section** — Full 90-item catalogue with:
  - Category filter buttons (Semua / Nasi & Paket / Lauk & Sayur / Minuman / Juice)
  - Real-time search with debounced GA4 tracking
  - Responsive card grid (4 → 3 → 2 → 1 columns)
  - Item detail modal with WhatsApp deep-link prefill
  - Image error fallback chain (CDN → Unsplash → SVG placeholder)
- **Opening Hours** — Live open/closed status badge, today's row highlighted
- **Location** — Google Maps integration with directions button
- **Contact** — Dual WhatsApp buttons with prefilled messages
- **Footer** — Navigation links, contact info, academic disclosure

### Interactive Features
- Real-time menu search
- Category filtering
- Menu item detail modal (keyboard accessible)
- Live store status (open/closed) auto-updated every 60 seconds
- Today's day highlighted in schedule table
- Smooth scroll navigation
- Active nav link highlighting while scrolling
- Back to top button
- Mobile hamburger menu with backdrop

### Google Analytics 4
Measurement ID: `G-MKHGKC67B9`

Custom events tracked:
| Event | Trigger |
|---|---|
| `view_menu` | Visitor reaches or opens menu section |
| `search_menu` | Visitor searches for a menu item |
| `filter_menu` | Visitor selects a category filter |
| `view_item` | Visitor opens a menu item detail |
| `click_whatsapp` | Visitor clicks any WhatsApp button |
| `click_maps` | Visitor clicks any Google Maps link |

---

## 🚀 GitHub Pages Deployment

### Step 1: Prepare Your Repository

Make sure you have git installed and your repository is ready.

```bash
git --version
```

### Step 2: Clone or Initialize the Repository

**If the repository already exists on GitHub:**

```bash
git clone https://github.com/masjidbaitussalamkdjy-ops/aps-perjuangan-website.git
```

Then copy all project files into the cloned directory.

**If starting fresh:**

```bash
cd aps-perjuangan-website
git init
git remote add origin https://github.com/masjidbaitussalamkdjy-ops/aps-perjuangan-website.git
```

### Step 3: Stage and Commit All Files

```bash
git add .
git commit -m "Initial release: APS Perjuangan website with full menu and GA4"
```

### Step 4: Push to GitHub

```bash
git push -u origin main
```

> If your default branch is `master`, use `git push -u origin master` instead.

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **Save**.
5. Wait 1–3 minutes for GitHub to build and publish the site.
6. Your site will be live at:
   ```
   https://masjidbaitussalamkdjy-ops.github.io/aps-perjuangan-website/
   ```

### Step 6: Verify Deployment

- Open the live URL in your browser.
- Check all sections load correctly.
- Test the menu search and category filters.
- Test WhatsApp buttons (they will open WhatsApp web/app).
- Test Google Maps link.
- Open GA4 Realtime report and verify page views appear.

---

## 📊 Verifying Google Analytics 4

### Method 1: GA4 Realtime Report
1. Log in to [Google Analytics](https://analytics.google.com/).
2. Select property with Measurement ID `G-MKHGKC67B9`.
3. Click **Reports → Realtime**.
4. Open the live website and browse around.
5. You should see active users and events appear in real time.

### Method 2: GA4 DebugView
1. Open the website in Chrome.
2. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) extension.
3. Enable DebugView in GA4 Admin.
4. Open **Admin → DebugView** to see events stream in real time.

### Method 3: Browser Console
Open DevTools (F12) → Console and look for:
```
[GA4 Event] view_menu: {...}
[GA4 Event] filter_menu: {...}
[GA4 Event] search_menu: {...}
```

---

## 🔧 Local Development

This is a pure static website with no build tools required.

**Option A — Open directly:**
Simply open `index.html` in a browser.

> ⚠️ Note: Some browsers block external images when opened as `file://`. Use a local server for full functionality.

**Option B — Local server (VS Code):**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then right-click `index.html` → Open with Live Server.

**Option C — Python server:**
```bash
cd aps-perjuangan-website
python -m http.server 8080
# Then open http://localhost:8080
```

---

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<section>`, `<main>`, `<footer>`)
- ARIA roles, labels, and `aria-live` regions
- Keyboard navigation (Tab, Enter, Space, Escape)
- Visible focus indicators
- Descriptive image `alt` text
- Sufficient color contrast (WCAG AA target)

---

## 📱 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 📄 License & Academic Disclosure

This website is an **academic prototype** developed for a university web development course assessment.

- It is **not** the official website of Ayam Penyet Surabaya.
- It is **not** officially authorized, endorsed, or operated by the company.
- Menu data and prices were sourced from publicly available food delivery platform listings and are used for educational purposes only.
- No commercial transactions are processed through this website.
- WhatsApp links redirect visitors to external WhatsApp conversations only.

---

## 📞 Contact Information in Website

| Contact | Detail |
|---|---|
| WhatsApp CS 1 | [0811-6180-528](https://wa.me/628116180528) |
| WhatsApp CS 2 | [0811-6816-442](https://wa.me/628116816442) |
| Google Maps | [APS Perjuangan, Cirebon](https://maps.app.goo.gl/q3iv42YL5HzFS9Fn9) |
