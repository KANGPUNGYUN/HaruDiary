import { Metadata } from "next";
import Link from "next/link";
import Logo from "../components/navigation/navbar/Logo";
import SnsSignIn from "../components/sns_sign_in";
import { faCaretDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const metadata: Metadata = {
  title: "하루쓰기 | Sign Up",
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
            <div className="p-signup-form-email-input__outer">
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
                      <select className="form-control webkit-none">
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
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          width="10px"
                          height="10px"
                        />
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
                <span>이메일 인증하기</span>
              </button>
            </div>
            <div className="p-signup-form-password-input__outer">
              <label className="p-signup-form-label">비밀번호</label>
              <div className="p-signup-form-description">
                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </div>
              <label>
                <input
                  className="p-signup-form-password-input"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                />
                <span className="form-control-blind">비밀번호 입력하기</span>
              </label>
            </div>
            <div className="p-signup-form-confirm-password-input__outer">
              <label className="p-signup-form-label">비밀번호 확인</label>
              <label>
                <input
                  className="p-signup-form-confirm-password-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                />
                <span className="form-control-blind">
                  입력한 비밀번호 확인하기
                </span>
              </label>
            </div>
            <div className="p-signup-form-nickname-input__outer">
              <label className="p-signup-form-label">닉네임</label>
              <label>
                <input
                  className="p-signup-form-nickname-input"
                  name="nickname"
                  placeholder="별명 (2~15자)"
                />
                <span className="form-control-blind">닉네임 입력하기</span>
              </label>
            </div>
            <div className="p-signup-form-ToS-input__outer">
              <label className="p-signup-form-label">이용약관</label>
              <div className="p-signup-form-ToS-container">
                <div className="p-signup-form-ToS-agreeAll-label__outer">
                  <label className="p-signup-form-ToS-agreeAll-label">
                    <div className="p-signup-form-ToS-agreeAll-input__outer">
                      <div className="p-signup-form-ToS-agreeAll-checkbox">
                        <span className="p-signup-form-ToS-agreeAll-check"></span>
                      </div>
                      <input
                        className="p-signup-form-ToS-agreeAll-input"
                        type="checkbox"
                        name="agreeAll"
                      />
                    </div>
                    <span className="p-signup-form-ToS-agreeAll-title__outer">
                      <span className="p-signup-form-ToS-agreeAll-title">
                        전체동의
                      </span>
                    </span>
                  </label>
                </div>
                <hr className="p-signup-form-ToS-container-hr" />
                <div className="p-signup-form-ToS-agree1-label__outer">
                  <label className="p-signup-form-ToS-agree1-label">
                    <div className="p-signup-form-ToS-agree1-input__outer">
                      <div className="p-signup-form-ToS-agree1-checkbox">
                        <span className="p-signup-form-ToS-agree1-check"></span>
                      </div>
                      <input
                        className="p-signup-form-ToS-agree1-input"
                        type="checkbox"
                        name="agree1"
                      />
                    </div>
                    <span className="p-signup-form-ToS-agree1-title__outer">
                      <span className="p-signup-form-ToS-agree1-title">
                        만 14세 이상입니다
                      </span>
                    </span>
                  </label>
                </div>
                <div className="p-signup-form-ToS-agree2-label__outer">
                  <label className="p-signup-form-ToS-agree2-label">
                    <div className="p-signup-form-ToS-agree2-input__outer">
                      <div className="p-signup-form-ToS-agree2-checkbox">
                        <span className="p-signup-form-ToS-agree2-check"></span>
                      </div>
                      <input
                        className="p-signup-form-ToS-agree2-input"
                        type="checkbox"
                        name="agree2"
                      />
                    </div>
                    <span className="p-signup-form-ToS-agree2-title__outer">
                      <span className="p-signup-form-ToS-agree2-title">
                        이용약관
                      </span>
                    </span>
                  </label>
                  <Link href="/">
                    <FontAwesomeIcon icon={faAngleRight} width="9" />
                  </Link>
                </div>
                <div className="p-signup-form-ToS-agree3-label__outer">
                  <label className="p-signup-form-ToS-agree3-label">
                    <div className="p-signup-form-ToS-agree3-input__outer">
                      <div className="p-signup-form-ToS-agree3-checkbox">
                        <span className="p-signup-form-ToS-agree3-check"></span>
                      </div>
                      <input
                        className="p-signup-form-ToS-agree3-input"
                        type="checkbox"
                        name="agree3"
                      />
                    </div>
                    <span className="p-signup-form-ToS-agree3-title__outer">
                      <span className="p-signup-form-ToS-agree3-title">
                        개인정보수집 및 이용동의
                      </span>
                    </span>
                  </label>
                  <Link href="/">
                    <FontAwesomeIcon icon={faAngleRight} width="9" />
                  </Link>
                </div>
              </div>
            </div>
            <button className="p-signup-form-submit-button" type="submit">
              회원가입하기
            </button>
          </form>
          <p className="p-signup-signin-link">
            이미 아이디가 있으신가요? <Link href="/sign_in">로그인</Link>
          </p>
        </main>
      </div>
    </>
  );
}
