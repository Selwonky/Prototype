# HANDOFF — Jo from Commons Prototype

Snapshot to resume work on another machine. Everything below is local-only or in private GitHub repos under your access.

## What this is

A clickable PLG prototype for **Jo from — The Commons** (Maestro OrgChart product surface). Vite + React 19 + TypeScript + Tailwind v4. Mock-data only, no backend.

The prototype consumes the canonical application design system from the private GitHub package dependency `@jofrom/design-system`.

## Repos

| Local path | GitHub | Role |
|---|---|---|
| `~/Prototype` | `Selwonky/Prototype` | Clickable Commons prototype. |
| `~/jofrom-design-system` | `Selwonky/jofrom-design-system` | Canonical application design system: tokens, components, templates. |

## Run on the new machine

```sh
cd ~
git clone https://github.com/Selwonky/Prototype.git
cd ~/Prototype
pnpm install
pnpm dev --port 3001
```
Open **http://localhost:3001** — lands on `/home`.

Sanity:
```sh
git remote -v
# origin    https://github.com/Selwonky/Prototype.git
pnpm build
# vite build
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
| `/objects/:type` | Object kanban | 4-column board (Queue · Active · Blocked · Done) |
| `/objects/detail/:id` | Object detail | DS `EntityHeader` + `ActivityTimeline` |
| `/departments/:dept` | Department workspace | consistent status tabs (Queue · Active · Blocked · Done) on every department. |
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
│   └── ui/                     # local prototype-only UI helpers
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

- **Tokens.** Prototype loads the DS package stylesheet through `@jofrom/design-system/styles.css`. A small `@theme` bridge in `src/styles.css` maps DS semantic HSL vars to Tailwind color utilities so prototype classes (`bg-primary`, `bg-card`, `bg-sidebar`, …) keep resolving.
- **Dependency.** `@jofrom/design-system` is consumed from `github:Selwonky/jofrom-design-system`. Shared deps are deduped in Vite so the DS package and Prototype use one React runtime.
- **Components used.** Primitives — `Button`, `Card`, `Badge`, `Select`, `Dialog`, `Tooltip`, `Progress`, form `Input/Textarea/Label`. Domain — `KPIGrid` + `StatCard` (Home), `IntegrationCard` (Tools), `EntityHeader` + `ActivityTimeline` (object detail), `FilterTabs` (department tabs), `KanbanColumn` + `KanbanCard` (object boards).
- Sonner is retained for toasts.

## Recent commits (newest first)

```
Use `git log --oneline -10` in `~/Prototype` for current history.
```

## Open / suggested next steps

1. **Filter `/objects/:type` by `type`** — all six object routes currently share the same kanban. The pool already carries `type` on each object; pages just need to filter by the route param.
2. **Swap text `→` and `×` glyphs to Lucide `ArrowRight` / `X` icons** in links and remove-chip buttons (keep `—` em dashes and `·` middots — those are intentional typography).
3. **Continue moving reusable patterns upstream** into `jofrom-design-system` when they become stable.

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
Prototype remains the clickable playground. Promote only through the agreed release process.
