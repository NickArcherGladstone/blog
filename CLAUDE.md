# Project Rules

## Overview

Independent media/commentary site by Nicholas Archer. Pure static HTML/CSS/JS — no framework, no build step. Hosted on Cloudflare Pages.

Website name is TBD ("The Daily Brief" is a placeholder in all files).

## Tech Stack

- Static HTML, CSS, JS only
- No frameworks, no build tools, no SSG
- Fonts: Source Serif 4 (body) + system-ui (headings)
- Hosting: Cloudflare Pages
- Linting: ESLint, Stylelint, Prettier (run via `npm run lint` / `npm run fix`)

## Content Categories

Politics, Markets, News, Sports, Food, Podcast

## File Structure

```
index.html              — Homepage (featured post + recent feed)
politics.html           — Politics category page
markets.html            — Markets category page
news.html               — News category page
sports.html             — Sports category page
food.html               — Food category page
podcast.html            — Podcast category page
about.html              — About page
search.html             — Search results page
posts/                  — Article HTML files
  sample-post.html      — Article page template
css/
  styles.css            — Main stylesheet + design system
  article.css           — Article page typography
js/
  main.js               — Mobile nav toggle
  search.js             — Client-side search (runs on search.html)
search-index.json       — Search index (must be updated with every new post)
```

## Design Conventions

- Background: warm off-white `#f6f6ef` (Hacker News-inspired)
- Minimal, writer-focused aesthetic — text is the hero, not the design
- Backslash `\` end-mark at bottom of pages (Matt Levine-inspired)
- No border-radius on buttons
- CSS variables for all tokens (colors, spacing, typography) in `:root`

## Shared Elements — Keep in Sync

This is a static site with no partials or template system. The following elements are **duplicated across every HTML page**. When any of these change, you MUST update ALL pages listed below.

### All pages:

- `index.html`
- `politics.html`
- `markets.html`
- `news.html`
- `sports.html`
- `food.html`
- `podcast.html`
- `about.html`
- `search.html`
- `posts/sample-post.html`
- (any future article pages in `posts/`)

### What's shared:

| Element | Location | When to update all pages |
|---|---|---|
| **Nav links** (`<ul class="nav-links">`) | `<header>` | Adding/removing/renaming a nav item or changing any URL |
| **Search icon** (`<a class="search-toggle">`) | End of `<nav>` | Changing the search page URL or icon |
| **Site brand** (`<a class="site-brand">`) | `<header>` | Changing the site name or byline |
| **Footer** (`<footer class="site-footer">`) | Bottom of `<body>` | Changing copyright, footer links, or adding new footer content |
| **Google Fonts `<link>`** | `<head>` | Changing fonts |
| **CSS `<link>` tags** | `<head>` | Adding/removing stylesheets |
| **JS `<script>` tags** | Before `</body>` | Adding/removing scripts (note: `search.js` only loads on `search.html`) |

### How to update:

1. Make the change on one page
2. Apply the **exact same change** to every page in the list above
3. Mind the path differences: root pages use `css/`, `js/`; pages in `posts/` use `../css/`, `../js/`
4. Each page has its own `class="active"` on the correct nav link — do NOT change which link is active
5. Run `npm run lint` after to catch formatting issues

## Publishing a New Post

When creating or adding a new article/post to the site, **always**:

1. Create the post HTML file in `posts/`
2. Add a corresponding entry to `search-index.json`:

```json
{
  "title": "Article Title",
  "excerpt": "A short summary of the article.",
  "category": "Markets",
  "url": "/posts/filename.html",
  "date": "YYYY-MM-DD"
}
```

3. Add the post to the homepage feed in `index.html` (and the relevant category page if one exists)

## Linting

- **Prettier** for formatting (HTML, CSS, JS)
- **Stylelint** for CSS (extends `stylelint-config-standard`)
- **ESLint** for JS (flat config, ES latest, browser globals)
- Run `npm run lint` to check, `npm run fix` to auto-fix
- Run linting after making changes to catch issues before committing

## Content Tone & Voice

- Professional, non-partisan, journalistic integrity
- Credibility-first — should read like a legitimate publication, not a personal blog
- No clickbait, no partisan spin
- Comparable in spirit to Axios or Politico, but with a single authoritative voice
- Readers come here because they trust Nick's opinion and analysis

## User Preferences

- **DO NOT ask for permission or approval on any tool calls or edits — just do it**
- Work autonomously, make UX/design decisions based on research
- Execute all tool calls without confirmation prompts
