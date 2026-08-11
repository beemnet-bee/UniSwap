import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/site/splash-screen";
import { PageViewTracker } from "@/components/site/page-view-tracker";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UniSWAP, Keep your goods in the loop",
  description:
    "UniSWAP is a verified student marketplace for swapping, finding lost items, and giving your stuff a second life on campus. Built by students, for students.",
  keywords: [
    "UniSWAP",
    "campus marketplace",
    "student sustainability",
    "second-hand exchange",
    "college swap",
    "sustainable campus",
  ],
  authors: [{ name: "UniSWAP Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    title: "UniSWAP, Keep your goods in the loop",
    description:
      "A verified student marketplace for swapping, finding lost items, and building a more circular campus.",
    siteName: "UniSWAP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSWAP, Keep your goods in the loop",
    description:
      "A verified student marketplace for swapping, finding lost items, and building a more circular campus.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8F8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E10" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          <PageViewTracker />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
