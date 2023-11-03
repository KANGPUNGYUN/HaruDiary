import { Metadata } from "next";
import Profile from "../components/Profile";

export const metadata: Metadata = {
  title: "하루쓰기 | 마이페이지",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.png", width: 800, height: 400 }],
    type: "website",
  },
};

export default function MyPage() {
  return (
    <>
      <div className="p-mypage-main__outer">
        <div className="p-mypage-main">
          <Profile />
        </div>
      </div>
    </>
  );
}
