import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const isVendorOnboarding = process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";

  return {
    name: isVendorOnboarding ? "Zeaper Vendor Onboarding" : "Zeaper",
    short_name: isVendorOnboarding ? "Vendor Onboarding" : "Zeaper",
    description:
      "Discover the latest fashion trends and styles at Zeaper Fashion. Shop now for exclusive collections and deals.",
    start_url: isVendorOnboarding ? "/vendor-onboarding" : "/",
    display: "standalone",
    background_color: "#133522",
    theme_color: "#133522",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  };
}
