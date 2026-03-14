# Architecture — frhd-timeline

## Directory Structure

Each folder is a route. An `index.html` inside a folder is the page served at that route. `assets/` holds styles and images. `components/` holds Web Components. These can appear at the root level (shared across the whole site) or inside a sub-folder (scoped to that section only).

```
assets/             # shared styles and images
components/         # shared Web Components
index.html          # served at /
404.html            # HTML for the "not found" page
faqs/
└── index.html      # served at /faqs
.../
└── index.html
timeline/
├── assets/         # section-scoped styles and images
├── components/     # section-scoped Web Components
├── 2013/
    └── index.html  # served at /timeline/2013
└── .../
    └── index.html
...
```

To add a new page, create a folder and put an `index.html` inside it. The folder name becomes the URL segment.

The `root` attribute on `<frhd-sidebar>` must point back to the repo root so that asset and nav link paths resolve correctly:

| Page location              | `root` value |
|----------------------------|--------------|
| `index.html` (root)        | `.`          |
| `faqs/index.html`          | `..`         |
| `timeline/2013/index.html` | `../..`      |