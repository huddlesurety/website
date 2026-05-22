import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // To deploy as static files (cheaper on Railway, serve via Caddy/Nginx),
  // uncomment the line below and rebuild. The `out/` directory will hold
  // the static site. See README.md for details.
  // output: "export",

  reactStrictMode: true,

  // We run `tsc --noEmit` separately (via `npm run type-check` / CI), so we
  // skip Next's in-build type check. Next 15.5's build worker can spuriously
  // fail to resolve its own auto-generated route types in some setups, and
  // running tsc twice is wasted CI time anyway.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Marketing site has no images served from the app yet, but if you add
  // any from /public, they'll be optimized by next/image by default.
};

export default nextConfig;
