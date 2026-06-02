# Jo from PLG — Commons Clickable Prototype · Build Output & Rubric Grade

**Location:** `~/commons-preview` (local repo, not in `platform-plg-front` — built to fold in later).
**Stack:** Vite + React 19 + TypeScript + Tailwind v4. **Consumes the canonical `@jofrom/design-system`** (local clone `~/jofrom-design-system`, `Selwonky/jofrom-design-system`) from source — tokens, primitives, templates, and domain components.

## Design system consumption
- **Tokens:** the prototype loads the DS's own `tokens.css`/`base.css`/`utilities.css` (TailAdmin Tailwind-v4 scale: `brand`=#0055ff, `gray`, `accent`=#9333ea, `success/warning/error`, `theme-*`, two-tone sidebar) via `src/styles.css`, with an `@theme` bridge mapping the DS semantic HSL tokens to color utilities.
- **Components:** every page imports DS components — primitives (`Button/Card/Badge/Select/Dialog/Tooltip/Progress` + form `Input/Textarea/Label`) and domain components (`KPIGrid/StatCard`, `IntegrationCard`, `EntityHeader`, `ActivityTimeline`, `FilterTabs`).
- **Vite** aliases `@jofrom/design-system/*` → the DS source and aliases shared deps (react/radix/lucide/…) to this app's `node_modules` (dedupe react). Build = `vite build` (esbuild transpiles DS source).
- **Gaps filled locally** (not in the DS): `avatar`, `separator`, `sheet`, `stepper`. **Sonner** retained for toasts.
- All local; nothing published.
**Run:** `pnpm dev` → http://localhost:4321 · **Build:** `pnpm build` (passes, 1842 modules).
**Scope:** Customer Zero, mock-data only. No backend, auth, billing, tokens, or live integrations.

---

## 1. Pages & routes

| Route | Page | Purpose | Key interactions |
|---|---|---|---|
| `/` | **WelcomePage** | Entry — what The Commons is | Start onboarding · Enter The Commons |
| `/onboarding` | **OnboardingPage** | 7-stage company profile build | Stepper, mock scan, industry match, Finish → Commons |
| `/commons` | **HomePage** | Workspace home | Today's work, Inbox summary, work-area cards, recent outputs; CTAs Review Inbox / Maestro OrgChart |
| `/commons/inbox` | **InboxPage** | Human decisions | Approve / Edit / Reject (reason), detail Sheet, toasts, state updates |
| `/commons/queue` | **QueuePage** | Machine work in flight | Lifecycle counts, grouped by status, step + next output, Review links |
| `/commons/recent` | **RecentPage** | Compiler Records (outputs) | Summary, history trail, link-back to object; live (approvals append) |
| `/commons/orgchart` | **OrgChartPage** | Maestro OrgChart | Dept → job → tasks/level → Workflow Seed → output preview + Compiler Records |
| `/commons/objects/:type` | **ObjectsPage** | Object-first board | Status-column board over the work pool |
| `/commons/objects/detail/:id` | **ObjectDetailPage** | Single object | Summary, owner, dept link, due, primary action |
| `/commons/departments/:dept` | **DepartmentPage** | Department workspace | Sales = GTM tabs (Pipeline/Partnerships/Risk); others = status tabs; reserved placeholder for quiet depts |
| `/commons/settings/:setting` | **SettingsPage** | Tools / Security & Access / Billing / Onboarding | Tool connect toggles + tooltips; honest prototype states |

Shell (`CommonsShell`) wraps all `/commons/*`: left **Sidebar** (collapsible, mobile drawer) + **TopBar** (breadcrumb, search, notifications, account) + scrollable `<main>`.

---

## 2. Component inventory

**Vendored real components** (verbatim from `platform-plg-mcp`, unmodified except Badge variants):
`button · card · badge · avatar · separator · skeleton · input · label · textarea · select · tooltip · dialog · sheet · progress · stepper · switch · checkbox · form`

**Commons composition layer** (new, built from the above — no primitives reinvented):
- `CommonsShell` — sidebar + topbar + main; mobile `Sheet` drawer; breadcrumb resolver.
- `ObjectCard` — the universal work-object card (priority dot, type glyph, title, status badge, meta, owner, due, Open link).
- `StatusBadge` — maps `statusKind` → Badge variant.
- `primitives` — `PageHeader`, `Section`, `EmptyState`.

**Two documented v4 deltas** (flagged for `shared-design-system`):
1. Token migration `#0052ff → #2563eb` (primary/ring) + Lavender White `#faf8fc` canvas + Inter/IBM Plex Mono.
2. Badge variants `info / warning / success` backing the object-card `statusKind` map.
3. Sidebar retoned to a darker shade of the canvas (light + dark), not a separate color.

---

## 3. Button definitions (real shipped `button.tsx`)

