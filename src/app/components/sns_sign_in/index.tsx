"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SnsSignIn() {
  return (
    <>
      <div className="p-signin-sns-signin__text">
        SNS계정으로 간편 로그인/회원가입
      </div>
      <ul className="p-signin-sns-list">
        <li
          className="p-signin-sns-list-item"
          style={{ backgroundColor: "#fee500" }}
        >
          <button
            onClick={() => {
              async function handleKakao() {
                await signIn("kakao", {
                  redirect: true,
                  callbackUrl: "/",
                });
              }
              handleKakao();
            }}
          >
            <Image
              src="/kakao_logo.svg"
              alt="하루쓰기 홈으로 이동하기"
              width="25"
              height="23"
            />
          </button>
        </li>
        <li
          className="p-signin-sns-list-item"
          style={{ backgroundColor: "#03c75a" }}
        >
          <button
            onClick={() => {
              async function handleNaver() {
                await signIn("naver", {
                  redirect: true,
                  callbackUrl: "/",
                });
              }
              handleNaver();
            }}
          >
            <Image
              src="/naver_logo.svg"
              alt="하루쓰기 홈으로 이동하기"
              width="48"
              height="48"
            />
          </button>
        </li>
        <li
          className="p-signin-sns-list-item"
          style={{ backgroundColor: "var(--white)" }}
        >
          <button
            onClick={() => {
              async function handleGoogle() {
                await signIn("google", {
                  redirect: true,
                  callbackUrl: "/",
                });
              }
              handleGoogle();
            }}
          >
            <Image
              src="/google_logo.svg"
              alt="하루쓰기 홈으로 이동하기"
              width="64"
              height="64"
            />
          </button>
        </li>
      </ul>
    </>
  );
}
