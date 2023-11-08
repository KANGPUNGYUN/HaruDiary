import Link from "next/link";
import { Metadata } from "next";
import { GowunBatang } from "@/app/styles/font";

export const metadata: Metadata = {
  title: "하루쓰기 | Not Found",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.webp", width: 800, height: 400 }],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <>
      <main className="p-notfound-main">
        <h2 className={`p-notfound-main-title ${GowunBatang.className}`}>
          Error : 404 Not Found
        </h2>
        <div className={`p-notfound-main-description ${GowunBatang.className}`}>
          <p>요청한 페이지를 찾을 수 없습니다.</p>
          <p>불편을 드려 죄송합니다.</p>
        </div>
        <Link href="/" className="p-notfound-main-button">
          홈으로 이동
        </Link>
      </main>
    </>
  );
}
