import Link from "next/link";
import Button from "../components/navigation/navbar/Button";
import Logo from "../components/navigation/navbar/Logo";
import Image from "next/image";

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
                <div className="p-signin-form-input-login">
                  <Button />
                </div>

                <section className="p-signin-form__section">
                  <Link href="/">비밀번호 재설정</Link>
                  <Link href="/">회원가입</Link>
                </section>
              </form>
              <section className="p-signin-sns-signin">
                <div className="p-signin-sns-signin__text">
                  SNS계정으로 간편 로그인/회원가입
                </div>
                <button
                  className="p-signin-sns-signin-button"
                  style={{ backgroundColor: "#fee500" }}
                >
                  <Image
                    src="/kakao_logo.svg"
                    alt="하루쓰기 홈으로 이동하기"
                    width="25"
                    height="23"
                  />
                </button>
                <button
                  className="p-signin-sns-signin-button"
                  style={{ backgroundColor: "#03c75a" }}
                >
                  <Image
                    src="/naver_logo.svg"
                    alt="하루쓰기 홈으로 이동하기"
                    width="48"
                    height="48"
                  />
                </button>
                <button
                  className="p-signin-sns-signin-button"
                  style={{ backgroundColor: "var(--white)" }}
                >
                  <Image
                    src="/google_logo.svg"
                    alt="하루쓰기 홈으로 이동하기"
                    width="64"
                    height="64"
                  />
                </button>
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
