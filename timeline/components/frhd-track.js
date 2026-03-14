/**
 * Usage:
 *   <frhd-track id="1001"></frhd-track>
 *   <frhd-track id="1001" title="Wild West"></frhd-track>
 *
 * Renders the FRHD track thumbnail embed with the logo overlay,
 * matching the original .frhd_t style from the community forums.
 */

class FrhdTrack extends HTMLElement {
  connectedCallback() {
    const trackId = this.getAttribute('id');
    const title   = this.getAttribute('title') || '';

    if (!trackId) {
      this.innerHTML = `<span class="frhd-track-error">Missing track id</span>`;
      return;
    }

    const trackUrl = `https://www.freeriderhd.com/t/${trackId}`;
    const imgUrl   = `https://www.freeriderhd.com/t/${trackId}/pic/768x250`;
    const logoUrl  = `https://community.freeriderhd.com/styles/kanoapps-baisik/xenforo/icons/logo.png`;

    this.innerHTML = `
      <a href="${trackUrl}" class="frhd-track-embed" target="_blank" rel="noopener"
         title="${title ? `Play: ${title}` : `Play track #${trackId}`}">
        <img class="frhd-track-img" src="${imgUrl}" alt="${title || `Track #${trackId}`}" loading="lazy" />
        <img class="frhd-track-logo" src="${logoUrl}" alt="Free Rider HD" />
        <span class="frhd-track-play">▶ Play track</span>
      </a>
    `;
  }
}

customElements.define('frhd-track', FrhdTrack);