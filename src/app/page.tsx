import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | Home",
  description: "당신의 하루를 작성하세요",
};

export default function Home() {
  return (
    <main>
      <h2>메인 페이지입니다!</h2>
    </main>
  );
}
