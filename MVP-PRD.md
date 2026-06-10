# Curately MVP PRD

Version 0.2 | 2026-06-10 | Status: Draft

Changes in 0.2: no real social OAuth in the MVP (not a registered company yet). Phyllo is mocked behind its real API schemas. No online payment collection and no paywall. Hosting on Vercel via GitHub.

## 1. One-line summary

A free Live Brand Kit and invoicing tool for micro and mid-tier creators (1K to 500K followers). Single-player utility first. No marketplace, no payments processing, no paywall in the MVP.

## 2. Problem

Creators in the 1K to 500K band have no affordable infrastructure:

- Media kits are static PDFs that go stale the week they are made. Brands do not trust self-reported numbers (fake followers are the number one brand concern).
- Getting paid is painful: chasing late payments, multi-currency fees, no escrow, tax compliance (GST/TDS in India) ignored by US and EU tools.
- Enterprise platforms (Grin, Aspire, CreatorIQ) cost $24K to $200K per year and serve brands, not creators. Creator tools (Beacons, Stan) lack verified data and real invoicing.

## 3. Target user

Primary: micro creators (1K to 100K followers) in India, beauty and fashion vertical, who do at least one paid brand collab per quarter.

Secondary (supported but not optimized for): any creator in the 1K to 500K band, any geo.

One vertical, one geo. We do not widen this until the Stage 0 benchmark is hit.

## 4. Why this scope

From the research (curate-research-file.md): the defensible path is "come for the tool, stay for the network." The Live Brand Kit and invoicing are valuable with zero brands on the platform, solve the cold-start problem, and generate the proprietary data (verified metrics, rate cards, payment behavior) that later powers the marketplace and data products.

Company constraint: Curately is not a registered company yet, so anything requiring business KYC or platform API approval (Phyllo production, Meta Graph API, Razorpay merchant account) cannot ship. The MVP builds the full product against a mocked Phyllo data layer so that real data is a config switch later, not a rebuild.

## 5. MVP success criteria

This MVP validates the product end to end with mock social data and real creator usage of everything else:

- Full creator journey works in production on Vercel: sign up, build kit, share kit link, create and send invoices.
- 50+ beta creators onboarded with a completed kit (bio, rate card, past collabs filled in).
- More than 40% of creators who created an invoice send at least 1 invoice per month.
- Kit links get shared: median onboarded creator's kit has at least 1 view from a non-owner session.

Deferred until real data access (sandbox or production): the research Stage 0 benchmarks (2,000+ OAuth-connected creators, 25% connect-rate threshold). Tracked then, not now.

## 6. Features in scope

### F1. Creator account and onboarding

- Email and Google sign-up (Supabase Auth).
- Onboarding collects: name, handle, vertical, country, follower band.
- A creator gets a profile slug: `curately.com/{handle}`.

Acceptance: a new user reaches a working (empty) brand kit in under 3 minutes.

### F2. Live Brand Kit (mock-data mode)

- All social data flows through a `PhylloClient` interface (`lib/phyllo/`). MVP runs `PHYLLO_MODE=mock`, which serves hardcoded fixtures shaped exactly like Phyllo v1 API responses (users, sdk-tokens, accounts, profiles, audience, contents). When sandbox access arrives, switching to real data is an env change plus the Connect SDK drop-in.
- "Connect account" flow exists in the UI and runs against the mock client, so the full connect, sync, and display pipeline is built and testable.
- Kit displays: follower count, engagement rate, audience demographics (age, gender, country, city splits), recent content with engagement.
- Badge logic is built but honest: metrics from the mock layer are labeled "demo data" until real OAuth exists. Manually entered sections are labeled "self-reported." The "Verified by Curately" badge activates only when real first-party data lands.
- Manual sections (real user data, fully functional): bio, past collabs (logo, link, description), rate card (price per deliverable type: post, reel, story, UGC video).
- Public shareable link with a clean, brand-facing layout. No login required to view. Page view counter visible to the creator.

