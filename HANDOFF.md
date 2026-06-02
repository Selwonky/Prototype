# HANDOFF — Jo from Commons (Dashboard)

Snapshot to resume work on another machine. Everything below is local-only or in private GitHub repos under your access.

## What this is

A clickable PLG prototype for **Jo from — The Commons** (Maestro OrgChart product surface). Vite + React 19 + TypeScript + Tailwind v4. Mock-data only, no backend.

The prototype **consumes the canonical design system from source** — `Selwonky/jofrom-design-system` cloned locally — via Vite path aliases. No published `@jofrom/design-system` package; the alias resolves to `~/jofrom-design-system/src` on disk.

## Repos

| Local path | GitHub | Role |
|---|---|---|
| `~/commons-preview` (clones as `~/Dashboard`) | `Selwonky/Dashboard` (origin) · `J0from/Dashboard` (platform, no auto-push) | The prototype — push target is `origin` (Selwonky) |
| `~/Jo_Design_System` | `Selwonky/Jo_Design_System` | Canonical design system (tokens, components). Consumed from source via Vite alias. |
| `~/jofrom-specs` | local-only | Written product-backlog specs (onboarding, commons shell, object cards). Not pushed. |
| `~/platform-plg-front` | `J0from/platform-plg-front` | Real PLG front. Future fold-in target. |
| `~/platform-plg-mcp` | `J0from/platform-plg-mcp` | MCP/onboarding repo. Original source of the shadcn primitives (now superseded by the design system). |

## Run on the new machine

```sh
cd ~
git clone https://github.com/Selwonky/Dashboard.git
git clone https://github.com/Selwonky/Jo_Design_System.git    # required sibling; Vite alias points at it
cd ~/Dashboard
pnpm install
pnpm dev --port 3001
```
Open **http://localhost:3001** — lands on `/home`.

Sanity:
```sh
git remote -v
# origin    https://github.com/Selwonky/Dashboard.git
# platform  https://github.com/J0from/Dashboard.git    (never auto-pushed to)
pnpm build
# vite build only (no tsc) — esbuild transpiles the design-system source
```

## Pages (every page now at `/{page}`)

| Route | Screen | Notes |
|---|---|---|
| `/` | redirects to `/home` | |
| `/welcome` | Welcome | outside shell |
| `/onboarding` | 7-step onboarding | outside shell |
| `/home` | Workspace home | KPI grid + today's work + inbox summary + work areas |
| `/inbox` | Inbox | approve / edit / reject, sheet detail, toasts |
| `/queue` | Queue | machine work in flight; step + next output |
| `/recent` | Compiler Records | summaries + link back to source object |
| `/orgchart` | Maestro OrgChart | dept → job → workflow seeds + compiler records |
| `/objects/:type` | Object kanban | 5-column board (Needs you · In progress · Scheduled · Draft · Done) |
| `/objects/detail/:id` | Object detail | DS `EntityHeader` + `ActivityTimeline` |
| `/departments/:dept` | Department workspace | consistent status tabs (Active · Needs approval · Done) on every dept; Marketing adds category tabs (Content Calendar · Drafts · Campaigns · Performance) |
| `/settings/:setting` | Tools / Security & Access / Billing / Onboarding | Tools uses DS `IntegrationCard` |

## What lives where in `src/`

```
src/
├── App.tsx                     # all routes (flat /{page})
├── main.tsx                    # initTheme + render
├── styles.css                  # single Tailwind v4 entry: imports the DS tokens/base/utilities + @theme bridge mapping DS semantic vars (--primary, --card, --sidebar*) to color utilities so existing classes resolve. DS @source for tree scanning.
├── components/
│   ├── CommonsShell.tsx        # sidebar + topbar + main; collapse toggle lives in the sidebar footer
│   ├── ObjectCard.tsx          # DS Card + StatusBadge + ButtonLink; priority dot + glyph + status
│   ├── StatusBadge.tsx         # statusKind → DS Badge (variant × color)
│   ├── primitives.tsx          # PageHeader, Section, EmptyState (DS wrap), ButtonLink (Link styled via DS buttonVariants)
│   └── ui/                     # 4 vendored gaps not in the DS: avatar, separator, sheet, stepper
├── lib/
│   ├── prototype-data.ts       # fixture data (departments, work objects, inbox, queue, outputs, orgchart, tools, industries) + statusBadge map
│   ├── navigation.ts           # navGroups (Start · Departments · Objects · Settings) + deptIcon
│   ├── store.tsx               # CommonsProvider (approve/edit/reject, tool toggles, recent feed); uses sonner for toasts
│   ├── theme.ts                # initTheme + useTheme (light/dark toggle, localStorage persistence)
│   └── utils.ts                # cn + getInitials
└── pages/
    ├── WelcomePage.tsx OnboardingPage.tsx
    ├── HomePage.tsx InboxPage.tsx QueuePage.tsx RecentPage.tsx OrgChartPage.tsx
    ├── ObjectsPage.tsx ObjectDetailPage.tsx
    ├── DepartmentPage.tsx SettingsPage.tsx
```

