import { Metadata } from "next";
import DiaryList from "./diary_list";

export const metadata: Metadata = {
  title: "하루쓰기 | 나의 하루",
  description: "당신의 하루를 작성하세요",
};

export default function MyDiaryList() {
  return (
    <>
      <main className="p-diary-list-main">
        <div className="p-diary-list-main__inner">
          <DiaryList />
        </div>
      </main>
    </>
  );
}
