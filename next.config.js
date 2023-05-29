/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development'
  disable: true,
  trailingSlash: false,
});

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
  },
});
// const nextConfig = {

// }

// module.exports = nextConfig
