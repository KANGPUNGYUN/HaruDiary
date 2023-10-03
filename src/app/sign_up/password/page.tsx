import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | 비밀번호 재설정",
  description: "당신의 하루를 작성하세요",
};

export default function Password() {
  return (
    <>
      <div className="p-password-update-main__outter">
        <main className="p-password-update-main">
          <div className="p-password-update-description">
            가입한 이메일 주소를 입력해주세요.
          </div>
          <div className="p-password-update-input__outer">
            <input
              className="p-password-update-input"
              type="email"
              name="email"
              placeholder="이메일"
            />
            <button className="p-password-update-input-button" disabled>
              확인
            </button>
          </div>
          <button className="p-password-update-check-button" disabled>
            이메일로 인증코드 받기
          </button>
        </main>
      </div>
    </>
  );
}
