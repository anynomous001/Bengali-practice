import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  // Stops Next.js writing an AGENTS.md file into the repo during `next dev`.
  agentRules: false,
  // Keeps the dev-mode badge out of the landing-page screenshots (npm run shots).
  devIndicators: false,
  serverExternalPackages: ["@electric-sql/pglite"],
  // Pronunciation clips are read from disk by /api/audio, so make sure they ship with the deployment.
  // Production only: in `next dev` this setting makes the page reload in a loop.
  ...(process.env.NODE_ENV === "production" ? { outputFileTracingIncludes: { "/api/audio": ["./content-audio/**/*"] } } : {}),
  async redirects() {
    // Vocabulary used to live under Speaking.
    return [
      { source: "/learn/speaking/vocabulary", destination: "/learn/vocabulary", permanent: false },
      { source: "/learn/speaking/vocabulary/:id", destination: "/learn/vocabulary/:id", permanent: false },
      // The tense workout is part of Tenses now.
      { source: "/learn/grammar/workout", destination: "/learn/grammar", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          // Not a full script policy: Next.js and Razorpay Checkout both need inline/third-party scripts.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
        ],
      },
    ];
  },
};

export default config;
