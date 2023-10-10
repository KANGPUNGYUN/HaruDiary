"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "@/app/components/backbutton";

interface FormInput {
  title: string;
  content: string;
  isPublic: boolean;
  user: object;
}

export default function Form() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { isPublic: false, user: {} },
  });

  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e: any) => {
    setInputCount(e.target.value.length);
  };

  const isPublic = watch("isPublic");

  const date = new Date().toLocaleDateString("ko-KR");
  const year = date.split(". ")[0];
  const month = date.split(". ")[1];
  const day = date.split(".")[2];

  if (session?.user) {
    setValue("user", session?.user);
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <BackButton />
      <form
        className="p-diary-form"
        onSubmit={handleSubmit((data) => {
          if (!session?.user) {
            setError("user", {
              message:
                "로그인 정보가 없습니다. 일기를 작성하려면 먼저 로그인 또는 회원가입해주세요.",
            });
          } else {
            console.log(data);
          }
        })}
      >
        <div className="p-diary-paper">
          <p className="p-diary-date">{`${year}년 ${month}월 ${day}일`}</p>
          <label className="p-diary-form-title-label__outer">
            <input
              type="text"
              className={
                errors.title
                  ? "p-diary-form-title errored"
                  : "p-diary-form-title"
              }
              {...register("title", {
                required: "제목을 입력해주세요.",
              })}
              placeholder={`오늘의 제목`}
            />
            <span className="underline"></span>
            <span className="form-control-blind">일기 제목 입력하기</span>
          </label>
          <div className="p-signup-form-error-message">
            {errors.title?.message}
          </div>
          <label>
            <textarea
              className={
                errors.content
                  ? "p-diary-form-content errored"
                  : "p-diary-form-content"
              }
              {...register("content", {
                required: "내용을 입력해주세요.",
              })}
              placeholder="당신의 하루를 작성해주세요."
              onChange={onInputHandler}
              maxLength={250}
            />
            <span className="form-control-blind">일기 내용 입력하기</span>
          </label>
          <div className="p-diary-form-content-text-counter">
            <div className="p-signup-form-error-message">
              {errors.content?.message}
            </div>
            <p className="p-diary-form-content-text-limit">
              <span>{inputCount}</span>
              <span>/250자</span>
            </p>
          </div>
          <div className="p-diary-form-checkbox-label__outer">
            <label className="p-diary-form-checkbox-label">
              <div
                className={
                  isPublic
                    ? "p-diary-form-checkbox-input__outer active"
                    : "p-diary-form-checkbox-input__outer"
                }
              >
                <div className="p-diary-form-checkbox">
                  <span className="p-diary-form-check"></span>
                </div>
                <input
                  className="p-diary-form-checkbox-input"
                  type="checkbox"
                  checked={isPublic}
                  {...register("isPublic")}
                />
              </div>
              <span className="p-diary-form-checkbox-text__outer">
                <span className="p-diary-form-checkbox-text">공개 여부</span>
              </span>
            </label>
            <span data-tooltip="checkbox를 checked하면 회원 모두에게 일기가 공개되며, unchecked하면 비공개됩니다.">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </span>
          </div>
        </div>
        <div className="p-diary-form-error-message">{errors.user?.message}</div>
        <div className="p-diary-form-utility">
          <button className="p-diary-form-submit-button" type="submit">
            일기 올리기
          </button>
        </div>
      </form>
    </>
  );
}
