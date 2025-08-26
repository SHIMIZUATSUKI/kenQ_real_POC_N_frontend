/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    middlewareSourceMaps: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AZURE_API_URL: process.env.NEXT_PUBLIC_AZURE_API_URL,
  },
}

export default nextConfig;
