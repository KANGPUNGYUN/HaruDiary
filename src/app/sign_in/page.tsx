import Link from "next/link";
import Button from "../components/navigation/navbar/Button";
import Logo from "../components/navigation/navbar/Logo";

export default function SignIn() {
  return (
    <>
      <main className="p-signin-main">
        <div className="p-signin-container">
          <div className="p-signin-container__inner">
            <div className="p-signin-container-logo">
              <Logo />
            </div>
            <form className="p-signin-form">
              <div className="p-signin-form-input-outer">
                <input
                  className="p-signin-form-input-id"
                  type="text"
                  name="username"
                  placeholder="이메일"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="p-signin-form-input-outer">
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
          </div>
        </div>
        <footer>
          <div className="p-footer__copyright" style={{ fontSize: "10px" }}>
            Copyright 2023. KANGPUNGYUN. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
