import { AuthProvider } from "@/contexts/authContext";
import FlowBiteTheme from "@/contexts/FlowBiteTheme";
import { ThemeProvider } from "@/contexts/themeContext";
import { WebSocketProvider } from "@/contexts/webSocketContext";
import StoreProvider from "@/redux/store/StoreProvider";
import Loading from "../Loader";
import { Suspense } from "react";
import { Bodoni_Moda } from "next/font/google";
import NotificationProvider from "@/shared/Notification";

const getBodoniFont = Bodoni_Moda({
  variable: "--font-bodoni",
  weight: ["900", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function VendorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <meta name="theme-color" content="#000000" />

                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
                      <div className=" w-full min-h-screen bg-[#133522] text-white">
                        {/* Background overlay */}
                        <div className="absolute inset-0 bg-black/60 "></div>

                        <div className="flex flex-col   text-center z-10 overflow-hidden ">
                          {children}
                        </div>
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
}
