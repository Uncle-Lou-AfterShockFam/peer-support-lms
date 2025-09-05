/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    unoptimized: true
  },
  env: {
    BASEROW_API_URL: process.env.BASEROW_API_URL || 'http://localhost/api',
    BASEROW_TOKEN: process.env.BASEROW_TOKEN || '',
  },
  async rewrites() {
    return [
      {
        source: '/api/baserow/:path*',
        destination: `${process.env.BASEROW_API_URL || 'http://localhost/api'}/:path*`,
      },
    ];
  },
}

module.exports = nextConfig