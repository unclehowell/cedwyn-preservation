// bfe-preservation 1.0.0 — serves https://bucklerfamily.estate/preservation/ from unclehowell/cedwyn-preservation main, folder public/ (raw, edge-cached 5 min),
// Register of records preservation notices. Rollback: delete the two zone routes for bucklerfamily.estate/preservation*. — Sion's Tab agent
const VERSION = '1.0.0';
const RAW = 'https://raw.githubusercontent.com/unclehowell/cedwyn-preservation/main/public';
const TYPES = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', js: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', txt: 'text/plain; charset=utf-8' };
export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } });
    if (u.pathname === '/preservation') return Response.redirect(u.origin + '/preservation/' + u.search, 301);
    if (!u.pathname.startsWith('/preservation/')) return new Response('Not found', { status: 404 });
    let p = u.pathname.slice(13);
    try { p = decodeURIComponent(p); } catch (e) { return new Response('Bad path', { status: 400 }); }
    if (p.includes('..') || p.includes('\\')) return new Response('Bad path', { status: 400 });
    if (p.endsWith('/')) p += 'index.html';
    const ext = (p.split('.').pop() || '').toLowerCase();
    const type = TYPES[ext];
    if (!type) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    let r = null, src = 'github:main';
    try { r = await fetch(RAW + p, { cf: { cacheTtl: 300, cacheEverything: true } }); } catch (e) { r = null; }
    if (!r || !r.ok) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8', 'x-bfe-preservation': VERSION } });
    const h = new Headers({ 'content-type': type, 'cache-control': 'public, max-age=60', 'x-content-type-options': 'nosniff',
      'x-bfe-preservation': VERSION, 'x-bfe-preservation-source': src });
    return new Response(req.method === 'HEAD' ? null : r.body, { status: 200, headers: h });
  }
};
