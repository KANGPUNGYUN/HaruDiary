import { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루쓰기 | 개인정보 처리방침",
  description: "당신의 하루를 작성하세요",
  openGraph: {
    title: "하루쓰기",
    description: "NextJS 기반 웹 일기 서비스",
    siteName: "하루쓰기",
    images: [{ url: "/opengraph_image.png", width: 800, height: 400 }],
    type: "website",
  },
};

export default function Privacy() {
  return (
    <>
      <main className="p-privacy-main">
        <div className="p-privacy-main__inner">
          <p>
            <strong>
              수집하는 개인정보 항목 / 수집 및 이용목적 / 보유 및 이용기간
            </strong>
          </p>
          <table>
            <thead>
              <tr>
                <th>수집방법</th>
                <th>수집항목</th>
                <th>수집 및 이용목적</th>
                <th>보유 및 이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원가입</td>
                <td>(필수)닉네임, 이메일 주소, 비밀번호</td>
                <td>서비스 이용 및 서비스 개선을 위한 분석 등</td>
                <td rowSpan={2}>
                  <h3>회원탈퇴 및 목적달성 후 지체없이 삭제합니다.</h3>
                  <p>
                    단, 부정이용 방지를 위하여 회원탈퇴 후에도 입력한 정보는
                    3개월 동안 보관합니다.
                  </p>
                </td>
              </tr>
              <tr>
                <td>서비스 이용 과정에서 생성</td>
                <td>서비스 이용기록, 접속 로그, IP, 쿠키</td>
                <td>
                  이상행위 탐지 및 서비스 개선을 위한 분석, 이용자의 관심, 기호,
                  성향 추정을 통한 맞춤형 콘텐츠 및 서비스 제공
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <span>
              <br />
              단, 부정이용 방지를 위하여 회원탈퇴 후에도 입력한 정보는 3개월
              동안 보관합니다.
            </span>
          </p>
          <table>
            <thead>
              <tr>
                <th>법령</th>
                <th>항목</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>통신비밀보호법</td>
                <td>서비스 이용 관련 개인정보(로그기록)</td>
                <td>3개월</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>
              <br />
              동의를 거부할 권리 및 거부 경우의 불이익
            </strong>
            <span>
              <br />
            </span>
            <span>
              <br />
              귀하께서는 하루쓰기가 위와 같이 수집하는 개인정보에 대해 동의하지
              않거나 개인정보를 기재하지 않음으로써 거부할 수 있습니다. 다만,
              이때 회원에게 제공되는 서비스가 제한될 수 있습니다.
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
