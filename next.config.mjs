/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pepperhouse.hu",
        pathname: "/wp-content/uploads/2022/03/cropped-pepper_logo2.png"
      }
    ]
  }
};

export default nextConfig;
