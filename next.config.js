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
        source: '/paradise',
        destination: '/paradise/index.html',
      },
      {
        source: '/graywood',
        destination: '/graywood/index.html',
      },
      {
        source: '/broccolini',
        destination: '/broccolini/index.html',
      },
    ]
  },
}

export default nextConfig
