import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { SidebarProvider } from "~/components/ui/sidebar";
import { SIDEBAR_WIDTH } from "~/components/ui/sidebar"
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <SidebarProvider>
            <Sidebar/>
            <Header/>
            <main className="mt-16">
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
