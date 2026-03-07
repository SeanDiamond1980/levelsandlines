/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/booking',
        destination: https://v0-booking-page-design-zeta.vercel.app/,
      },
      {
        source: '/booking/:path*',
        destination: https://v0-booking-page-design-zeta.vercel.app/,
      },
    ]
  },
}

export default nextConfig
