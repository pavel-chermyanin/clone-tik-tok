/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  images: {
    
    domains: ["avatars.mds.yandex.net", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
