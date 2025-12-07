import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Music } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Audio Generation System",
  description: "Systematic AI-assisted audio generation workflow prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <Music className="h-6 w-6 text-purple-600" />
                <span>AI Audio Generation System</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/analytics"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
