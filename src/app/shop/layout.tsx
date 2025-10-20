import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";

import { Suspense } from "react";

import StoreProvider from "@/redux/store/StoreProvider";
import { WebSocketProvider } from "@/contexts/webSocketContext";
import FlowBiteTheme from "@/contexts/FlowBiteTheme";
import { AuthProvider } from "@/contexts/authContext";
import logo from "@/images/zeap-text-logo.png";

import { ThemeProvider } from "@/contexts/themeContext";
import Loading from "../loading";

import { UserMenuBar } from "../vendor-onboarding/components/UserMenuBar";
import Image from "next/image";
import Link from "next/link";
import NotificationProvider from "@/shared/Notification";
import DropdownNotification from "@/components/Header/DropdownNotification";

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

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVendorOnboarding =
    process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";
  if (isVendorOnboarding) {
    return (
      <WebSocketProvider>
        <StoreProvider>
          <AuthProvider>
            <ThemeProvider>
              <FlowBiteTheme>
                <NotificationProvider>
                  <html lang="en">
                    <head>
                      <link rel="icon" href="/favicon.ico" />
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                      />
                      <meta name="theme-color" content="#000000" />

                      <meta name="apple-mobile-web-app-capable" content="yes" />
                      <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black-translucent"
                      />

                      <meta
                        name="apple-mobile-web-app-title"
                        content="Zeaper Fashion"
                      />
                      <link
                        rel="apple-touch-icon"
                        href="/apple-touch-icon.png"
                      />
                      <link rel="manifest" href="/manifest.json" />
                      <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                      />
                    </head>
                    <body
                      className={` ${getBodoniFont.variable} antialiased h-full`}
                    >
                      <Suspense fallback={<Loading />}>
                        <div className="flex flex-col min-h-screen">
                          <div className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-gray-900">
                            <div className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4">
                              <Link href="/vendor-onboarding">
                                <Image
                                  src={logo.src}
                                  alt="Zeap Logo"
                                  className="h-8 md:h-10"
                                  width={150}
                                  height={40}
                                />
                              </Link>
                              <div className="flex items-center gap-4 ">
                                <Link
                                  href="/shop"
                                  className="p-2 text-xs md:text-sm md:px-6 md:py-3 rounded-full bg-[#D5B07B] text-[#133522] font-bold shadow-2xl hover:bg-[#e6c28c] transition cursor-pointer"
                                >
                                  My Shop
                                </Link>

                                {/* User Menu Bar */}
                                <span className="inline-block mt-3">
                                  <DropdownNotification />
                                </span>

                                <UserMenuBar />
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow mt-8">{children}</div>
                        </div>
                      </Suspense>
                    </body>
                  </html>
                </NotificationProvider>
              </FlowBiteTheme>
            </ThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </WebSocketProvider>
    );
  } else {
    return <div className="mt-6">{children}</div>;
  }
}