Acceptance: a brand visiting the link sees the metrics sections (demo-labeled), rate card, and past collabs without logging in. Setting `PHYLLO_MODE=sandbox` with credentials requires zero component changes.

### F3. Invoicing (no payment processing)

- Create an invoice: brand name, brand email, line items, currency (INR and USD at minimum), due date, notes.
- GST fields for Indian creators: GSTIN, GST line, TDS note. Generated invoice is a compliant PDF.
- Send invoice by email with a hosted invoice page link.
- Payment happens off-platform: the invoice carries the creator's own payment details (UPI ID, bank transfer details, PayPal link). Creator marks invoices paid manually.
- Invoice statuses: draft, sent, viewed, paid, overdue. One-click reminder email for overdue invoices.
- Dashboard list of invoices with totals: outstanding, paid this month.

Acceptance: a creator can go from blank invoice to a sent invoice in under 2 minutes. The hosted invoice page renders the creator's payment details and the brand can view it without logging in.

### F4. Creator dashboard

- Single home screen: kit status (connections, last refresh, kit views), invoice summary, prompts to complete profile.

Acceptance: every MVP action (edit kit, copy kit link, create invoice) is reachable in one click from the dashboard.

## 7. Explicitly out of scope (do not build in MVP)

| Item | Why deferred |
|---|---|
| Real social OAuth (Phyllo production/sandbox, Meta Graph API) | Requires registered company and/or paid access. Mock layer stands in; swap is config. |
| Online payment collection (Razorpay, Stripe, any gateway) | Merchant KYC needs a registered business. Invoices carry off-platform payment details. |
| Paywall, subscriptions, Pro tier, any monetization | Explicitly excluded. MVP is free; we are buying usage and learning. |
| Brand accounts, brand discovery, search | Stage 1. Needs creator liquidity first. |
| Marketplace, take-rate, escrow, milestone payments | Stage 1. Pointless without two sides. |
| AI matchmaking | Stage 2. Needs real collab outcome data. |
| Rate benchmarking ("creators like you charge X") | Stage 1 give-to-get hook. Needs rate-card volume. |
| Scraper enrichment of non-onboarded creators | Stage 1 supply-padding tactic. |
| Contracts and e-sign | Post-MVP. |
| Ratings and reviews | Needs marketplace. |
| Stripe Tax, Wise, multi-rail payouts | No payment rails at all in MVP. |
| Campaign tracking, UTM attribution | Stage 1+. |
| Native mobile app | Web only, responsive. |

Any feature request not in section 6 goes to a parking lot, not the sprint.

## 8. Technical notes

- Stack: Next.js (App Router) + shadcn/ui (scaffolded), Supabase (auth, Postgres, storage), Resend or similar for transactional email.
- Hosting: Vercel, deployed from GitHub (`ayudb1304-wq/curate`). Push to main deploys production; PRs get preview deploys.
- Phyllo integration lives in `lib/phyllo/`: `types.ts` (v1 API schemas), `fixtures.ts` (dummy creator data), `client.ts` (PhylloClient interface, mock and HTTP implementations, selected by `PHYLLO_MODE`). Field names should be re-verified against the live API reference when sandbox access is granted.
- Data model still records the events we will monetize later: rate-card entries, invoice lifecycle, kit views. Capture now, productize later.
- No scraping anywhere in the MVP.

## 9. Risks

- Mock data in a public kit can mislead brands. Mitigation: unambiguous "demo data" labeling on all mock-sourced metrics; manual sections carry the real weight until OAuth lands.
- Phyllo sandbox timing is unknown (custom pricing, sales process). Mitigation: nothing blocks on it; request access in parallel and keep building.
- Without online collection, paid-status is self-reported, so payment-reliability data is weaker. Accepted for MVP.
- DPDP (India): no third-party personal data is processed in mock mode, which keeps compliance surface minimal until OAuth.

## 10. Open questions

- Final niche confirmation: India beauty/fashion is the working default. Confirm before marketing spend, not before building.
- Company registration timing, which gates Phyllo production, Razorpay, and the verified badge going live.
- Domain and product name: docs use Curately per the research file; repo is named curate.
