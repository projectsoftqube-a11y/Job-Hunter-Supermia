/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  // Serve every optimised image at quality 90 (the default 75 looked soft on the photos)
  images: {
    qualities: [90],
  },
  partialPrefetching: true,
  // Don't advertise the framework in every response
  poweredByHeader: false,
  // Security headers on every response. The CSP limits framing, plugins, base and form targets; it does
  // not restrict scripts, so it can't break the GSAP/Lenis/Next runtime.
  // Browsers ask for /favicon.ico on their own; serve the brand icon there
  rewrites() {
    return [{ source: '/favicon.ico', destination: '/brand/favicon.png' }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  // Feature pages moved under /features (permanent, so search engines carry the old URLs' signals over)
  redirects() {
    return ['ai-mock-interview', 'resume-job-match', 'job-application-email', 'ai-job-match'].map((slug) => ({
      source: `/${slug}`,
      destination: `/features/${slug}`,
      permanent: true,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
