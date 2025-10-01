import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import DisplayChildren from "./DisplayChildren";
import StoreProvider from "@/redux/store/StoreProvider";
import Loading from "./Loader";

const getBodoniFont = Bodoni_Moda({
  variable: "--font-bodoni",
  weight: ["900", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeaper Fashion",
  description:
    "Discover the latest fashion trends and styles at Zeaper Fashion. Shop now for exclusive collections and deals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NEXT_PUBLIC_ENV === "prod";

  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#000000" />
          {isProd && (
            <>
              <meta
                name="description"
                content="Discover the latest fashion trends and styles at Zeaper Fashion. Shop now for exclusive collections and deals."
              />
              <meta
                name="keywords"
                content="fashion, clothing, trends, style"
              />
              <meta name="author" content="Zeaper Fashion" />
              <meta property="og:title" content="Zeaper Fashion" />
              <meta
                property="og:description"
                content="Discover the latest fashion trends and styles at Zeaper Fashion. Shop now for exclusive collections and deals."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://zeaperfashion.com" />
              <meta property="og:image" content="/og-image.jpg" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Zeaper Fashion" />
              <meta
                name="twitter:description"
                content="Discover the latest fashion trends and styles at Zeaper Fashion. Shop now for exclusive collections and deals."
              />
              <meta name="twitter:image" content="/og-image.jpg" />
            </>
          )}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </head>
        <body className={` ${getBodoniFont.variable} antialiased h-full`}>
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col min-h-screen">
              <DisplayChildren>{children}</DisplayChildren>
            </div>
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
