import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import Header from "~/components/header/Header";
import Sidebar from "~/components/sidebar";
import ThemeProvider from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Movie App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable}`}>
      <body className="h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar/>
            <div className="flex flex-col flex-1 min-w-0">
              <Header className="flex items-center" />
              <main className="flex-1 mt-16 p-4 overflow-y-auto">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
