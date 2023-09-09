import "./reset.css";
import "./globals.css";
import type { Metadata } from "next";
import Navigation from "./components/navigation";
import Head from "next/head";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "하루쓰기 | Home",
  description: "당신의 하루를 작성하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
