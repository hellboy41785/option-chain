/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loading.io'],
  },
  env:{
    CORS_URL:process.env.CORS_URL
  }
}

module.exports = nextConfig
