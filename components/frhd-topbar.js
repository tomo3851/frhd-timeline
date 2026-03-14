/**
 * Usage:  <frhd-topbar page="Welcome!"></frhd-topbar>
 *
 * The `page` attribute sets the breadcrumb label shown on the right.
 * This component also owns the hamburger ↔ sidebar toggle logic.
 */

class FrhdTopbar extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') ?? '';

    this.innerHTML = `
      <div class="topbar-inner">
        <button id="menu-toggle" aria-label="Open navigation menu" aria-expanded="false">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round">
            <line x1="2" y1="5"  x2="18" y2="5"  />
            <line x1="2" y1="10" x2="18" y2="10" />
            <line x1="2" y1="15" x2="18" y2="15" />
          </svg>
        </button>

        <div class="breadcrumb">
          FRHD Timeline <span class="sep">›</span> <strong>${page}</strong>
        </div>
      </div>
    `;

    // Inject the overlay element if it doesn't already exist
    if (!document.getElementById('sidebar-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'sidebar-overlay';
      document.body.prepend(overlay);
    }

    this._initToggle();
  }

  _initToggle() {
    const toggle  = this.querySelector('#menu-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.querySelector('frhd-sidebar');

    if (!toggle || !sidebar) return;

    const open = () => {
      sidebar.classList.add('open');
      overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () =>
      sidebar.classList.contains('open') ? close() : open()
    );

    overlay.addEventListener('click', close);

    // Close when a sidebar link is tapped on mobile
    sidebar.addEventListener('click', e => {
      if (e.target.closest('a') && window.innerWidth <= 680) close();
    });

    // Reset on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) close();
    });
  }
}

customElements.define('frhd-topbar', FrhdTopbar);