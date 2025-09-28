import type { NextConfig } from "next";
import withPWA from "next-pwa";
// @ts-expect-error: next-pwa/cache does not have TypeScript types

import runtimeCaching from "next-pwa/cache";

const nextConfig: NextConfig = {
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
    ],
    minimumCacheTTL: 1500000,
  },
  compiler: {
    removeConsole: false,
  },
};

export default withPWA({
  ...nextConfig,
    // @ts-expect-error: next-pwa types not available
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
  },
});
