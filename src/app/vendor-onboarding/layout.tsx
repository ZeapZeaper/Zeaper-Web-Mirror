import { AuthProvider } from "@/contexts/authContext";
import FlowBiteTheme from "@/contexts/FlowBiteTheme";
import { ThemeProvider } from "@/contexts/themeContext";
import { WebSocketProvider } from "@/contexts/webSocketContext";
import StoreProvider from "@/redux/store/StoreProvider";

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
              <div className="relative w-full min-h-screen bg-[#133522] text-white">
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                {/* Content container */}
                <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
                  {children}
                </div>
              </div>
            </FlowBiteTheme>
          </ThemeProvider>
        </AuthProvider>
      </StoreProvider>
    </WebSocketProvider>
  );
}
