/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "http://127.0.0.1:8080/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
