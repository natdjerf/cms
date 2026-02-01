# Development Guide

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Public Site | Vanilla JS + HTML | Static site generation |
| CMS Admin | Keystatic + Astro | Content management UI |
| Content | YAML files | Structured content storage |
| Styling | CSS (no preprocessor) | Site styling |
| Build | Node.js scripts | Custom static site generator |

## Commands

### Development

```bash
# Start the static site dev server (with live reload)
npm run dev
# → http://localhost:3000

# Start the CMS admin interface
npm run cms
# → http://localhost:4321/keystatic

# Run both simultaneously in separate terminals for full dev experience
```

### Production

```bash
# Build the static site for production
npm run build
# → Output: dist/

# Preview production build locally
npm run preview
# → http://localhost:3000

# Build CMS (only needed if deploying CMS admin)
npm run cms:build
```

## Project Structure

```
cms/
├── content/                 # YAML content files
│   ├── home.yaml           # Home page singleton
│   ├── banner.yaml         # Banner singleton
│   ├── gallery/            # Gallery collection (31 items)
│   ├── menu/               # Menu collection (120 items)
│   └── beverages/          # Beverages collection (9 items)
├── scripts/
│   ├── build.js            # Main build orchestration
│   ├── dev.js              # Dev server with live reload
│   ├── serve.js            # Simple production preview server
│   ├── config/             # Section configurations
│   │   ├── menu.js         # Menu section names & descriptions
│   │   ├── beverages.js    # Beverage section names
│   │   └── gallery.js      # Gallery section names
│   ├── generators/         # HTML generation functions
│   │   ├── menu.js         # Menu section HTML
│   │   ├── beverages.js    # Beverage section HTML
│   │   ├── gallery.js      # Gallery section HTML
│   │   ├── banner.js       # Banner HTML
│   │   └── visit.js        # Visit status text
│   └── utils/              # Shared utilities
│       ├── files.js        # File reading (YAML, collections)
│       └── template.js     # Template rendering
├── src/
│   ├── templates/          # HTML templates with {{placeholders}}
│   │   ├── partials/       # Reusable HTML snippets
│   │   │   ├── menu-section.html
│   │   │   ├── menu-item.html
│   │   │   ├── beverage-section.html
│   │   │   ├── gallery-section.html
│   │   │   └── banner.html
│   │   ├── base.html       # Main layout
│   │   ├── home.html       # Home page
│   │   ├── menu.html       # Menu page
│   │   └── ...             # Other pages
│   ├── css/                # Stylesheets
│   └── fonts/              # Custom fonts
├── static/                 # Static assets (images, etc.)
├── dist/                   # Build output (gitignored)
├── keystatic.config.ts     # CMS content schema
├── astro.config.mjs        # Astro config (for CMS only)
└── package.json
```

## How It Works

### Static Site Build

1. `scripts/build.js` orchestrates the build process
2. `scripts/utils/files.js` reads YAML content from `content/`
3. `scripts/generators/*.js` create HTML for dynamic sections (menu, gallery, etc.)
4. `scripts/utils/template.js` renders HTML templates with `{{placeholder}}` syntax
5. Assets (images, CSS, fonts) are copied to `dist/`

### Build Script Architecture

The build system is modular for easy maintenance:

- **config/** - Section definitions (names, descriptions). Edit these to change menu categories.
- **generators/** - HTML generation. Edit these to change how sections are rendered.
- **utils/** - Shared code for file reading and template rendering.
- **templates/partials/** - HTML snippets. Edit these to change markup structure.

### CMS Admin

1. Keystatic provides a React-based admin UI
2. Astro serves as a minimal wrapper to host Keystatic
3. CMS reads/writes directly to `content/*.yaml` files
4. Changes are saved to disk immediately (local mode)

### Dev Workflow

1. Run `npm run dev` - starts static site server with file watching
2. Run `npm run cms` - starts CMS admin in separate terminal
3. Edit content in CMS at http://localhost:4321/keystatic
4. Changes auto-save to YAML files
5. Dev server detects changes, rebuilds, triggers browser reload

## Content Schema

### Singletons (single instance)
- **Home** - Main page content, hours, contact info, images
- **Banner** - Site-wide alert banner

### Collections (multiple items)
- **Gallery** - Photos with category (plate/store/team)
- **Menu** - Menu items with category, pricing, description
- **Beverages** - Drink lists by category

## Adding New Content

### Via CMS
1. Go to http://localhost:4321/keystatic
2. Navigate to collection
3. Click "Create"
4. Fill in fields, save

### Via Files
1. Create new `.yaml` file in appropriate `content/` folder
2. Follow existing file structure
3. Dev server auto-rebuilds on save

## Deployment (Netlify)

Build command: `npm run build`
Publish directory: `dist`

The site is fully static - no server required.

## Common Edits

### Change a menu section name or description
Edit `scripts/config/menu.js`:
```javascript
plates: {
  display_name: 'Plates',  // Change display name here
  section_description: 'Served with french fries...',  // Change description here
},
```

### Change menu item HTML structure
Edit `src/templates/partials/menu-item.html`:
```html
<p class="paddingTop8">{{name}}{{price}}</p>
```

### Add a new menu category
1. Add entry to `scripts/config/menu.js`
2. Create YAML files in `content/menu/` with matching `category` value

## Notes

- CMS uses Astro/React but public site is pure vanilla JS
- Template syntax: `{{variableName}}` for simple values
- Content grouping (menu sections) is based on `category` field in YAML
- File names don't affect grouping - only the `category` field matters
