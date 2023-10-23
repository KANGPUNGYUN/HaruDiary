import { Metadata } from "next";
import Link from "next/link";
import Logo from "../components/navigation/navbar/Logo";
import SnsSignIn from "../components/sns_sign_in";
import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "하루쓰기 | 회원가입",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.png", width: 800, height: 400 }],
    type: "website",
  },
};

export default function SignUp() {
  return (
    <>
      <div className="p-signup-main__outer">
        <main className="p-signup-main">
          <Logo />
          <h2 className="p-signup-h2">회원가입</h2>
          <SnsSignIn />
          <SignUpForm />
          <p className="p-signup-signin-link">
            이미 아이디가 있으신가요? <Link href="/sign_in">로그인</Link>
          </p>
        </main>
      </div>
    </>
  );
}
