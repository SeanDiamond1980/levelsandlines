/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/booking',
        destination: 'https://YOUR-BOOKING-URL.vercel.app',
      },
      {
        source: '/booking/:path*',
        destination: 'https://YOUR-BOOKING-URL.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig
