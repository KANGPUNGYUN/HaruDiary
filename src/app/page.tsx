import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "하루쓰기",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.webp", width: 800, height: 400 }],
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <meta
        name="naver-site-verification"
        content="0fc0efcb926dc4118a917eeef06099c48d49a4fc"
      />
      <meta
        name="google-site-verification"
        content="cHTy20JNIadsj7DMtxa2d5dHarTPhGW2tTv9UO7UEu8"
      />
      <main>
        <section className="p-home-section section1">
          <div className="p-home-section-slider__outer1">
            <div className="p-home-section-slider-text__outer1 textSlideUp">
              <p className="p-home-section-slider-text">
                당신의 <span className="text-blue">하루</span>를 작성하세요
              </p>
            </div>
            <div className="p-home-section-img__outer fadein">
              <Image
                className="p-home-section-img first-image"
                src="/section_1.webp"
                alt="메인 이미지"
                sizes="100%"
                style={{ right: "0", left: "auto" }}
                fill
                priority
              />
            </div>
          </div>
          <div className="p-home-section-slider__outer2">
            <div className="p-home-section-img__outer fadein">
              <Image
                className="p-home-section-img"
                src="/section_2.webp"
                alt="메인 이미지"
                sizes="100%"
                fill
                priority
              />
            </div>
            <div className="p-home-section-slider-text__outer2 textSlideUp">
              <p className="p-home-section-slider-text">
                늘 당신의 <span className="text-blue">하루</span>를 응원합니다
              </p>
            </div>
          </div>
        </section>
        <div className="blank-splace"></div>
        <section className="p-home-section section2">
          <div className="p-home-section2-text__outer">
            <div className="p-home-section2-title__outer">
              <h2 className="p-home-section2-title">함께해요</h2>
            </div>
            <div className="p-home-section2-description__outer-margin-top">
              <div className="p-home-section2-description__outer">
                <p className="p-home-section2-description">
                  당신의 소중한 하루를 잊지 않도록 하루쓰기가 돕겠습니다.
                </p>
              </div>
            </div>
            <div className="p-home-section2-signup-button__outer">
              <Link
                href="/sign_in"
                className="p-signup-form-submit-button section2-signup-button"
              >
                로그인하러 가기
              </Link>
            </div>
          </div>
          <div className="p-home-section2-phone">
            <div className="p-home-section2-img__outer">
              <div className="p-home-section2-img-frame"></div>
              <div className="p-home-section2-img-monitor">
                <Image
                  className="p-home-section2-img"
                  src="/screenshot.webp"
                  alt="메인 이미지"
                  sizes="100%"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <div className="blank-splace"></div>
      </main>
    </>
  );
}
