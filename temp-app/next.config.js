/** @type {import('next').NextConfig} */
// Vercel deployment configuration
const nextConfig = {
  // Remove 'output: export' for Vercel deployment (supports dynamic features)
  images: {
    domains: ['supabase.co', 'your-supabase-project.supabase.co', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // No basePath needed for Vercel (uses root domain)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig
