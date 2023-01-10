/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development'
  disable: true
})

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
})
// const nextConfig = {

// }

// module.exports = nextConfig