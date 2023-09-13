"use client";
import "./reset.css";
import "./globals.css";
import Navigation from "./components/navigation";
import Head from "next/head";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        {pathname !== "/sign_in" && pathname !== "/sign_up" && <Navigation />}
        {children}
        {pathname !== "/sign_in" && pathname !== "/sign_up" && <Footer />}
      </body>
    </html>
  );
}
