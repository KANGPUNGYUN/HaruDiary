import { Metadata } from "next";
import CopyBoard from "../components/copyboard";

export const metadata: Metadata = {
  title: "하루쓰기 | Contacts",
  description: "당신의 하루를 작성하세요",
};

export default function Contacts() {
  return (
    <>
      <main className="p-contact-main">
        <div className="p-contact-main__inner">
          <div className="p-contact-title">
            문의하거나 좋은 제안을 가지고 계시다면, 아래 이메일로 연락
            부탁드립니다!
          </div>
          <div className="p-contact-email__outer">
            <div className="p-contact-email">e-mail : zkdvnd@naver.com</div>
            <CopyBoard />
          </div>
        </div>
      </main>
    </>
  );
}
