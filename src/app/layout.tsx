"use client";
import "./reset.css";
import "./globals.css";
import Navigation from "./components/navigation";
import Head from "next/head";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";
import Providers from "./components/Providers";

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
        <Providers>
          {pathname !== "/sign_in" &&
            pathname !== "/sign_up" &&
            pathname !== "/sign_up/success" && <Navigation />}
          {children}
          {pathname !== "/sign_in" &&
            pathname !== "/sign_up" &&
            pathname !== "/sign_up/success" && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
