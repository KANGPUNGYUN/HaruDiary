import { Metadata } from "next";
import UpdatePasswordForm from "./updatePasswordForm";

export const metadata: Metadata = {
  title: "하루쓰기 | 비밀번호 재설정",
  description: "당신의 하루를 작성하세요",
};

export default function Password() {
  return (
    <>
      <div className="p-password-update-main__outter">
        <main className="p-password-update-main">
          <UpdatePasswordForm />
        </main>
      </div>
    </>
  );
}
