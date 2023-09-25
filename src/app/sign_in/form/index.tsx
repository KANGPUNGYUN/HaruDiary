"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

interface LoginType {
  email: string;
  password: string;
}

export default function SignInForm() {
  const methods = useForm<LoginType>({
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <>
      <form
        className="p-signin-form"
        onSubmit={handleSubmit((data) => {
          async function signin() {
            await signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: true,
              callbackUrl: "/",
            });
          }
          signin();
        })}
      >
        <div className="p-signin-form-input__outer">
          <input
            {...register("email", { required: true })}
            className="p-signin-form-input-id"
            type="email"
            name="email"
            placeholder="이메일"
            autoComplete="email"
            required
          />
        </div>
        <div className="p-signin-form-input__outer">
          <input
            {...register("password", { required: true })}
            className="p-signin-form-input-pw"
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            required
          />
        </div>
        <input
          className="p-signin-form-input-login"
          type="submit"
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
