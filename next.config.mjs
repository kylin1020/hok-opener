/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pvp/:path*',
        destination: 'https://pvp.qq.com/:path*'
      }
    ]
  }
};

export default nextConfig;
