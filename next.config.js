/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rnbpqzgggbpestfeowcl.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
