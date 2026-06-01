/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     images: {
         remotePatterns: [
             {
                 protocol: 'https',
                 hostname: 'd1ds2m6k69pml3.cloudfront.net',
             },
         ],
         },
      }

module.exports = nextConfig
