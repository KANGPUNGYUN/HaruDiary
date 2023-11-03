import { Metadata } from "next";
import Diary from "../../../components/Diary";
import BackButton from "@/app/components/backbutton";

export const metadata: Metadata = {
  title: "하루쓰기 | 나의 하루",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.png", width: 800, height: 400 }],
    type: "website",
  },
};

export default function MyDiary() {
  return (
    <>
      <main className="p-diary-main">
        <div className="p-diary-main__inner">
          <BackButton />
          <Diary />
        </div>
      </main>
    </>
  );
}
