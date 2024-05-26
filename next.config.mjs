/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
