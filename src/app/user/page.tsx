import { Metadata } from "next";
import UserList from "./user_list";

export const metadata: Metadata = {
  title: "하루쓰기 | 모두의 하루",
  description: "당신의 하루를 작성하세요",
};

export default function User() {
  return (
    <>
      <div className="p-user-main__outer">
        <main className="p-user-main">
          <UserList />
        </main>
      </div>
    </>
  );
}
