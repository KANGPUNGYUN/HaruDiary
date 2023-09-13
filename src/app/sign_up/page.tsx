import { Metadata } from "next";
import Logo from "../components/navigation/navbar/Logo";
import SnsSignIn from "../components/sns_sign_in";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const metadata: Metadata = {
  title: "하루쓰기 | Sign UP",
  description: "당신의 하루를 작성하세요",
};

export default function SignUp() {
  return (
    <>
      <div className="p-signup-main__outer">
        <main className="p-signup-main">
          <Logo />
          <h2 className="p-signup-h2">회원가입</h2>
          <SnsSignIn />
          <form className="p-signup-form">
            <div>
              <label className="p-signup-form-label">이메일</label>
              <div className="p-signup-form-email-input">
                <div className="p-signup-form-email-input__inner">
                  <span className="p-signup-form-email-input__local">
                    <label>
                      <input className="form-control" placeholder="이메일" />
                      <span className="form-control-blind">
                        이메일 앞 주소 입력하기
                      </span>
                    </label>
                  </span>
                  <span className="email-input__separator">@</span>
                  <span className="p-signup-form-email-input__domain">
                    <label>
                      <select className="form-control">
                        <option>선택해주세요</option>
                        <option value="naver.com">naver.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="daum.net">daum.net</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hotmail.com">hotmail.com</option>
                        <option value="_manual">직접입력</option>
                      </select>
                      <span className="form-control-blind">
                        이메일 도메인 선택하기
                      </span>
                      <button
                        className="email-input__domain__expand"
                        aria-label="초기화"
                        type="button"
                        tabIndex={-1}
                      >
                        <FontAwesomeIcon icon={faCaretDown} />
                      </button>
                    </label>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-signup-form-email-button__outer">
              <button
                className="p-signup-form-email-button"
                name="emailAuth"
                type="button"
              >
                이메일 인증하기
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
