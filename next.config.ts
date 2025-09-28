import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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

export default nextConfig;
