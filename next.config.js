/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://100.101.152.29:8080/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
