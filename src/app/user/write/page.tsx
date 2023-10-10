import Form from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | 일기 작성하기",
  description: "당신의 하루를 작성하세요",
};

export default function write() {
  return (
    <>
      <main className="p-diary-main">
        <div className="p-diary-main__inner">
          <Form />
        </div>
      </main>
    </>
  );
}
