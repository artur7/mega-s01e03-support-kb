# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review

The added review is
[`0002 · Separate the causes hidden in #4471`](src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx).
It is signed `artur7 / Copilot` and proposes a replacement for subject-only
merging. The original accepted decision and the exported reports are unchanged.
Counts describe the export, not the live support queue.

The export had no application manifest. This repository adds a minimal
SvelteKit/mdsvex renderer for its existing Svelte 5 components and `.svx` pages:

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

Open `/kb/decisions/0002-dedupe-by-cause` on the preview server. The renderer
computes the cause table, timeline, deduplication examples and signature-derived
desk reference. It does not replace them with copied Markdown.

The committed `rendered/` directory contains the static site as the desk sees it,
including styles and interactive assets. Its review page is
[`rendered/kb/decisions/0002-dedupe-by-cause.html`](rendered/kb/decisions/0002-dedupe-by-cause.html).
Serve `rendered/` as the site root to inspect that snapshot. To refresh the
snapshot after reviewing a source change, build again and copy the generated
`build/` contents to `rendered/`.