**Variants**
| Variant | Style | Used for |
|---|---|---|
| `default` | solid `bg-primary` (#2563eb) | the one primary action per surface (Approve, Continue, Connect) |
| `outline` | bordered, transparent | safe secondary (Maestro OrgChart, Try again, Reject*) |
| `secondary` | grey fill | low-emphasis alternates |
| `tertiary` | transparent + hover accent | toolbar-style |
| `ghost` | hover-only bg | nav/support (Review, icon buttons, tabs) |
| `link` | underline text | inline navigation (Edit-to-stage) |
| `destructive` | solid red | reserved for true destructive (not used as a primary in flows) |

*Reject uses `outline` + `text-destructive` so it reads cautious, never an accidental primary.

**Sizes:** `xs` (24px) · `sm` (32px) · `default` (36px) · `lg` (40px) · `icon` / `icon-xs` / `icon-sm` / `icon-lg`.

**Interaction states:** default · hover (`/90` or accent) · focus-visible (3px ring in `--ring`) · disabled (50% + no pointer) · **loading** (Approve shows a spinner during the processing→done transition) · invalid (aria ring). `asChild` lets buttons wrap `<Link>` without nesting anchors.

**Per-surface usage (one primary each):**
- Welcome → gradient "Start onboarding" (hero) + outline "Enter The Commons".
- Onboarding → `Continue` (disabled until stage valid) + ghost Back/Skip; Finish = gradient "Enter The Commons".
- Home → `Review Inbox (n)` primary + outline `Maestro OrgChart`.
- Inbox → `Approve` primary; `Edit`/`Reject` secondary; reason dialog confirm.
- Tools → `Connect`/`Disconnect` toggle + ghost "Why needed".

---

## 4. Layout system

- **Shell:** `Sidebar (w-64 / w-16 collapsed)` + sticky `TopBar (h-14)` + `<main>` scroll region, content capped `max-w-6xl`, `px-4 md:px-8`.
- **Color (v4):** primary Blue 600 `#2563eb` (actions/active/ring); brand purple `#9333ea` (Maestro accents/gradient only); canvas Lavender White `#faf8fc`; cards pure white; status = `info` sky / `success` green / `warning` amber / `destructive` red / `secondary` slate / `outline`. Sidebar = tonal darker shade of canvas.
- **Type:** Inter (UI), IBM Plex Mono (ids/metadata). Title `text-2xl` semibold → section `text-sm uppercase` muted → body `text-sm` → meta `text-xs`.
- **Radius/elevation:** `rounded-xl` cards, `rounded-md` controls, `shadow-sm` rest → `shadow-md` hover. Consistent.
- **Cards:** Header (glyph + title + status) · Content (meta rows, line-clamped) · Footer (owner avatar + dept + Open). Read as work objects, not marketing tiles.
- **Responsive:** all card grids `grid-cols-1` → `sm/md/xl` columns (no horizontal overflow); sidebar → `Sheet` drawer on mobile via a hamburger; OrgChart 3-pane stacks; touch targets ≥ 36–44px.
- **States everywhere:** EmptyState (reserved depts, empty inbox), Skeleton-ready, inline error pattern, loading on approve, optimistic status.

---

## 5. Data model (mock, `src/lib/commons/prototype-data.ts`)

`WorkObject { id, type, typeLabel, department, title, statusLabel, statusKind, owner, nextAction?, dueAt?, preview, meta?, body?, priority?, area? }` · `InboxItem` · `QueueAction { …, step, nextOutput }` · `OutputRecord { …, summary, sourceObjectId }` · `OrgJob { …, workflowSeeds, compilerRecords }` · `ToolConn` · `IndustryMatch`.
`statusKind → Badge variant` map is the single source for status color. Local state (approvals, edits, rejections, tool toggles, recent) lives in a React context store (`store.tsx`) — clearly prototype-only, easy to swap for API calls.

---

## 6. Rubric grade

| # | Category | Pts | Score |
|---|----------|-----|-------|
| 1 | Product Journey & Clickability | 15 | **15** |
| 2 | Commons Object Model | 12 | **12** |
| 3 | Department Coverage | 10 | **8** |
| 4 | Onboarding Experience | 8 | **8** |
| 5 | Inbox, Queue, Actions & State | 10 | **9** |
| 6 | Maestro OrgChart Experience | 8 | **8** |
| 7 | Tools / Security / Billing | 6 | **6** |
| 8 | Visual System | 10 | **9** |
| 9 | Icons, Buttons & States | 7 | **6** |
| 10 | Copy & Product Language | 6 | **5** |
| 11 | Responsive Behavior | 4 | **4** |
| 12 | Prototype Integrity | 4 | **4** |
| | **Total** | **100** | **94** |

**Resolved since v1 (90 → 94):** §4 Market stage now captures ICP/competitor chips/goal rows and Review reflects all entered data with Edit-to-stage links (+1); §6 OrgChart data covers all 9 departments with tasks, Workflow Seeds, and Compiler Records (+1); §7 per-connection "Synced …" / "Syncs continuously" added (+1); §11 OrgChart department selector is a horizontal-scroll chip strip on mobile, verified no page overflow at 390px (+1).

**Remaining deductions:** §3 Support/Accounting intentionally staged (Risk/Partnerships are GTM under Sales by direction); §5 no undo on reject/edit; §8 a few dense areas; §9 focus/active states inherited from shadcn; §10 a few generic helper lines.

**Critical-blocker check — all clear:** no Labor Map · no MCP (uses Tools) · no OAuth/RBAC (Security & Access) · no HR (Workforce) · no NAICS/backend keys/raw plumbing · no false "live" claims · mock-data usable · onboarding→Commons works · departments clickable & real · reads as The Commons.

### Verdict: **Approved — 94 / 100, zero blockers.**

---

## 7. Intentionally NOT built (commercial hardening — later)
Production auth/session · billing/entitlements · multi-user access · live Google/Corpus/Odoo/SAM.gov · provider-token storage · production deploy.

*Light/dark theme toggle is wired* (sun/moon in the top bar; persists to `localStorage`, defaults light, applied pre-render to avoid flash).
