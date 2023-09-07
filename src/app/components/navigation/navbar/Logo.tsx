"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="하루쓰기 홈으로 이동하기"
          width="40"
          height="40"
        />
        <h1>하루쓰기</h1>
      </Link>
    </>
  );
}
