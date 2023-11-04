import DiaryForm from "../../components/DiaryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | 일기 작성하기",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.webp", width: 800, height: 400 }],
    type: "website",
  },
};

export default function write() {
  return (
    <>
      <main className="p-diary-main">
        <div className="p-diary-main__inner">
          <DiaryForm />
        </div>
      </main>
    </>
  );
}
