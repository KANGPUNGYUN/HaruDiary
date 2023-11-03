"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function PasswordUpdateForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormInput>();
  const [isExistEmail, setIsExistEmail] = useState(false);
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const showModal = searchParams?.get("modal");

  useEffect(() => {
    setIsExistEmail(false);
  }, []);

  async function emailCheck(email: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/credentialEmailCheck`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const checkEmail = await res.json();
    if (checkEmail) {
      setIsExistEmail(true);
    } else {
      setIsExistEmail(false);
      setError("email", {
        message: "가입된 이메일이 아닙니다. 다시 작성해주세요.",
      });
    }
  }

  async function changePassword(data: FormInput) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signin/userCheck`,
        {
          email: data.email,
          auth: "credentials",
        }
      );
      const userId = res.data;
      if (!!userId) {
        const updatedUserData = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/updatePassword`,
          {
            id: userId,
            password: data.password,
          }
        );
        updatedUserData;
        router.push("/sign_up/password/?modal=true");
      } else {
        console.log("일치하는 유저정보가 없습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-password-update-description">
        가입한 이메일 주소를 입력해주세요.
      </div>
      <div className="p-password-update-input__outer">
        <div className="p-password-update-email__outer">
          <input
            {...register("email")}
            className="p-password-update-input"
            type="email"
            name="email"
            placeholder="이메일"
            readOnly={isExistEmail}
          />
          {!isExistEmail ? (
            <div className="p-signup-form-error-message">
              {errors.email?.message?.toString()}
            </div>
          ) : (
            <div className="p-signup-form-confirm-message">
              {isExistEmail && "가입된 이메일입니다. 비밀번호를 재설정하세요."}
            </div>
          )}
        </div>
        <button
          className="p-password-update-input-button"
          disabled={email === "" || !email}
          onClick={() => {
            emailCheck(getValues("email"));
          }}
        >
          확인
        </button>
      </div>
      {isExistEmail && (
        <>
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
              {errors.password?.message?.toString()}
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
              <span className="form-control-blind">
                입력한 비밀번호 확인하기
              </span>
            </label>
            <div className="p-signup-form-error-message">
              {errors.confirmPassword?.message?.toString()}
            </div>
          </div>
        </>
      )}
      <button
        className="p-password-update-check-button"
        disabled={!password || !confirmPassword}
        onClick={handleSubmit((data) => {
          changePassword(data);
        })}
      >
        비밀번호 재설정
      </button>
      {showModal && (
        <div className="modal__outer">
          <div className="modal">
            <button
              className="modal-escape"
              onClick={() => {
                router.push("/sign_in");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h1 className="modal-title">정상적으로 변경되었습니다.</h1>
            <div className="modal-button__outer">
              <button
                className="modal-button confirm"
                onClick={() => {
                  router.push("/sign_in");
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
