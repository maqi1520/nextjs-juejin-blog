/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/blog/:id/edit",
        destination: `/blog/create`,
      },
      {
        source: "/blog/page/:page",
        destination: `/blog`,
      },
    ];
  },
};

module.exports = nextConfig;
