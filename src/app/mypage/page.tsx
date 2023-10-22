import { Metadata } from "next";
import Profile from "./userForm";

export const metadata: Metadata = {
  title: "하루쓰기 | 마이페이지",
  description: "당신의 하루를 작성하세요",
};

export default function MyPage() {
  return (
    <>
      <div className="p-mypage-main__outer">
        <div className="p-mypage-main">
          <Profile />
        </div>
      </div>
    </>
  );
}
