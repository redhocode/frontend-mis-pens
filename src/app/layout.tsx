import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import { SidebarDesktop } from "@/components/sidebar/sidebar-desktop";
import Hero from "@/components/hero/hero";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] });
import Providers from "@/components/providers";
import Footer from "@/components/footer/footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from '@next/third-parties/google'
export const metadata: Metadata = {
  metadataBase: new URL("https://pjj.pens.ac.id"),
icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/public/images/pens.png',
        href: '/public/images/pens.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/public/images/pens.png',
        href: '/public/images/pens.png',
      },
    ],
  },
  title: "D3 PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
  description: "SIM PJJ Teknik Informatika - Politeknik Elektro Negeri Surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="shortcut icon" href="/shortcut-icon.png" />
<link rel="icon" href="/images/pens.svg" />
<link rel="/image/png" href="/images/pens.png" />


<script async src="https://www.googletagmanager.com/gtag/js?id=G-FSYRLCVKQ5"></script>


      </head>

   <body className={`${inter.className}`}>
  
        <main className="">
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Providers>
        {/* <Navbar /> */}
            {children}
             <GoogleTagManager gtmId="G-FSYRLCVKQ5" /> // METRIC ID
             <GoogleAnalytics gaId="G-FSYRLCVKQ5" />
          </Providers>
          </ThemeProvider>
         <Toaster />
        </main>
        
        </body>
    </html>
  );
}
