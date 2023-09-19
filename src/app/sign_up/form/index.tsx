"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  agreeAll: boolean;
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      agreeAll: false,
      agree1: false,
      agree2: false,
      agree3: false,
    },
  });

  const agreeAll = watch("agreeAll");
  const agree1 = watch("agree1");
  const agree2 = watch("agree2");
  const agree3 = watch("agree3");

  const handleSelectAll = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setValue("agree1", true);
      setValue("agree2", true);
      setValue("agree3", true);
    } else {
      setValue("agree1", false);
      setValue("agree2", false);
      setValue("agree3", false);
    }
  };

  useEffect(() => {
    if (agree1 === true && agree2 === true && agree3 === true) {
      setValue("agreeAll", true);
    } else {
      setValue("agreeAll", false);
    }
  }, [agree1, agree2, agree3]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <form
        className="p-signup-form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="p-signup-form-email-input__outer">
          <label
            className={
              errors.email
                ? "p-signup-form-label errored"
                : "p-signup-form-label"
            }
          >
            이메일
          </label>
          <div className="p-signup-form-email-input">
            <div className="p-signup-form-email-input__inner">
              <span className="p-signup-form-email-input__local">
                <label>
                  <input
                    {...register("email", {
                      required: "필수 입력 항목입니다.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "이메일 형식이 올바르지 않습니다.",
                      },
                    })}
                    className={
                      errors.email ? "form-control errored" : "form-control"
                    }
                    placeholder="이메일"
                    autoComplete="off"
                  />
                  <span className="form-control-blind">
                    이메일 앞 주소 입력하기
                  </span>
                </label>
              </span>
            </div>
          </div>
          <div className="p-signup-form-error-message">
            {errors.email?.message}
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
          <label
            className={
              errors.password
                ? "p-signup-form-label errored"
                : "p-signup-form-label"
            }
          >
            비밀번호
          </label>
          <div className="p-signup-form-description">
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
          <label>
            <input
              {...register("password", {
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
                  message:
                    "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.",
                },
              })}
              className={
                errors.password
                  ? "p-signup-form-password-input errored"
                  : "p-signup-form-password-input"
              }
              type="password"
              name="password"
              placeholder="비밀번호"
            />
            <span className="form-control-blind">비밀번호 입력하기</span>
          </label>
          <div className="p-signup-form-error-message">
            {errors.password?.message}
          </div>
        </div>
        <div className="p-signup-form-confirm-password-input__outer">
          <label
            className={
              errors.confirmPassword
                ? "p-signup-form-label errored"
                : "p-signup-form-label"
            }
          >
            비밀번호 확인
          </label>
          <label>
            <input
              {...register("confirmPassword", {
                required: "확인을 위해 비밀번호를 한 번 더 입력해주세요.",
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
              className={
                errors.confirmPassword
                  ? "p-signup-form-confirm-password-input errored"
                  : "p-signup-form-confirm-password-input"
              }
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
            />
            <span className="form-control-blind">입력한 비밀번호 확인하기</span>
          </label>
          <div className="p-signup-form-error-message">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="p-signup-form-nickname-input__outer">
          <label
            className={
              errors.nickname
                ? "p-signup-form-label errored"
                : "p-signup-form-label"
            }
          >
            닉네임
          </label>
          <label>
            <input
              {...register("nickname", {
                required: "필수 입력 항목입니다.",
                minLength: { value: 2, message: "2자 이상으로 입력해주세요." },
                maxLength: { value: 15, message: "15자 이하로 입력해주세요." },
                // 추가 작업
                // validate: {
                //   check: (val) => {
                //     if (!!getNickname(val)) {
                //       return "사용 중인 별명입니다.";
                //     }
                //   },
                // },
              })}
              className={
                errors.nickname
                  ? "p-signup-form-nickname-input errored"
                  : "p-signup-form-nickname-input"
              }
              name="nickname"
              placeholder="별명 (2~15자)"
              autoComplete="off"
            />
            <span className="form-control-blind">닉네임 입력하기</span>
          </label>
          <div className="p-signup-form-error-message">
            {errors.nickname?.message}
          </div>
        </div>
        <div className="p-signup-form-ToS-input__outer">
          <label
            className={
              !agreeAll && errors.agreeAll
                ? "p-signup-form-label errored"
                : "p-signup-form-label"
            }
          >
            이용약관
          </label>
          <div
            className={
              !agreeAll && errors.agreeAll
                ? "p-signup-form-ToS-container errored"
                : "p-signup-form-ToS-container"
            }
          >
            <div className="p-signup-form-ToS-agreeAll-label__outer">
              <label className="p-signup-form-ToS-agreeAll-label">
                <div
                  className={
                    !agreeAll
                      ? "p-signup-form-ToS-agreeAll-input__outer"
                      : "p-signup-form-ToS-agreeAll-input__outer active"
                  }
                >
                  <div className="p-signup-form-ToS-agreeAll-checkbox">
                    <span className="p-signup-form-ToS-agreeAll-check"></span>
                  </div>
                  <input
                    className="p-signup-form-ToS-agreeAll-input"
                    type="checkbox"
                    checked={agreeAll}
                    onClick={handleSelectAll}
                    {...register("agreeAll", {
                      required: "필수 항목에 동의해주세요.",
                    })}
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
                <div
                  className={
                    !agree1
                      ? "p-signup-form-ToS-agree1-input__outer"
                      : "p-signup-form-ToS-agree1-input__outer active"
                  }
                >
                  <div className="p-signup-form-ToS-agree1-checkbox">
                    <span className="p-signup-form-ToS-agree1-check"></span>
                  </div>
                  <input
                    className="p-signup-form-ToS-agree1-input"
                    type="checkbox"
                    checked={agree1}
                    {...register("agree1")}
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
                <div
                  className={
                    !agree2
                      ? "p-signup-form-ToS-agree2-input__outer"
                      : "p-signup-form-ToS-agree2-input__outer active"
                  }
                >
                  <div className="p-signup-form-ToS-agree2-checkbox">
                    <span className="p-signup-form-ToS-agree2-check"></span>
                  </div>
                  <input
                    className="p-signup-form-ToS-agree2-input"
                    type="checkbox"
                    checked={agree2}
                    {...register("agree2")}
                  />
                </div>
                <span className="p-signup-form-ToS-agree2-title__outer">
                  <span className="p-signup-form-ToS-agree2-title">
                    이용약관
                  </span>
                </span>
              </label>
              <Link href="/policy">
                <FontAwesomeIcon icon={faAngleRight} width="9" />
              </Link>
            </div>
            <div className="p-signup-form-ToS-agree3-label__outer">
              <label className="p-signup-form-ToS-agree3-label">
                <div
                  className={
                    !agree3
                      ? "p-signup-form-ToS-agree3-input__outer"
                      : "p-signup-form-ToS-agree3-input__outer active"
                  }
                >
                  <div className="p-signup-form-ToS-agree3-checkbox">
                    <span className="p-signup-form-ToS-agree3-check"></span>
                  </div>
                  <input
                    className="p-signup-form-ToS-agree3-input"
                    type="checkbox"
                    checked={agree3}
                    {...register("agree3")}
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
          <div className="p-signup-form-error-message">
            {!agreeAll && errors.agreeAll?.message}
          </div>
        </div>
        <button className="p-signup-form-submit-button" type="submit">
          회원가입하기
        </button>
      </form>
    </>
  );
}
