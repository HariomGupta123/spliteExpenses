/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: ["html-loader"],
    });

    return config;
  },
};

export default nextConfig;
