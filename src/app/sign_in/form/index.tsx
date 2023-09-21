"use client";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../firebase/auth";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(auth);

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        console.log("로그인 성공!");
      })
      .catch((error) => {
        console.log(error);
        console.log("로그인 실패!");
      });
  };

  return (
    <>
      <form className="p-signin-form">
        <div className="p-signin-form-input__outer">
          <input
            className="p-signin-form-input-id"
            type="text"
            name="email"
            placeholder="이메일"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="p-signin-form-input-login"
          type="submit"
          onClick={submit}
          value="로그인"
        />
        <section className="p-signin-form__section">
          <Link href="/">비밀번호 재설정</Link>
          <Link href="/sign_up">회원가입</Link>
        </section>
      </form>
    </>
  );
}
