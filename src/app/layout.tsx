import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk, Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Inter as a substitute for Suisse Int'l (similar characteristics)
const inter = Inter({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Space Grotesk for body text
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Oswald for neo-brutalist theme - bold, condensed, aggressive
const oswald = Oswald({
  variable: "--font-brutalist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prem R - Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Prem R - A passionate 3rd-year engineering student specializing in AI/ML, full-stack development, and innovative solutions.",
  keywords: ["Prem R", "Full Stack Developer", "AI/ML", "React", "Next.js", "Python", "Portfolio"],
  authors: [{ name: "Prem R" }],
  creator: "Prem R",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premr.dev",
    title: "Prem R - Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Prem R - A passionate 3rd-year engineering student specializing in AI/ML, full-stack development, and innovative solutions.",
    siteName: "Prem R Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem R - Full Stack Developer & AI Enthusiast",
    description: "Portfolio of Prem R - A passionate 3rd-year engineering student specializing in AI/ML, full-stack development, and innovative solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} ${oswald.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
