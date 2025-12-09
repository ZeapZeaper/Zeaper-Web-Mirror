import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// @ts-expect-error: next-pwa/cache does not have TypeScript types
import runtimeCaching from "next-pwa/cache";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development", // Optional: disable PWA in dev
});

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Cache all videos in /public/videos for 1 year
        source: "/videos/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "images.unsplash.com",
      "flowbite.s3.amazonaws.com",
      "www.shutterstock.com",
      "i.etsystatic.com",
      "images.squarespace-cdn.com",
      "cdn-koibn.nitrocdn.com",
      "danddclothing.com",
      "iwearafrican.storage.googleapis.com",
      "www.fashiongonerogue.com",
      "cdn.shopify.com",
      "africantraditionalhair.com",
      "cdn.sanity.io",
      "static.vecteezy.com",
      "i.pinimg.com",
      "t4.ftcdn.net",
      "img.freepik.com",
      "i8.amplience.net",
      "v.ftcdn.net",
      "media.istockphoto.com",
      "cdn-img.prettylittlething.com",
      "www.skinnydiplondon.com",
      "assets.digitalcontent.marksandspencer.app",
      "media.theeverygirl.com",
      "admin.zeaper.com",
      "zeaper.com",
      "zeap.netlify.app",
    ],
    minimumCacheTTL: 1500000,
  },
  compiler: {
    removeConsole: false,
  },
};

// ✅ Correct: wrap AFTER defining config
//@ts-expect-error: withPWA does not have TypeScript types
export default withPWA(nextConfig);
