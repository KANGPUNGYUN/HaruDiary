import Logo from "@/app/components/navigation/navbar/Logo";
import { Metadata } from "next";
import Link from "next/link";
import Confetti from "./confetti";

export const metadata: Metadata = {
  title: "하루쓰기 | 회원가입 성공",
  description: "당신의 하루를 작성하세요",
};

export default function Success() {
  return (
    <>
      <Confetti />
      <div className="p-signup-main__outer">
        <main className="p-signup-main">
          <Logo />
          <h2 className="p-signup-h2">환영합니다!</h2>
          <div className="p-signup-success-text">
            정상적으로 회원가입 되었습니다.
            <br />
            많은 회원들이 당신의 하루를 기다리고 있어요!
            <br />
            지금 로그인하여 당신의 하루를 공유해보세요.
          </div>
          <Link href="/sign_in" className="p-signup-form-submit-button">
            로그인하러 가기
          </Link>
        </main>
      </div>
    </>
  );
}
