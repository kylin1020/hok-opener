"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <main className="flex-1">
            {children}
          </main>
        </Providers>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
