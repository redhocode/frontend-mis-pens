/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: `http`,
        hostname: `localhost`,
        port: `2000`,
        pathname: `/uploads/**`,
      },
    ],
  },
};

export default nextConfig;
