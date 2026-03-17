# Fantasy Football Content Architecture Analysis

## How the Top 10 Sites Structure Fantasy Football Content

Research conducted: March 6, 2026

---

## Table of Contents

1. [Site-by-Site Analysis](#site-by-site-analysis)
2. [Cross-Site Patterns](#cross-site-patterns)
3. [Key Takeaways for Our Site](#key-takeaways)

---

## Site-by-Site Analysis

### 1. ESPN (`espn.com/fantasy/football/`)

**How fantasy fits within the broader site:**

- Fantasy is a top-level section alongside NFL, NBA, MLB, etc.
- Fantasy Football has its own dedicated sub-navigation with 15+ items
- URL base: `espn.com/fantasy/football/`

**URL structure:**

- Editorial articles: `/fantasy/football/story/_/id/[numeric-id]/[slug]`
- Draft guide hub pages: `/fantasy/football/story/_/page/[page-id]/[slug]`
- Player projections (app): `fantasy.espn.com/football/players/projections`
- Two domains: `espn.com` for editorial, `fantasy.espn.com` for the game platform

**Rankings:**

- Rankings are published as editorial articles (story format), not interactive tool pages
- One combined article covers all positions: "2025 fantasy football draft rankings: PPR leagues" with anchor sections for QB, RB, WR, TE, K, DST
- Weekly rankings follow the same pattern: one article per week covering all positions
- No separate positional ranking URLs -- everything lives in long-form articles

**Mock drafts:**

- Mock drafts are editorial articles within the story system
- Also part of the comprehensive "Draft Guide" hub page
- Draft Guide bundles rankings, mock drafts, cheat sheets, sleepers, and analysis into one landing page

**Editorial/news articles:**

- Heavy editorial content organized on the fantasy football homepage in sections:
  - "Offseason News" (player movement)
  - "Fantasy Football News" (breaking stories)
  - "Planning for Next Year" (rankings/prospects)
  - "Season Review" (performance analysis)
  - "Metrics Analysis" (xTD, xFP leaders)
- All articles now free (previously some behind ESPN+ paywall)

**Navigation structure:**

- Top nav: Home | 2026 PPR Rankings | Scoring Leaders | Depth Charts | Consistency Ratings | Pick'em Games | Player News | Most Added/Dropped | Undroppables | Fantasy Focus Podcast | xTD Leaders | xFP Leaders | ADP | How To Play | Injuries | Scoring
- Fantasy Football homepage acts as a curated content hub

---

### 2. Yahoo Sports (`sports.yahoo.com/fantasy/` + `football.fantasysports.yahoo.com/`)

**How fantasy fits within the broader site:**

- "Fantasy" is a primary nav item on Yahoo Sports
- Completely separate subdomain for the game platform vs. editorial content
- Editorial: `sports.yahoo.com/fantasy/`
- Game platform: `football.fantasysports.yahoo.com/`

**URL structure:**

- Editorial articles: `sports.yahoo.com/fantasy/article/[slug-with-id].html`
- Fantasy football news: `sports.yahoo.com/fantasy/football/news/`
- Rankings (in-app): `football.fantasysports.yahoo.com/f1/public_prerank`
- Draft central: `football.fantasysports.yahoo.com/f1/draft?dktab=position_ranks`

**Rankings:**

- Two types: "Expert Rank" (Yahoo analysts) and "Consensus Rank" (Yahoo + RotoWire)
- Positional rankings built into the game platform, not editorial
- Editorial rankings published as individual analyst articles (e.g., "Justin Boone's Fantasy Football Rankings for Week 17")
- Weekly "Rankings Hub" article aggregates all analyst rankings with start/sit advice

**Mock drafts:**

- Mock Draft Lobby is a top-level nav item in the fantasy football section
- Part of the game platform, not the editorial side

**Editorial/news:**

- Named analysts with individual bylined rankings articles: Justin Boone, Matt Harmon, Scott Pianowski, Joel Smyth
- "Weekly Toolkit" articles that bundle rankings, sleepers, start/sit advice
- Articles live on the `sports.yahoo.com` editorial domain

**Navigation:**

- Main Yahoo Sports nav includes "Fantasy" alongside NFL, NBA, etc.
- Fantasy sub-nav: My Teams | Rankings | Mock Draft Lobby | Profile | Mobile | Prize Leagues | Podcast | Fantasy Football Live

---

### 3. CBS Sports (`cbssports.com/fantasy/football/`)

**How fantasy fits within the broader site:**

- Fantasy is nested under the NFL section as a sub-item, not a top-level nav category
- Also has its own direct path: `/fantasy/football/`
- Broader fantasy hub: `/fantasy/` covers football, baseball, hockey

**URL structure:**

- Fantasy football home: `/fantasy/football/`
- Rankings: `/fantasy/football/rankings/` (overall) and `/fantasy/football/rankings/ppr/[POSITION]/` (positional)
- Draft prep: `/fantasy/football/draft-prep/`
- News/articles: `/fantasy/football/news/[slug]/`
- Top 200: `/fantasy/football/rankings/ppr/top200/`

**Rankings:**

- Interactive ranking pages (not just articles)
- Positional URL pattern: `/fantasy/football/rankings/ppr/QB/`, `/fantasy/football/rankings/ppr/RB/`, etc.
- Supports PPR and non-PPR scoring format views
- Top 150 Flex and Top 200 overall views available

**Mock drafts:**

- Dedicated Draft Prep section at `/fantasy/football/draft-prep/`
- Contains mock drafts, strategy guides, prospect rankings, and cheat sheets
- Routed internally as "collection_draft_prep_fantasy"

**Editorial/news:**

- Fantasy Football Today (FFT) is a branded content franchise with its own writer profile page
- Articles published under `/fantasy/football/news/` with descriptive slugs
- Draft prep articles are the primary editorial format

**Navigation:**

- Found under NFL menu as a sub-item
- Fantasy football section has its own sub-nav for Rankings, Draft Prep, News, and league tools

---

### 4. FantasyPros (`fantasypros.com/nfl/`)

**How fantasy fits within the broader site:**

- Fantasy IS the entire site -- no broader sports coverage
- Multi-sport: NFL, MLB, NBA, NHL each get their own section
- NFL fantasy is the dominant vertical

**URL structure:**

- NFL fantasy home: `/nfl/`
- Overall rankings: `/nfl/rankings/`
- Positional rankings: `/nfl/rankings/qb.php`, `/nfl/rankings/rb.php`, `/nfl/rankings/wr.php`, `/nfl/rankings/te.php`
- Draft cheatsheets: `/nfl/rankings/consensus-cheatsheets.php`, `/nfl/rankings/qb-cheatsheets.php`
- PPR-specific: `/nfl/rankings/ppr-cheatsheets.php`
- Articles: `/content/nfl-draft/`, and likely `/nfl/articles/[topic].php`
- Mock draft simulator: `draftwizard.fantasypros.com/` (separate subdomain)

**Rankings:**

- THE defining feature -- consensus rankings aggregated from 100+ experts
- Updated daily
- Supports: Standard, Half PPR, PPR, and Custom scoring
- Position-specific pages for every position including IDP
- Color-coded by position: QB (purple), RB (cyan), WR (green), TE (pink), K (orange), DST (gray)

**Mock drafts:**

- "Draft Wizard" is a branded product suite on its own subdomain
- Includes: Mock Draft Simulator, Mock Draft Lobby, Draft Analyzer, Draft Assistant, Cheat Sheet Creator
- Premium/subscription feature

**Editorial/news:**

- Articles organized under "Research" pillar
- NFL Draft scouting reports under `/content/nfl-draft/`
- Dynasty-specific content exists as a separate vertical

**Navigation:**

- Main pillars: Home | Draft Wizard | MyPlaybook | Rankings | Research | DFS | More | Favorites
- Rankings and tools are the primary content; editorial is secondary

---

### 5. NFL.com (`fantasy.nfl.com/`)

**How fantasy fits within the broader site:**

- Fantasy lives on a dedicated subdomain: `fantasy.nfl.com`
- Separate from the main `nfl.com` editorial site
- Accessible from the NFL.com main navigation

**URL structure:**

- Rankings: `fantasy.nfl.com/research/rankings`
- Rankings with filters: `fantasy.nfl.com/research/rankings?position=[POS]&statSeason=2025&statType=[TYPE]&week=[NUM]`
- Player cards: `fantasy.nfl.com/players/card?leagueId=0&playerId=[ID]`

**Rankings:**

- Position filters: QB, RB, WR, TE, K, DEF
- Time period filters: Week 1-18 individual, or full season view
- Query-parameter based filtering (not separate URLs per position)
- Includes expert ratings column

**Mock drafts:**

- Part of the fantasy.nfl.com game platform
- Integrated with league management tools

**Editorial/news:**

- Fantasy editorial content lives on the main `nfl.com/news/` domain, not on `fantasy.nfl.com`
- The fantasy subdomain is primarily a game/tool platform
- Fantasy analysis articles are published by NFL.com writers on the main site

**Navigation:**

- Minimal: Research section with Rankings as the primary tool
- Game platform focused on league management, not content consumption

---

### 6. Pro Football Focus / PFF (`pff.com/fantasy`)

**How fantasy fits within the broader site:**

- Fantasy is a top-level content vertical alongside NFL, Betting, DFS, College, NFL Draft
- Clean separation: `/nfl` for team/game analysis, `/fantasy` for fantasy-specific content

**URL structure:**

- Fantasy home: `/fantasy`
- Fantasy articles: `/fantasy/articles`
- Weekly rankings: `/fantasy/rankings/weekly`
- Draft rankings: `/fantasy/rankings` (implied from nav)
- Mock draft simulator: `/fantasy/draft/mock-draft-simulator`
- Live draft assistant: `/fantasy/draft/live-draft-assistant`
- Cheat sheet: `/fantasy/draft/cheat-sheet`
- My leagues: `/fantasy/leagues`

**Rankings:**

- Data-driven: Uses PFF grades, expected snap counts, strength of schedule, teammate quality
- Separate weekly and draft ranking pages
- Second most accurate rankings per FantasyPros annual competition (past 5 years)

**Mock drafts:**

- Mock Draft Simulator is a prominent featured tool
- Live Draft Assistant for real-time draft help
- Cheat Sheet generator
- All under `/fantasy/draft/` path

**Editorial/news:**

- Articles hub at `/fantasy/articles`
- Content includes: free agency analysis, dynasty stock movements, combine coverage, position-specific breakdowns
- Mix of free and premium (PFF+) content

**Navigation:**

- Main nav: News & Analysis (with fantasy as a sub-item) | Tools
- Fantasy sub-nav: Draft tools, Rankings, Mock Draft Simulator, Articles, My Leagues
- Heavy emphasis on tools alongside editorial

---

### 7. The Athletic (`theathletic.com` / `nytimes.com/athletic/`)

**How fantasy fits within the broader site:**

- Fantasy is a section within the broader Athletic sports coverage
- URL: `theathletic.com/fantasy-football` (or `nytimes.com/athletic/fantasy/football/` post-NYT acquisition)
- All content is behind a paywall (subscription required)

**URL structure:**

- Fantasy football section: `/fantasy-football`
- Articles follow standard Athletic article URL patterns

**Rankings:**

- Rankings published as editorial articles, not interactive tools
- Award-winning projections covering 450+ players
- Expert-driven: Jake Ciely, Brandon Funston are the primary fantasy voices
- Dynasty and SuperFlex league-specific rankings

**Mock drafts:**

- Mock drafts are editorial content (written mock drafts, not simulators)
- Part of the broader fantasy football content section

**Editorial/news:**

- Pure editorial play -- no game platform, no interactive tools
- Leverages beat writer access for injury updates and insider info
- Fantasy Football Podcast is a major content vehicle
- Published fantasy football guide as a physical book annually

**Navigation:**

- Fantasy accessible from main Athletic navigation
- No sub-navigation for fantasy -- it's a content tag/section, not a product

---

### 8. Bleacher Report (`bleacherreport.com/fantasy-football`)

**How fantasy fits within the broader site:**

- Fantasy Football is a tag/topic page, not a deeply structured section
- Also has a separate Daily Fantasy section: `/daily-fantasy`
- Part of the Warner Bros. Discovery / TNT Sports ecosystem

**URL structure:**

- Fantasy football hub: `bleacherreport.com/fantasy-football`
- Daily fantasy: `bleacherreport.com/daily-fantasy`
- Articles: `bleacherreport.com/articles/[numeric-id]/[slug]`

**Rankings:**

- Rankings published as editorial articles (e.g., "Week 1 Fantasy Football 2025 Big Board")
- Positional guide articles with top players and sleepers
- No interactive ranking tools

**Mock drafts:**

- Editorial mock drafts only
- No draft simulator or interactive tools

**Editorial/news:**

- Content is article-based: news, scores, highlights, stats, standings, rumors
- B/R Gridiron brand for NFL/college football content
- Live programming: "Your Fantasy Fire Drill" fantasy football show
- Heavy social media and app-first content strategy

**Navigation:**

- Fantasy Football is a topic/tag within the broader sports navigation
- Minimal dedicated fantasy navigation -- it's a content stream, not a product section

---

### 9. Sleeper (`sleeper.com`)

**How fantasy fits within the broader site:**

- Sleeper IS the fantasy platform -- it's a game-first product
- Minimal editorial presence; primarily an app
- Blog provides supplementary content

**URL structure:**

- Main site: `sleeper.com`
- Blog/guides: `sleeper.com/blog/`
- Topic pages: `sleeper.com/topics/[topic-id]`
- Blog articles: `sleeper.com/blog/[slug]/`

**Rankings:**

- Default rankings are the platform's ADP (Average Draft Position)
- Fully customizable by league settings (PPR scoring default)
- Rankings are built into the draft experience, not standalone content

**Mock drafts:**

- Interactive mock drafts within the app
- Core product feature, not content

**Editorial/news:**

- Blog at `sleeper.com/blog/` with fantasy guides
- Newsletter with fantasy insights and proprietary data analysis
- Tier-based position rankings as blog content
- Minimal editorial operation compared to media sites

**Navigation:**

- App-first design -- most content is in the mobile/desktop app
- Website is primarily a funnel to download the app
- Blog is a secondary content marketing channel

---

### 10. Underdog Fantasy (`underdogfantasy.com` + `underdognetwork.com`)

**How fantasy fits within the broader site:**

- Complete separation between editorial and platform
- Game platform: `underdogfantasy.com` (best ball drafts, DFS)
- Editorial/content: `underdognetwork.com` (articles, analysis, rankings)

**URL structure:**

- Editorial by sport: `underdognetwork.com/football/[category]/[slug]`
- Categories: NFL Draft, News, etc.
- Platform is a separate product entirely

**Rankings:**

- Custom draft rankings on the game platform (0.5 PPR default)
- Rankings designed for best ball tournament strategy (top-heavy payouts)
- Autopilot feature uses your custom rankings
- Third-party sites publish Underdog-specific rankings (not Underdog themselves in depth)

**Mock drafts:**

- Mock drafting is a core platform feature
- Best ball draft format (draft-only, no in-season management)

**Editorial/news:**

- Underdog Network is the editorial arm, completely separate domain
- Organized by sport: Football, Basketball, Baseball, Golf
- Football sub-categories: NFL Draft, News
- Features bylined articles from analysts like Hayden Winks
- Downloadable data resources (pick-by-pick data)
- Shows/podcast section

**Navigation:**

- Underdog Network nav: Football | Basketball | Baseball | Golf | Shows
- Clean separation: editorial site has no game platform features; game platform has no editorial

---

## Cross-Site Patterns

### Pattern 1: Editorial vs. Platform Separation

Every site that runs a fantasy game platform separates editorial content from the game tools:

- **Same domain, different paths**: ESPN (`espn.com` vs `fantasy.espn.com`), CBS Sports, PFF
- **Different subdomains**: Yahoo (`sports.yahoo.com` vs `football.fantasysports.yahoo.com`), NFL.com (`nfl.com` vs `fantasy.nfl.com`)
- **Completely different domains**: Underdog (`underdognetwork.com` vs `underdogfantasy.com`), FantasyPros (`fantasypros.com` vs `draftwizard.fantasypros.com`)

### Pattern 2: Rankings Organization

Three distinct approaches:

1. **Rankings as articles** (ESPN, The Athletic, Bleacher Report, Yahoo editorial) -- Rankings are published as long-form editorial content, updated periodically
2. **Rankings as interactive tools** (CBS Sports, FantasyPros, NFL.com, PFF) -- Dedicated ranking pages with filters for position, scoring format, and week
3. **Rankings as platform data** (Sleeper, Underdog) -- Rankings are ADP/default values built into the draft experience

FantasyPros is the gold standard for interactive rankings: per-position pages, multiple scoring formats, consensus from 100+ experts, updated daily.

### Pattern 3: URL Structure for Fantasy Content

The dominant pattern is: `[domain]/fantasy/football/[content-type]/`

- CBS: `/fantasy/football/rankings/`, `/fantasy/football/news/`, `/fantasy/football/draft-prep/`
- PFF: `/fantasy/rankings/`, `/fantasy/articles/`, `/fantasy/draft/`
- ESPN: `/fantasy/football/story/...`
- FantasyPros uses `/nfl/rankings/`, `/nfl/articles/` (sport-first, not "fantasy"-first)

Positional ranking URLs:

- CBS: `/fantasy/football/rankings/ppr/QB/`
- FantasyPros: `/nfl/rankings/qb.php`
- NFL.com: Query params `?position=QB`
- PFF: `/fantasy/rankings/weekly` (filters on page)

### Pattern 4: Mock Draft Handling

Two categories:

1. **Interactive simulators** (FantasyPros Draft Wizard, PFF Mock Draft Simulator, Sleeper, Underdog, Yahoo, NFL.com) -- actual draft simulation tools
2. **Editorial mock drafts** (ESPN, The Athletic, Bleacher Report, CBS Sports) -- written articles where analysts draft and explain picks

Sites with both (ESPN, CBS, PFF, FantasyPros) tend to separate them: articles on the editorial side, simulators as tools/products.

### Pattern 5: Navigation to Fantasy Content

Three approaches:

1. **Top-level nav item**: ESPN, Yahoo, PFF -- "Fantasy" sits alongside NFL, NBA, etc. in the main navigation bar
2. **Nested under sport**: CBS Sports -- Fantasy is a sub-item under the NFL menu
3. **Fantasy IS the site**: FantasyPros, Sleeper, Underdog -- no need for navigation to fantasy; everything is fantasy

### Pattern 6: Content Categories Within Fantasy Football

Nearly universal categories across editorial sites:

- **Rankings** (draft/preseason + weekly in-season)
- **Draft Prep** (mock drafts, cheat sheets, strategy)
- **Player News** (transactions, injuries, depth chart changes)
- **Waiver Wire / Add-Drop** (in-season)
- **Start/Sit Advice** (weekly in-season)
- **Sleepers / Busts / Breakouts** (preseason + weekly)
- **Podcast** (nearly every site has one)

### Pattern 7: Scoring Format Handling

Sites that offer interactive rankings always support multiple scoring formats:

- Standard (non-PPR)
- Half PPR (0.5 points per reception)
- Full PPR (1 point per reception)
- Some offer Custom scoring
- PPR has become the default for most sites

### Pattern 8: Seasonal Content Cadence

All sites follow the same annual rhythm:

- **Offseason** (Feb-Apr): Free agency analysis, NFL Draft impact, dynasty rankings, early rankings
- **Preseason** (May-Aug): Draft guides, mock drafts, cheat sheets, top-150/200/300 rankings
- **In-season** (Sep-Jan): Weekly rankings, start/sit, waiver wire, matchup analysis
- **Postseason** (Jan-Feb): Season review, dynasty stock, keeper advice

---

## Key Takeaways

### For a Commentary/Analysis Site (Not a Game Platform):

1. **You don't need interactive tools** -- Sites like ESPN, The Athletic, and Bleacher Report publish rankings as editorial articles, not interactive databases. This matches the static HTML approach.

2. **URL structure recommendation**: `/fantasy-football/` as the section, with sub-paths like:
   - `/fantasy-football/` (section landing page)
   - `/fantasy-football/rankings/` (rankings articles hub)
   - `/fantasy-football/draft-guide/` (preseason draft content)
   - `/fantasy-football/start-sit/` (weekly advice, in-season)
   - Individual articles: `/fantasy-football/[slug]/`

3. **Rankings as articles work well** -- ESPN's model of publishing rankings as long-form editorial with position sections and expert commentary is the most natural fit for an opinion/analysis site.

4. **Seasonal content is key** -- The content calendar matters. Draft season (May-August) is peak traffic for fantasy content. Weekly rankings drive repeat visits during the NFL season (September-January).

5. **Fantasy should be a section within Sports, not standalone** -- Since the site covers politics, markets, news, and sports, fantasy football should nest under the Sports topic or exist as its own sub-topic, similar to how CBS nests it under NFL or how ESPN gives it a dedicated section.

6. **The analyst voice matters most** -- The Athletic and Yahoo both emphasize named analysts. Since Nick IS the analyst voice, this is a natural fit: "Nick Archer's Fantasy Football Rankings" as a branded content franchise.

7. **Differentiation opportunity** -- Most pure fantasy sites are tool-heavy. An analysis-first site with a trusted voice, covering fantasy alongside broader sports and news, is closer to The Athletic model but without the paywall.
