import { Metadata } from "next";
import UserList from "./user_list";

export const metadata: Metadata = {
  title: "하루쓰기 | 모두의 하루",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.png", width: 800, height: 400 }],
    type: "website",
  },
};

export default function User() {
  return (
    <>
      <div className="p-user-main__outer">
        <main className="p-user-main">
          <UserList />
        </main>
      </div>
    </>
  );
}
