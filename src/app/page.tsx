import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "하루쓰기 | Home",
  description: "당신의 하루를 작성하세요",
};

export default function Home() {
  return (
    <main>
      <section className="p-home-section section1">
        <div className="p-home-section-slider__outer1">
          <div className="p-home-section-slider-text__outer1 textSlideUp">
            <p className="p-home-section-slider-text">
              당신의 하루를 적어보아요
            </p>
          </div>
          <div className="p-home-section-img__outer fadein">
            <Image
              className="p-home-section-img"
              src="/section_1.png"
              alt="메인 이미지"
              sizes="100%"
              fill
              priority
            />
          </div>
        </div>
        <div className="p-home-section-slider__outer2">
          <div className="p-home-section-img__outer fadein">
            <Image
              className="p-home-section-img"
              src="/section_2.png"
              alt="메인 이미지"
              sizes="100%"
              fill
              priority
            />
          </div>
          <div className="p-home-section-slider-text__outer2 textSlideUp">
            <p className="p-home-section-slider-text">
              늘 당신의 하루를 응원합니다
            </p>
          </div>
        </div>
      </section>
      <div className="blank-splace"></div>
      <section className="p-home-section section2"></section>
    </main>
  );
}
