"use client";
import Link from "next/link";
import {
  faCircleUser,
  faCircleCheck,
  faPenToSquare,
  faXmark,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

interface user {
  id: number;
  email: string;
  auth: string;
  name: string;
}

interface FormInput {
  nickname: string;
}

export default function Profile() {
  const [user, setUser] = useState<user | null>(null);
  const [nameUpdate, setNameUpdate] = useState(false);
  const [isNameUpdated, setIsNameUpdated] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const [isExistNickname, setIsExistNickname] = useState("");
  const [pageInit, setPageInit] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
  });

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const showNameUpdateModal = searchParams?.get("nameUpdateModal");
  const showDeleteModal = searchParams?.get("deleteModal");

  const router = useRouter();

  useEffect(() => {
    setPageInit(true);
    if (status === "authenticated" && session && session.user) {
      const getUserId = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signin/userCheck`,
            {
              email: session?.user.email,
              auth: session?.user.provider,
            }
          );

          let userId = res.data;

          if (userId === null) {
            try {
              const newUser = await axios.post(
                `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/signupwithAuth`,
                {
                  name: session?.user?.name,
                  email: session?.user?.email,
                  auth: session?.user?.provider,
                  password: "",
                }
              );
              userId = newUser?.data?.id;
              setMyUserId(userId);
            } catch (error) {
              console.error(error);
            }
          } else {
            setMyUserId(userId);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getUserId();
    }

    if (!!myUserId) {
      const getUserData = async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${myUserId}/getUserData`,
          {
            headers: {
              authorization: `${session}`,
            },
          }
        );
        const user = await res.data;
        setUser(user);
      };
      getUserData();
    }
  }, [status, session, myUserId, pageInit]);

  async function updateUserName(name: string) {
    try {
      const updateUserName = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${myUserId}/updateUserName`,
        { name: name }
      );
      if (updateUserName.status === 200) {
        setIsNameUpdated(true);
        setPageInit(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser() {
    try {
      const deleteUser = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/deleteUser`,
        { id: myUserId }
      );
      if (deleteUser.status === 200) {
        setIsUserDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return (
      <>
        <div className="p-diary-list-unuser__outer">
          <div className="p-diary-list-unuser">
            <p>
              로그인이 필요한 페이지입니다. 로그인 또는 회원가입을 해주세요.
            </p>
            <Link href="/sign_in" className="login-button confirm">
              로그인 하러가기
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-mypage-profile__outer">
          <div className="p-mypage-profile">
            <div className="p-mypage-profile-image__outer">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="p-mypage-profile-image"
              />
              {user?.id === 1 ? (
                <FontAwesomeIcon
                  className="p-mypage-profile-user-certified"
                  icon={faCircleCheck}
                />
              ) : user?.auth === "kakao" ? (
                <span className="p-mypage-profile-user-auth__outer">
                  <span
                    className="p-mypage-profile-user-auth"
                    style={{ backgroundColor: "#fee500" }}
                  >
                    <Image
                      src="./kakao_logo.svg"
                      alt="kakao 간편로그인 회원"
                      width="25"
                      height="30"
                    />
                  </span>
                </span>
              ) : user?.auth === "naver" ? (
                <span className="p-mypage-profile-user-auth__outer">
                  <span
                    className="p-mypage-profile-user-auth"
                    style={{ backgroundColor: "#03c75a" }}
                  >
                    <Image
                      src="./naver_logo.svg"
                      alt="naver 간편로그인 회원"
                      width="45"
                      height="45"
                    />
                  </span>
                </span>
              ) : user?.auth === "google" ? (
                <span className="p-mypage-profile-user-auth__outer">
                  <span
                    className="p-mypage-profile-user-auth"
                    style={{
                      backgroundColor: "var(--white)",
                    }}
                  >
                    <Image
                      src="./google_logo.svg"
                      alt="google 간편로그인 회원"
                      width="70"
                      height="70"
                    />
                  </span>
                </span>
              ) : (
                <span className="p-mypage-profile-user-auth__outer">
                  <span
                    className="p-mypage-profile-user-auth"
                    style={{
                      backgroundColor: "#62d9fc",
                      color: "var(--white)",
                      fontFamily: "Gowun Batang",
                      fontSize: "30px",
                      borderRadius: "0",
                      padding: "5px",
                    }}
                  >
                    하
                  </span>
                </span>
              )}
            </div>
            <div className="p-mypage-profile-user-name__outer">
              {nameUpdate ? (
                <div className="p-mypage-profile-user-name-input__outer">
                  <div
                    className="p-signup-form-nickname-input__outer"
                    style={{ margin: "0" }}
                  >
                    <label>
                      <input
                        {...register("nickname", {
                          required: "필수 입력 항목입니다.",
                          minLength: {
                            value: 2,
                            message: "2자 이상으로 입력해주세요.",
                          },
                          maxLength: {
                            value: 8,
                            message: "8자 이하로 입력해주세요.",
                          },
                          validate: {
                            check: (val) => {
                              if (val.trim() === "") {
                                return "공백을 제외한 문자를 입력해주세요.";
                              } else if (val !== val.split(" ").join()) {
                                return "공백이 포함되어 있습니다.";
                              }
                            },
                          },
                        })}
                        className={
                          errors.nickname || isExistNickname !== ""
                            ? "p-signup-form-nickname-input errored"
                            : "p-signup-form-nickname-input"
                        }
                        name="nickname"
                        maxLength={8}
                        placeholder="별명 (2~8자)"
                        autoComplete="off"
                        onBlur={async (data) => {
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/nicknameCheck`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                nickname: data.target.value,
                              }),
                            }
                          );
                          const checkNickname = await res.json();

                          if (checkNickname) {
                            setIsExistNickname("사용 중인 닉네임입니다.");
                          } else {
                            setIsExistNickname("");
                          }
                        }}
                      />
                      <span className="form-control-blind">
                        닉네임 입력하기
                      </span>
                    </label>
                    <div
                      className="p-signup-form-error-message"
                      style={{ paddingTop: "4px" }}
                    >
                      {errors.nickname
                        ? errors.nickname?.message
                        : isExistNickname}
                    </div>
                  </div>

                  <button
                    className="nickname-update-button"
                    onClick={() => {
                      if (
                        !errors.nickname &&
                        isExistNickname !== "사용 중인 닉네임입니다."
                      ) {
                        router.push("/mypage/?nameUpdateModal=true");
                      }
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="nickname-update-button cancel"
                    onClick={() => {
                      setNameUpdate(false);
                    }}
                  >
                    취소
                  </button>
                  {showNameUpdateModal && (
                    <div className="modal__outer">
                      <div className="modal" style={{ height: "240px" }}>
                        {!isNameUpdated ? (
                          <>
                            <button
                              className="modal-escape"
                              onClick={router.back}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <div className="modal-title__outer">
                              <FontAwesomeIcon
                                icon={faExclamation}
                                className="modal-icon-exclamation"
                              />
                              <h1 className="modal-title">
                                닉네임을 변경하시겠습니까?
                              </h1>
                            </div>
                            <div className="modal-button__outer">
                              <button
                                className="modal-button cancel"
                                onClick={router.back}
                              >
                                취소
                              </button>
                              <button
                                className="modal-button confirm"
                                onClick={handleSubmit((data) => {
                                  updateUserName(data.nickname);
                                })}
                              >
                                확인
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                router.push("/mypage");
                                setNameUpdate(false);
                                setIsNameUpdated(false);
                              }}
                              className="modal-escape"
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <div className="modal-title__outer">
                              <h1 className="modal-title">
                                정상적으로 변경되었습니다.
                              </h1>
                            </div>
                            <div className="modal-button__outer">
                              <button
                                onClick={() => {
                                  router.push("/mypage");
                                  setNameUpdate(false);
                                  setIsNameUpdated(false);
                                }}
                                className="modal-button confirm"
                              >
                                확인
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-mypage-profile-user-name">
                  {user?.name}{" "}
                  <button
                    className="p-mypage-profile-user-name-update-button"
                    onClick={() => {
                      setNameUpdate(true);
                      setValue("nickname", user?.name);
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              )}
              <div className="p-mypage-profile-user-email">{user?.email}</div>
            </div>
          </div>
          <Link href="/mypage/?deleteModal=true" className="withdraw-button">
            회원탈퇴
          </Link>
          {showDeleteModal && (
            <div className="modal__outer">
              <div className="modal" style={{ height: "240px" }}>
                {!isUserDeleted ? (
                  <>
                    <button className="modal-escape" onClick={router.back}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="modal-title__outer">
                      <FontAwesomeIcon
                        icon={faExclamation}
                        className="modal-icon-exclamation"
                      />
                      <h1 className="modal-title">정말 탈퇴하시겠습니까?</h1>
                      <span className="modal-content">
                        일기와 좋아요 기록이 모두 삭제됩니다.
                      </span>
                    </div>
                    <div className="modal-button__outer">
                      <button
                        className="modal-button cancel"
                        onClick={router.back}
                      >
                        취소
                      </button>
                      <button
                        className="modal-button confirm"
                        onClick={() => {
                          setIsUserDeleted(false);
                          deleteUser();
                        }}
                      >
                        확인
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        signOut();
                      }}
                      className="modal-escape"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="modal-title__outer">
                      <h1 className="modal-title">
                        정상적으로 회원탈퇴했습니다.
                      </h1>
                    </div>
                    <div className="modal-button__outer">
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="modal-button confirm"
                      >
                        확인
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
