import Link from "next/link";
import Logo from "./components/navigation/navbar/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | Not Found",
  description: "당신의 하루를 작성하세요",
};

export default function NotFound() {
  return (
    <>
      <main className="p-notfound-main">
        <h2 className="p-notfound-main-title">Error : 404 Not Found</h2>
        <p className="p-notfound-main-description">
          요청한 페이지를 찾을 수 없습니다.
        </p>
        <p className="p-notfound-main-description">불편을 드려 죄송합니다.</p>
        <Link href="/" className="p-notfound-main-button">
          홈으로 이동
        </Link>
      </main>
    </>
  );
}
