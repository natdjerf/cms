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
│   ├── build.js            # Static site generator
│   ├── dev.js              # Dev server with live reload
│   └── serve.js            # Simple production preview server
├── src/
│   ├── templates/          # HTML templates with {{placeholders}}
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

1. `scripts/build.js` reads YAML content from `content/`
2. Parses YAML using the `yaml` package
3. Renders HTML templates from `src/templates/`
4. Replaces `{{placeholder}}` variables with content
5. Copies assets (images, CSS, fonts) to `dist/`

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

## Notes

- CMS uses Astro/React but public site is pure vanilla JS
- Template syntax: `{{variableName}}` for simple values
- Content grouping (menu sections) is based on `category` field in YAML
- File names don't affect grouping - only the `category` field matters
