/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-sin2-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-sin6-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
};


export default nextConfig;
