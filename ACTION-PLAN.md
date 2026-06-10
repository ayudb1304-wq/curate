# Curately MVP Action Plan

Version 0.2 | 2026-06-10 | Companion to MVP-PRD.md

Changes in 0.2: Phyllo is mocked (no real OAuth until company registration and sandbox access), no payment gateway, no paywall, deploy on Vercel from GitHub (`ayudb1304-wq/curate`).

Target: working MVP in 7 weeks, then a 4 week seeding push. Scope is locked to the PRD section 6. Anything else goes to the parking lot at the bottom.

## Week 0: Setup (mostly done)

- [x] Scaffold Next.js + shadcn (done).
- [x] Phyllo mock data layer: `lib/phyllo/` with v1 API types, fixtures, and a mode-switched client (done).
- [x] Push repo to GitHub: `https://github.com/ayudb1304-wq/curate.git`.
- [ ] Import the repo in Vercel (vercel.com > Add New > Project > select `curate`). Set `PHYLLO_MODE=mock`.
- [ ] Create Supabase project; add env vars locally and in Vercel.
- [ ] Set up Resend (or equivalent) account for invoice emails.
- [ ] Background, non-blocking: request Phyllo sandbox access so it is in the pipeline. Do not wait on it.

Exit: pushing to main deploys to a live Vercel URL.

## Weeks 1-2: Foundation

- [ ] CI check on PRs: lint + build.
- [ ] Supabase auth: email + Google sign-in.
- [ ] Data model v1: creators, social_connections, kit_sections, rate_cards, collabs, invoices, invoice_events, page_views.
- [ ] Onboarding flow: name, handle, vertical, country, follower band. Slug claim.
- [ ] App shell: dashboard layout, nav, empty states.

Exit: a user can sign up, onboard, and land on an empty dashboard in production.

## Weeks 3-4: Live Brand Kit on the mock layer

- [ ] "Connect account" flow wired to `getPhylloClient()` (mock mode): connect, store account, sync profile, audience, and contents into Supabase.
- [ ] Public kit page at `/{handle}`: metrics, demographics, recent content. All mock-sourced metrics carry a visible "demo data" label.
- [ ] Manual kit sections: bio, past collabs, rate card editor (real data, the core of the kit for now).
- [ ] Kit page view tracking and share/copy-link affordance.
- [ ] Badge logic: demo data vs self-reported, with "Verified by Curately" reserved for future real OAuth.

Exit: a public kit link renders demo metrics plus real manual sections, and `PHYLLO_MODE=sandbox` would require no component changes.

## Week 5: Invoicing

- [ ] Invoice creation form with INR/USD, GST fields (GSTIN, GST line, TDS note).
- [ ] Creator payment-details settings: UPI ID, bank details, PayPal link, printed on every invoice.
- [ ] PDF generation and hosted invoice page (public, no login for the brand).
- [ ] Email send via Resend; statuses (draft, sent, viewed, paid, overdue); manual mark-as-paid; overdue reminder email.
- [ ] Invoice dashboard: list, outstanding total, paid this month.

Exit: end-to-end test: create, send, brand opens hosted page, creator marks paid.

## Week 6: Hardening and instrumentation

- [ ] Analytics events: signup, kit completed, kit share, kit view, invoice created/sent/paid. These map 1:1 to the PRD success criteria.
- [ ] Error monitoring (Sentry or equivalent), rate limiting on public pages.
- [ ] Mobile-responsive pass on kit page and invoice flow (creators live on phones).
- [ ] Security pass: RLS on all Supabase tables, no service keys client-side.

Exit: metrics dashboard answers "are we hitting PRD section 5" without manual queries.

## Week 7: Private beta

- [ ] Hand-onboard 20 to 30 creators from the target niche (India beauty/fashion). Sit with 5 of them on calls.
- [ ] Fix the top friction points only. No new features.
- [ ] Launch checklist: domain, legal pages (privacy, terms), support email.

Exit: 20+ creators with completed kits, at least 5 real invoices sent.

## Weeks 8-11: Seed to benchmark

- [ ] Outreach engine: DM/email scripts for the niche, referral hook ("get your kit link").
- [ ] Track weekly against MVP success criteria: signups, completed kits, invoices per active user, kit views.
- [ ] Weekly review: if invoice usage is under 40% of invoice-creators, interview and fix friction. Do not add features.

Exit / go-forward gate: 50+ active beta creators and steady invoice usage. Next milestones are unlocked by company registration (Phyllo sandbox/production swap, verified badge, Razorpay) and only then Stage 1 (brand discovery, escrow, take-rate) as a new PRD.

## When sandbox access arrives (whenever that is)

1. Set `PHYLLO_MODE=sandbox`, `PHYLLO_CLIENT_ID`, `PHYLLO_SECRET` in Vercel.
2. Re-verify `lib/phyllo/types.ts` field names against the live API reference; fix drift.
3. Add the Phyllo Connect SDK for the real OAuth popup (the only net-new build).
4. Flip mock-data labels to the "Verified by Curately" badge for OAuth-sourced metrics.

## Operating rules (anti scope creep)

1. The PRD section 6 list is the whole build. New ideas go to the parking lot below with a date.
2. A feature ships only if it serves one of the MVP success metrics.
3. No payment gateways, no paywall, no brand-side features until their gates are passed.
4. Weekly: re-read PRD section 7 before sprint planning.

## Parking lot

- Real OAuth via Phyllo sandbox/production (gated on access + company registration)
- Razorpay payment links on invoices (gated on company registration)
- Brand accounts and discovery (Stage 1)
- Escrow + 10% take-rate (Stage 1)
- Rate benchmarking hook (Stage 1)
- Scraper-based supply enrichment (Stage 1)
- Contracts/e-sign, reviews, campaign tracking (Stage 1+)
- Creator Pro SaaS, brand subscriptions (Stage 2)
- Data products, State of Creator Rates report (Stage 3)
