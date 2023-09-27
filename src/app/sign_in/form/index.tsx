"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignInType {
  email: string;
  password: string;
}

export default function SignInForm() {
  const methods = useForm<SignInType>({
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const router = useRouter();
  const [signInError, setSignInError] = useState(null);

  return (
    <>
      <form
        className="p-signin-form"
        onSubmit={handleSubmit(async (data) => {
          const signInData = {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
            redirect: false,
          };
          const res: any = await signIn("credentials", signInData);

          if (res.url) {
            router.push(res?.url);
          } else {
            setSignInError(res.error);
          }
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
        <div className="p-signup-form-error-message">{signInError}</div>
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
