/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  // Serve every optimised image at quality 90 (the default 75 looked soft on the photos)
  images: {
    qualities: [90],
  },
  partialPrefetching: true,
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
