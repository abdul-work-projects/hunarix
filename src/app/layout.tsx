import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hunarix - AI Document Processing Platform",
  description: "Hunarix is an intelligent document processing platform that leverages AI to automate extraction, analysis, and management of business documents at scale.",
  keywords: ["AI", "document processing", "automation", "machine learning", "OCR", "data extraction"],
  authors: [{ name: "Hunarix" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Hunarix - AI Document Processing Platform",
    description: "Intelligent document processing platform powered by AI for automated extraction and analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
