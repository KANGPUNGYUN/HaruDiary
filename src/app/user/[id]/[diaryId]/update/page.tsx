import { Metadata } from "next";
import UpdateForm from "./UpdateForm";

export const metadata: Metadata = {
  title: "하루쓰기 | 나의 하루 수정하기",
  description: "당신의 하루를 작성하세요",
};

export default function MyDiaryUpdate() {
  return (
    <>
      <main className="p-diary-main">
        <div className="p-diary-main__inner">
          <UpdateForm />
        </div>
      </main>
    </>
  );
}
