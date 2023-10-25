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
            onClick={async () => {
              const signInKakao = {
                redirect: true,
                callbackUrl: "/",
              };
              await signIn("kakao", signInKakao);
            }}
          >
            <Image
              src="./kakao_logo.svg"
              alt="카카오로 간편 로그인하기"
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
            onClick={async () => {
              const signInNaver = {
                redirect: true,
                callbackUrl: "/",
              };
              await signIn("naver", signInNaver);
            }}
          >
            <Image
              src="./naver_logo.svg"
              alt="네이버로 간편 로그인하기"
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
            onClick={async () => {
              const signInGoogle = {
                redirect: true,
                callbackUrl: "/",
              };
              await signIn("google", signInGoogle);
            }}
          >
            <Image
              src="./google_logo.svg"
              alt="구글로 간편 로그인하기"
              width="64"
              height="64"
            />
          </button>
        </li>
      </ul>
    </>
  );
}
