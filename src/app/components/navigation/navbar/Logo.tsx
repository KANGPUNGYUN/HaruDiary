"use client";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href="/" className="p-navbar__logo">
        <Image
          src="/logo.webp"
          alt="하루쓰기 홈으로 이동하기"
          width="40"
          height="40"
          priority={true}
        />
        <h1 className="p-navbar__logo__text">하루쓰기</h1>
      </Link>
    </>
  );
}
