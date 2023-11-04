import { Metadata } from "next";
import PasswordUpdateForm from "../../components/PasswordUpdateForm";

export const metadata: Metadata = {
  title: "하루쓰기 | 비밀번호 재설정",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.webp", width: 800, height: 400 }],
    type: "website",
  },
};

export default function Password() {
  return (
    <>
      <div className="p-password-update-main__outter">
        <main className="p-password-update-main">
          <PasswordUpdateForm />
        </main>
      </div>
    </>
  );
}
