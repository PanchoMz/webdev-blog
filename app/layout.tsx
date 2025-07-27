import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/layout/NavBar";

// Configure Poppins font with specific weights for the application
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata configuration for SEO and browser display
export const metadata: Metadata = {
  title: "WebDevBlog",
  description: "Your favorite blog for web development",
  icons: {
    icon: "/logo.svg",
  },
};

// Root layout component that wraps all pages
// Provides theme support, navigation, and basic page structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased flex flex-col min-h-screen px-2 ",
          poppins.variable
        )}
      >
        {/* Theme provider enables dark/light mode switching */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="flex-grow pt-16">{children}</main>
          <footer>...</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
