"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../../common/Button/Button";

function SigninButton({ width }: { width: string }) {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <Button variant="primary" width={width} onClick={() => signOut()}>
          로그아웃
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button variant="primary" width={width} onClick={() => signIn()}>
          로그인
        </Button>
      </>
    );
  }
}

export default React.memo(SigninButton);
