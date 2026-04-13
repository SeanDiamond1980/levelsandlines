/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/booking',
        destination: 'https://v0-booking-page-design-zeta.vercel.app/booking',
      },
      {
        source: '/booking/:path*',
        destination: 'https://v0-booking-page-design-zeta.vercel.app/booking/:path*',
      },
      {
        source: '/tracker',
        destination: '/tracker.html',
      },
    ]
  },
}

export default nextConfig
