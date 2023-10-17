import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "하루쓰기 | About",
  description: "당신의 하루를 작성하세요",
};

export default function About() {
  return (
    <>
      <main className="p-about-main__outer">
        <div className="p-about-main">
          <Image
            src="/logo.svg"
            width="150"
            height="150"
            alt="하루쓰기 메인로고"
          />
          <section className="p-about-description">
            <h3 className="p-about-description-title">
              하루쓰기는 포토폴리오 목적을 위한 일기 웹서비스입니다.
            </h3>
            <ul className="p-about-description-list">
              <li className="p-about-description-item">
                <h5 className="p-about-description-item-type">주요 기능</h5>
                <h5 className="p-about-description-item-type-skills">
                  일기 작성/조회/수정/삭제하기, 일기 비공개/좋아요/신고하기,
                  회원 닉네임 검색하기
                </h5>
              </li>
              <li className="p-about-description-item">
                <h5 className="p-about-description-item-type">Frontend</h5>
                <h5 className="p-about-description-item-type-skills">
                  Next.js, TypeScript
                </h5>
              </li>
              <li className="p-about-description-item">
                <h5 className="p-about-description-item-type">Backend</h5>
                <h5 className="p-about-description-item-type-skills">
                  next-auth
                </h5>
              </li>
              <li className="p-about-description-item">
                <h5 className="p-about-description-item-type">Database</h5>
                <h5 className="p-about-description-item-type-skills">prisma</h5>
              </li>
              <li className="p-about-description-item">
                <h5 className="p-about-description-item-type">Deployment</h5>
                <h5 className="p-about-description-item-type-skills">Vercel</h5>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
