"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Button() {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user) {
    return (
      <>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signIn()}>로그인</button>
      </>
    );
  }
}
