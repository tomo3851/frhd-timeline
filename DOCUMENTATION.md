# Documentation — frhd-timeline

## Web Components

### `<frhd-sidebar>`

Defined in `components/frhd-sidebar.js`. Renders the fixed left-hand navigation panel.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| `active`  | Yes      | Key of the currently active page. Must match a `key` in `GENERAL_ITEMS` or a year string (e.g. `"2013"`). |
| `root`    | Yes      | Relative path back to the repo root from the current page's location. |

**Usage**

```html
<!-- Root-level page (index.html) -->
<frhd-sidebar active="welcome" root="."></frhd-sidebar>

<!-- One level deep (faqs/index.html) -->
<frhd-sidebar active="faqs" root=".."></frhd-sidebar>

<!-- Two levels deep (timeline/2013/index.html) -->
<frhd-sidebar active="2013" root="../.."></frhd-sidebar>
```

Valid `active` keys: `welcome`, `faqs`, `statistics`, `contributors`, `eras`, or any year number as a string (`"2013"` … `"2026"`).

---

### `<frhd-topbar>`

Defined in `components/frhd-topbar.js`. Renders the sticky top bar with a breadcrumb and, on mobile, a hamburger button that toggles the sidebar.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| `page`    | Yes      | Label shown as the current page in the breadcrumb. |

**Usage**

```html
<frhd-topbar page="Welcome!"></frhd-topbar>
<frhd-topbar page="2013"></frhd-topbar>
```

---

### `<frhd-track>`

Defined in `timeline/components/frhd-track.js`. Used only on timeline year pages. Renders a clickable track thumbnail embed that links to the track on freeriderhd.com.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id`      | Yes      | Numeric FRHD track ID. |
| `title`   | No       | Track title shown as tooltip and alt text. |

**Usage**

```html
<frhd-track id="1001" title="Wild West"></frhd-track>
```

> Only load `frhd-track.js` on timeline year pages — it is not needed on general pages.

---

## CSS Design Tokens

All tokens are declared on `:root` in `assets/base.css`.

| Token           | Value                       | Purpose                                              |
|-----------------|-----------------------------|------------------------------------------------------|
| `--bg`          | `#ffffff`                   | Page background                                      |
| `--bg-sidebar`  | `#225264`                   | Sidebar/topbar background; primary brand colour       |
| `--bg-panel`    | `#f4f6f7`                   | Card / panel backgrounds                             |
| `--bg-hover`    | `#1d4555`                   | Sidebar link hover background                        |
| `--border`      | `#1a3f4e`                   | Sidebar border                                       |
| `--accent`      | `#95b6bf`                   | Muted teal; active nav indicator; section labels     |
| `--accent-glow` | `rgba(149,182,191,0.15)`    | Background of active nav items                       |
| `--text`        | `#222222`                   | Primary text                                         |
| `--text-muted`  | `#aec8cf`                   | De-emphasised / placeholder text                     |
| `--text-dim`    | `#444444`                   | Secondary body text                                  |
| `--text-sidebar`| `#d8eaed`                   | Default sidebar link text                            |
| `--sidebar-w`   | `230px`                     | Sidebar width; also used for `#main` left margin     |
| `--header-h`    | `52px`                      | Top bar height                                       |
| `--radius`      | `4px`                       | Border radius on cards, badges, buttons              |
| `--transition`  | `0.15s ease`                | Default transition                                   |
| `--font`        | `'Nunito', sans-serif`      | Global typeface                                      |

---

## Important CSS Classes

### `page.css`

**`.page-title`**
The `<h1>` at the top of every page. 24 px, 800 weight, with a bottom border as a section separator. Wrap a `<span class="highlight">` inside it to colour a portion in `--bg-sidebar`.

```html
<h1 class="page-title">Free Rider HD Timeline <span class="highlight">2013–2026</span></h1>
```

**`.page-body`**
Wrapper for all narrative content on a page. Sets paragraph font size, line height, and spacing.

**`.info-box`**
A panelled card with a 3 px top accent border. Use for instructional or reference content. Contains an `<h2>` heading and a `<ul>` list; list items get a `▸` bullet automatically via `::before`.

```html
<div class="info-box">
  <h2>How to navigate</h2>
  <ul>
    <li>Click a year in the sidebar.</li>
  </ul>
</div>
```

**`.cta-strip`**
A horizontal panel (`space-between`) pairing a short text prompt with an action button. Stacks vertically on small screens.

```html
<div class="cta-strip">
  <p><strong>Want more?</strong> Check out the archive.</p>
  <a class="btn btn-green" href="…">🏁 Free Rider Archive</a>
</div>
```

**`.btn` / `.btn-green`**
`.btn` is the base button style. `.btn-green` applies the `--bg-sidebar` teal background with white text.

**`.footer`**
A small footer note at the bottom of a page body. 12 px, `--text-muted`, with a top border separator.

---

### `timeline.css`

**`.tl-month`**
`<h2>` month heading that separates timeline sections. Bold, `--bg-sidebar` colour, bottom border.

```html
<h2 class="tl-month">November</h2>
```

**`.tl-entries`**
The `<ul>` container for a group of timeline entries under a month heading.

**`.tl-entry`**
A single timeline row. Uses a 3-column grid: date column (48 px) → dot/line column (24 px) → body (remaining space). A vertical connector line runs through all entries via `::before`.

Add `.notable` to highlight an important entry — it enlarges the dot, darkens it to `--bg-sidebar`, and adds a left-bordered highlight box around the text.

```html
<ul class="tl-entries">
  <li class="tl-entry">
    <div class="tl-date"><span class="tl-date-text">05/11</span></div>
    <div class="tl-dot-col"><div class="tl-date-dot"></div></div>
    <div class="tl-body">
      <p class="tl-text">Free Rider HD is created.</p>
    </div>
  </li>

  <li class="tl-entry notable">
    …
  </li>
</ul>
```

**`.tl-text`**
The paragraph inside `.tl-body`. 13.5 px, `--text-dim`. Links inside are bold and coloured `--bg-sidebar`.