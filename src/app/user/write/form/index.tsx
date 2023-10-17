"use client";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "@/app/components/backbutton";
import Modal from "@/app/components/modal";
import axios from "axios";
import Link from "next/link";

interface UserData {
  email: string;
  provider: string;
  name: string;
}

interface FormInput {
  title: string;
  content: string;
  isPublic: boolean;
  user: UserData;
}

export default function Form() {
  const router = useRouter();
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

  useEffect(() => {
    if (session?.user) {
      setValue("user", session?.user);
    }
  }, []);

  async function CreateDiary(data: FormInput) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signin/userCheck`,
        {
          email: data.user.email,
          auth: data.user.provider,
        }
      );

      let userId = res.data;

      if (userId === null) {
        try {
          const newUser = await axios.post(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/signupwithAuth`,
            {
              name: data.user.name,
              email: data.user.email,
              auth: data.user.provider,
              password: "",
            }
          );
          userId = newUser.data.id;
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const diary = await axios.post(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/createDiary`,
          {
            title: data.title,
            content: data.content,
            isPublic: data.isPublic,
            authorId: userId,
          }
        );
        console.log("일기 업로드 완료!", diary);
        router.push(`/user/${diary?.data?.authorId}/${diary?.data?.id}`);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const searchParams = useSearchParams();
  const showModal = searchParams?.get("modal");
  const showErrorModal = searchParams?.get("errorModal");
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <BackButton />
      <form className="p-diary-form">
        {showModal && <Modal />}
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
          <Link
            onClick={handleSubmit((data) => {
              if (!session?.user) {
                setError("user", {
                  message: "로그인 정보가 없습니다. 먼저 로그인 하세요.",
                });
              } else {
                CreateDiary(data);
              }
            })}
            href={errors ? "" : "/user/write/?modal=true"}
            className="p-diary-form-submit-button"
          >
            일기 올리기
          </Link>
        </div>
      </form>
    </>
  );
}
