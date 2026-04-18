# PathCredit Logger 
A minimal activity logging app for Studor's PathCredit system, this is made only in time period of 60 minutes including hosting (except the Readme part), it only have frontend part, so that it gets started with 2-3 max command, though as I have more time left for submission I have also made one with backend and database integrated along with authentication.


## How to run locally

```bash
git clone https://github.com/YOUR_USERNAME/pathcredit-logger.git
cd pathcredit-logger
npm install && npm run dev
```

Opens at `http://localhost:5173`. There is no backend or database or other things.

**Live demo:** [studor-frontend.vercel.app](https://studor-frontend.vercel.app/) 

---

## What I built

**Log an activity** - A form with activity, category (Academic / Technical / Cultural / Sports), and date. Validation catches empty fields and trims whitespace.

**Activity feed** - All logged activities displayed newest-first, each showing name, category (color-coded), date, and PathCredit value. Filterable by category with live counts per tab.

**Persistence** - Activities survive page refresh and browser close via `localStorage`. Wrapped in try/catch so storage quota errors degrade gracefully (app still works, just doesn't persist).

**PathCredit scoring** - Each category has a weight (Academic: 10, Technical: 9, Cultural: 7, Sports: 6) defined in `src/utils/credits.js`. A live summary panel shows total credits earned and a per-category breakdown. The form previews the credit value before submission.

**Edge cases handled:**
- Empty form → field-level error messages, no submission
- No activities yet → friendly empty state, not a blank screen
- No results after filter → distinct "nothing in this category" state
- Long activity names → truncated with ellipsis in feed
- Delete → removes from feed and localStorage immediately

---

## What I'd add with another hour

**More robust validation** - Duplicate detection, character limits surfaced in the UI, date range warnings.

**Sorting** - Let users sort by date, category, or credits earned instead of just insertion order.

**With a real backend:** expose a REST API (Node/Express or Django + DRF), store activities in Postgres, add user accounts so PathCredits are tied to a student profile, and enable cross-device sync. The `storage.js` utility is intentionally isolated so swapping `localStorage` for API calls is a one-file change.


I already tried to do all this things, the link of the same can be accessed via : https://github.com/Arnavbhau56/studor-2

---

## Project structure

```
src/
  components/
    ActivityForm.jsx   ← form with validation + credit preview
    ActivityFeed.jsx   ← list rendering + empty states
    FilterBar.jsx      ← category tabs with counts
    CreditSummary.jsx  ← total + breakdown panel
  utils/
    storage.js         ← localStorage abstraction (drop-in replaceable)
    credits.js         ← PathCredit weights + scoring helpers
  App.jsx              ← state management + layout
  main.jsx
```

---