## Design-system consumption

- **Tokens.** Prototype loads the DS's own `tokens.css` / `base.css` / `utilities.css`. Brand blue `#0055ff`, accent purple `#9333ea`, two-tone operational sidebar (lavender → deep-purple in dark), `theme-*` text + shadows. A small `@theme` bridge in `src/styles.css` maps the DS semantic HSL vars to Tailwind color utilities so prototype classes (`bg-primary`, `bg-card`, `bg-sidebar`, …) keep resolving.
- **Vite aliases.** `@jofrom/design-system/*` → `~/jofrom-design-system/src/...`. Shared deps (react / radix / lucide / recharts / clsx / tailwind-merge) are explicitly aliased to this app's `node_modules` and react is **deduped**, so the source-consumed DS resolves cleanly.
- **Components used.** Primitives — `Button`, `Card`, `Badge`, `Select`, `Dialog`, `Tooltip`, `Progress`, form `Input/Textarea/Label`. Domain — `KPIGrid` + `StatCard` (Home), `IntegrationCard` (Tools), `EntityHeader` + `ActivityTimeline` (object detail), `FilterTabs` (department tabs), `KanbanColumn` + `KanbanCard` (object boards).
- **Four gap shims kept local** (not in the DS): avatar, separator, sheet, stepper. Sonner is retained for toasts.

## Recent commits (newest first)

```
0649a1b Remove playground/commons-preview          (on Jo_Design_System)
eefd6d5 Sidebar: move Departments above Objects
1d721e5 Move sidebar collapse toggle into the sidebar footer
4d2553d Flatten routes: each page now lives at /{page}
d5ad75c Department-specific category tabs (Marketing)
10f3d09 Apply 5-column kanban to all object pages
6074df1 Rename department third tab Recent → Done
72ffba9 Sales uses standard dept tabs; Blocks is a 5-column kanban
cb95046 docs: PROTOTYPE_OVERVIEW reflects @jofrom/design-system consumption
6d1954c DS swap wave 2: full component swap + domain components
dc47b2d DS swap wave 1: shared components + Vite source-consumption
f8f35d2 Consume @jofrom/design-system tokens (local) — foundation
```

## Open / suggested next steps

1. **Define dept-specific category tabs for the other departments** (the pattern is in `DepartmentPage.tsx` → `deptCategories`). Marketing is wired (Content Calendar · Drafts · Campaigns · Performance); Sales would be Pipeline · Partnerships · Risk; etc.
2. **Filter `/objects/:type` by `type`** — all six object routes currently share the same kanban. The pool already carries `type` on each object; pages just need to filter by the route param.
3. **Contribute the 4 gap components upstream** (avatar, separator, sheet, stepper) into `Jo_Design_System` so the prototype can drop the local shims.
4. **Swap text `→` and `×` glyphs to Lucide `ArrowRight` / `X` icons** in links and remove-chip buttons (keep `—` em dashes and `·` middots — those are intentional typography).
5. **Promote a snapshot to `J0from/Dashboard`** when ready — manually: `git push platform main`.

## Conversation history

Not in git. Two transcripts + the persistent memory files live in:
```
~/.claude/projects/-Users-jeremyknowles/
  ├── 5ce94770-…jsonl     # current session
  ├── 0df6a309-…jsonl     # earlier session
  └── memory/
      ├── MEMORY.md
      └── commons-prototype.md
```
A tarball is on the Desktop: `~/Desktop/jofrom-claude-session.tar.gz` (10 MB). On the new Mac, unzip into `~/.claude/projects/`, rename the inner folder if the new home is at a different username, then `claude --resume` from `~/Dashboard` to pick up this session.

## Design rules

1. **Contrast.** Dark surface → light text. Light surface → dark text. Always pair semantic background/foreground tokens that auto-flip with theme; never pair `bg-X` with a hardcoded text colour. Approved pairs and details: see the comment block at the top of `src/styles.css`.

## Promotion rule (per v4 spec)

```
START IN PLAYGROUND  →  COPY TO PLATFORM  →  PUSH TO STAGING  →  PUSH TO PRODUCTION
```
Dashboard = playground. `J0from/Dashboard` (the `platform` remote) is the platform copy — only push there on explicit promotion.
