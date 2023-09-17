import Link from "next/link";
import Logo from "../components/navigation/navbar/Logo";
import SnsSignIn from "../components/sns_sign_in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | Sign In",
  description: "당신의 하루를 작성하세요",
};

export default function SignIn() {
  return (
    <>
      <div className="p-signin-main__outer">
        <main className="p-signin-main">
          <div className="p-signin-container">
            <div className="p-signin-container__inner">
              <div className="p-signin-container-logo">
                <Logo />
              </div>
              <form className="p-signin-form">
                <div className="p-signin-form-input__outer">
                  <input
                    className="p-signin-form-input-id"
                    type="text"
                    name="username"
                    placeholder="이메일"
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="p-signin-form-input__outer">
                  <input
                    className="p-signin-form-input-pw"
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <button className="p-signin-form-input-login" type="submit">
                  로그인
                </button>
                <section className="p-signin-form__section">
                  <Link href="/">비밀번호 재설정</Link>
                  <Link href="/sign_up">회원가입</Link>
                </section>
              </form>
              <section className="p-signin-sns-signin">
                <SnsSignIn />
              </section>
            </div>
          </div>
          <footer>
            <div
              className="p-footer__copyright"
              style={{
                fontSize: "10px",
                width: "100%",
                color: "#757575",
                lineHeight: "20px",
                margin: "-5px 0 25px",
                textAlign: "center",
              }}
            >
              Copyright 2023. KANGPUNGYUN. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
