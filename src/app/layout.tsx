import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import { SidebarDesktop } from "@/components/sidebar/sidebar-desktop";
import Hero from "@/components/hero/hero";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import Providers from "@/components/providers";
import Footer from "@/components/footer/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
declare let dataLayer: any[];

export const metadata: Metadata = {
  metadataBase: new URL("https://pjj.pens.ac.id"),
  icons: {
    icon: "/images/pens.png",

  },
  title: "D3 PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
  description:
    "SIM PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" sizes="16x16" href="/images/pens.png" />
        <link rel="icon" sizes="32x32" href="/images/pens.png" />
        <link
          rel="pens"
          sizes="180x180"
          href="/images/pens.png"
        />
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FSYRLCVKQ5"
        ></Script>

        <Script>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FSYRLCVKQ5');
  
  `}
        </Script>
      </Head>

      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <main className="bg-slate-100 dark:bg-zinc-900 min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              {/* <Navbar /> */}
              {children}
              {/* <GoogleTagManager gtmId="G-FSYRLCVKQ5" /> // METRIC ID */}
              <GoogleAnalytics gaId="G-FSYRLCVKQ5" />
              <SpeedInsights />
            </Providers>
          </ThemeProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
