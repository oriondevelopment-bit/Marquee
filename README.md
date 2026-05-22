# Marquee Pool Designer

AI-powered pool designer plugin for **Marquee Pools & Service, Inc.**  
Built with Vite + React. Deploys as a standalone sandbox or a WordPress plugin.

---

## Quick Start — Sandbox / Demo

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key:
#   VITE_ANTHROPIC_API_KEY=sk-ant-api03-...
npm run dev
# Opens at http://localhost:3000
```

> **Note:** The dev mode calls the Anthropic API directly from the browser using
> your key. This is fine for sandboxing and client demos — never deploy this way
> in production.

---

## Project Structure

```
marquee-pools-designer/
├── src/
│   ├── main.jsx                  # Vite entry (full sandbox page)
│   ├── widget-entry.jsx          # WordPress plugin entry (modal only)
│   ├── App.jsx                   # Full Marquee Pools page layout
│   │
│   ├── styles/
│   │   └── poolax-theme.css      # CSS variables sourced from the Poolax theme
│   │
│   ├── constants/
│   │   └── poolData.js           # System prompt, pool types, testimonials, contact info
│   │
│   ├── services/
│   │   └── api.js                # Anthropic API calls (direct or WP proxy)
│   │
│   ├── hooks/
│   │   └── usePoolDesigner.js    # All designer state + actions
│   │
│   └── components/
│       ├── layout/               # TopBar, Header, Footer
│       ├── sections/             # Hero, Services, DesignBand, Testimonials
│       └── designer/             # Modal, StepBar, StepInfo, StepDesign, StepSummary
│
├── wordpress-plugin/
│   └── marquee-pool-designer.php # Drop-in WP plugin
│
├── vite.config.js                # Dev / sandbox build
├── vite.wp.config.js             # WordPress bundle build
└── .env.example                  # Environment variable template
```

---

## WordPress Deployment

### 1. Build the widget bundle

```bash
npm install
npm run build:wp
# Outputs: wordpress-plugin/assets/pool-designer.js
```

### 2. Install the plugin

Copy the entire `wordpress-plugin/` folder to:
```
/wp-content/plugins/marquee-pool-designer/
```

Activate it in **WP Admin → Plugins**.

### 3. Add your Anthropic API key

In `wp-config.php` (recommended — key stays server-side):
```php
define( 'MARQUEE_ANTHROPIC_KEY', 'sk-ant-api03-...' );
```

Or enter it in **WP Admin → Settings → Pool Designer**.

### 4. Add to any page via shortcode

In the Elementor or WP editor, add:

```
[marquee_pool_designer]
[marquee_pool_designer_button label="Design My Pool" class="th-btn"]
```

- `[marquee_pool_designer]` — hidden mount point (required once per page)
- `[marquee_pool_designer_button]` — renders the trigger button; works anywhere on the same page

### 5. Elementor widget button

In Elementor, use a **Button** widget and set its link to:
```
javascript:window.MarqueePoolDesigner&&window.MarqueePoolDesigner.open()
```

Or use the **HTML widget** and paste `[marquee_pool_designer_button]`.

---

## Customization

| File | What to change |
|------|---------------|
| `src/constants/poolData.js` | Pool types, AI system prompt, quick prompts, testimonials, contact info |
| `src/styles/poolax-theme.css` | Colors, fonts, spacing (CSS variables) |
| `src/services/api.js` | Model, max_tokens, API endpoint |
| `src/components/designer/` | Step layouts, form fields, chat UI |
| `wordpress-plugin/marquee-pool-designer.php` | Server-side system prompt, WP REST endpoint |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_ANTHROPIC_API_KEY` | Direct browser API calls (dev/sandbox only) |
| `VITE_USE_PROXY` | Set `true` to route through WP REST endpoint |
| `VITE_PROXY_ENDPOINT` | Proxy URL (default: `/wp-json/marquee-pools/v1/design-chat`) |

---

## Extending to Other Service Industries

The plugin is intentionally structured to make re-branding straightforward:

1. Update `src/constants/poolData.js` — swap company info, service types, prompts
2. Update `src/styles/poolax-theme.css` — swap CSS variable values for the new brand colors/fonts
3. Update `wordpress-plugin/marquee-pool-designer.php` — plugin name, server-side system prompt

---

## Requirements

- Node 18+
- npm 9+
- Anthropic API key (`sk-ant-api03-...`)
- WordPress 6.0+ (for WP deployment only)
