/**
 * Usage:
 *   Root pages  (index.html, faqs.html ...):   <frhd-sidebar active="welcome" root="."></frhd-sidebar>
 *   Subdir pages (timeline/2013.html ...):     <frhd-sidebar active="2013"   root=".."></frhd-sidebar>
 *
 * The `root` attribute is a relative path back to the repo root.
 * One level deep  → root=".."
 * Two levels deep → root="../.."
 * etc.
 */

const GENERAL_ITEMS = [
  { key: 'welcome',      icon: '🏠', label: 'Welcome!',          href: 'index.html' },
  { key: 'faqs',         icon: '❓', label: 'FAQs',              href: 'faqs.html' },
  { key: 'statistics',   icon: '📊', label: 'Statistics',        href: 'statistics.html' },
  { key: 'contributors', icon: '📋', label: 'Contributors List', href: 'contributors.html' },
  { key: 'eras',         icon: '🎭', label: 'FRHD Eras',         href: 'eras.html' },
];

const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
               2021, 2022, 2023, 2024, 2025, 2026];

class FrhdSidebar extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') ?? 'welcome';
    // root defaults to '.' (same directory = root-level page)
    const root   = (this.getAttribute('root') ?? '.').replace(/\/$/, '');

    const generalLinks = GENERAL_ITEMS.map(item => {
      const isActive = item.key === active;
      return `
        <li>
          <a href="${root}/${item.href}"${isActive ? ' class="active"' : ''}>
            <span class="icon">${item.icon}</span> ${item.label}
          </a>
        </li>`;
    }).join('');

    const yearLinks = YEARS.map(year => {
      const isActive = String(year) === String(active);
      return `
        <li>
          <a href="${root}/timeline/${year}.html"${isActive ? ' class="active"' : ''}>
            <span class="icon">📄</span> ${year}
          </a>
        </li>`;
    }).join('');

    this.innerHTML = `
      <a class="sidebar-logo" href="${root}/index.html">
        <div class="logo-badge">FRHD</div>
        <div class="logo-label">
          Timeline
          <small>2013 – 2026</small>
        </div>
      </a>

      <div class="sidebar-section">
        <div class="sidebar-label">General</div>
        <ul class="sidebar-nav">${generalLinks}</ul>
      </div>

      <div class="sidebar-divider"></div>

      <div class="sidebar-section">
        <div class="sidebar-label">Timeline</div>
        <ul class="sidebar-nav years">${yearLinks}</ul>
      </div>
    `;
  }
}

customElements.define('frhd-sidebar', FrhdSidebar);