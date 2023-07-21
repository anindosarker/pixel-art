/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssikazrywogwlervpmgv.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
