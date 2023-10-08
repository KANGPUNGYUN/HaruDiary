import { Metadata } from "next";
import DiaryList from "./diary_list";

export const metadata: Metadata = {
  title: "하루쓰기 | 나의 하루",
  description: "당신의 하루를 작성하세요",
};

export default function MyDiaryList() {
  return (
    <>
      <main className="p-diary-main">
        <div className="p-diary-main__inner">
          <h2 className="p-diary-title">나의 하루</h2>
          <DiaryList />
        </div>
      </main>
    </>
  );
}
