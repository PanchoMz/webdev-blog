/**
 * Root Layout Component
 *
 * This is the main layout component that wraps all pages in the application.
 * It provides:
 * - Font configuration (Poppins)
 * - Theme provider for dark/light mode
 * - Session provider for authentication
 * - Navigation bar
 * - Basic page structure and styling
 *
 * @fileoverview Root layout with theme, session, and navigation
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/layout/NavBar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

/**
 * Configure Poppins font with specific weights for the application
 * This font will be used throughout the application for consistent typography
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Metadata configuration for SEO and browser display
 * Defines the title, description, and icons for the application
 */
export const metadata: Metadata = {
  title: "WebDevBlog",
  description: "Your favorite blog for web development",
  icons: {
    icon: "/logo.svg",
  },
};

/**
 * Root layout component that wraps all pages
 * Provides theme support, navigation, and basic page structure
 *
 * @param children - React components to be rendered inside the layout
 * @returns JSX.Element - The complete layout with providers and navigation
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get current session for authentication
  const session = await auth();

  return (
    <SessionProvider session={session}>
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
            {/* Navigation bar component */}
            <NavBar />

            {/* Main content area with flex-grow to fill available space */}
            <main className="flex-grow pt-16">{children}</main>

            {/* Footer component (placeholder) */}
            <footer>...</footer>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
