"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../../common/Button/Button";

function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <Button variant="primary" width="82px" onClick={() => signOut()}>
          로그아웃
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button variant="primary" width="82px" onClick={() => signIn()}>
          로그인
        </Button>
      </>
    );
  }
}

export default React.memo(SigninButton);
