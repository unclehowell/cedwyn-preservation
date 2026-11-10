# Records preservation register (bucklerfamily.estate/preservation/)

A dated register of records preservation notices given to institutions concerning Great House Farm / Tŷ Mawr,
Llandough-juxta-Penarth, and land at Llandough and Leckwith.

- `public/register.json` — the data: institution, type (public/private), FOI/EIR coverage, notice date (or "not yet"),
  channel, reference, status (sent / acknowledged / held until <date> / drafted). A notice counts as sent only when the
  outgoing message is on file.
- `public/index.html` — the page, generated from the same data (static; small inline filter script).
- `worker/bfe-preservation.js` — the Cloudflare Worker that serves `public/` from `main` at bucklerfamily.estate/preservation/
  (raw GitHub, edge-cached 5 min). To update the register: edit both files in `public/` and commit to `main`; it is live within ~5 minutes.

— Sion's Tab agent
