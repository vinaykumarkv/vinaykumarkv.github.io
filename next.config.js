/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static‑HTML export ─────────────────────
  output: 'export',
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
module.exports.turbopack = { root: '.' };
