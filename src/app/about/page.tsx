import { Metadata } from "next";
import Image from "next/image";
import Accordion from "@/app/components/accordion";

const qnaList = [
  {
    question: "일기 작성에 제한이 있나요?",
    answer:
      "하루쓰기는 1일 1일기 규칙이 있습니다. 작성하고자 하는 날짜 이전의 일기를 작성할 수 없으니 참고해주세요.",
  },
  {
    question: "비회원도 다른 회원의 일기를 볼 수 있나요?",
    answer:
      "비회원도 다른 회원의 일기를 볼 수 있으나, 일기 작성/수정/삭제 기능과 다른 회원의 일기 좋아요/신고 기능은 사용할 수 없습니다.",
  },
  {
    question: "서비스를 이용하면서 원인을 알 수 없는 문제가 발생했어요.",
    answer:
      "문제에 대한 자세한 내용을 문의 이메일(zkdvnd@naver.com)로 전송해주시면, 빠른 시일 내에 해결하도록 하겠습니다.",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

export const metadata: Metadata = {
  title: "하루쓰기 | About",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.webp", width: 800, height: 400 }],
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <main className="p-about-main__outer">
        <div className="p-about-main">
          <div className="p-about-main-header">
            <Image
              src="/logo.svg"
              width="190"
              height="190"
              alt="하루쓰기 메인로고"
            />
            <section className="p-about-description">
              <h2 className="p-about-description-title">
                하루쓰기는 일기 형태의 소셜 네트워크 웹 서비스입니다.
              </h2>
              <ul className="p-about-description-list">
                <li className="p-about-description-item">
                  <h3 className="p-about-description-item-type">- 주요 기능</h3>
                  <h3 className="p-about-description-item-type-skills">
                    일기 작성/조회/수정/삭제하기, 일기 비공개/좋아요/신고하기,
                    회원 닉네임 검색하기
                  </h3>
                </li>
                <li className="p-about-description-item">
                  <h3 className="p-about-description-item-type">- Frontend</h3>
                  <h3 className="p-about-description-item-type-skills">
                    Next.js 13(App Router), TypeScript
                  </h3>
                </li>
                <li className="p-about-description-item">
                  <h3 className="p-about-description-item-type">- Backend</h3>
                  <h3 className="p-about-description-item-type-skills">
                    next-auth
                  </h3>
                </li>
                <li className="p-about-description-item">
                  <h3 className="p-about-description-item-type">- Database</h3>
                  <h3 className="p-about-description-item-type-skills">
                    prisma
                  </h3>
                </li>
                <li className="p-about-description-item">
                  <h3 className="p-about-description-item-type">
                    - Deployment
                  </h3>
                  <h3 className="p-about-description-item-type-skills">
                    Vercel
                  </h3>
                </li>
              </ul>
            </section>
          </div>
          <div className="p-about-main-FAQ">
            <h2 className="p-about-main-FAQ-title">FAQ</h2>
            <ol className="p-about-main-FAQ-list">
              {qnaList.map((v: FAQ, i) => {
                return (
                  <Accordion key={i} question={v.question} answer={v.answer} />
                );
              })}
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}
