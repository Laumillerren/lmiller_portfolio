// Single source of truth for the GitHub Pages sub-path. Only applied in
// production builds, so local `next dev` keeps working at plain
// localhost:3000 -- Next.js only auto-prefixes basePath for next/link and
// next/image, so plain <a> tags to files in /public (like the resume) need
// it added by hand.
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/lmiller_portfolio" : "";
