"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { faXmark, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserData {
  email: string;
  name: string;
  auth: string;
}

interface DiaryData {
  author: UserData;
  authorId: number;
  content: string;
  createdAt: Date;
  id: number;
  isPublic: boolean;
  title: string;
  views: number;
  _count: { likes: number; report: number };
}

interface FormInput {
  reportBy: string;
}

export default function Diary() {
  const [data, setData] = useState<DiaryData | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [myUserId, setMyUserId] = useState(0);

  const params = useParams();
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const showModal = searchParams?.get("modal");
  const showReportModal = searchParams?.get("reportModal");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  useEffect(() => {
    if (data !== null) {
      const updateViews = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/views`,
            {
              views: data._count,
            }
          );
          const result = await res.data;

          return result;
        } catch (error) {
          console.log(error);
        }
      };
      updateViews();
    }
  }, [data]);

  useEffect(() => {
    if (status === "authenticated" && session && session.user) {
      const getMyUserId = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signin/userCheck`,
            {
              email: session?.user.email,
              auth: session?.user.provider,
            }
          );

          setMyUserId(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const getMyLikes = async () => {
        try {
          if (myUserId !== 0) {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/checkIsLiked`,
              {
                userId: myUserId,
              }
            );
            if (res.data !== 0) {
              setIsliked(true);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      const getDiary = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`
          );
          const diary = await res.data;
          return diary;
        } catch (error) {
          console.log(error);
        }
      };

      getMyUserId().then(() => {
        getMyLikes();
      });
      getDiary().then((res) => {
        setData(res);
      });
    } else {
      const getDiary = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`
          );
          const diary = await res.data;
          return diary;
        } catch (error) {
          console.log(error);
        }
      };
      getDiary().then((res) => {
        setData(res);
      });
    }
  }, [status, myUserId]);

  async function deleteDiary() {
    try {
      const deleteDiaryData = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/deleteDiary`,
        { id: params.diaryId }
      );
      if (deleteDiaryData.status === 200) {
        setIsDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function like() {
    try {
      const like = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/like`,
        { id: myUserId }
      );
      if (like.status === 200) {
        setIsliked(true);
        const getDiary = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`
            );
            const diary = await res.data;
            return diary;
          } catch (error) {
            console.log(error);
          }
        };
        getDiary().then((res) => {
          setData(res);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function unlike() {
    try {
      const unlike = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/unlike`,
        { id: myUserId }
      );
      if (unlike.status === 200) {
        setIsliked(false);
        const getDiary = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`,
              {
                headers: {
                  authorization: session?.user?.accessToken,
                },
              }
            );
            const diary = await res.data;
            return diary;
          } catch (error) {
            console.log(error);
          }
        };
        getDiary().then((res) => {
          setData(res);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function report(reportData: FormInput) {
    try {
      const report = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/report`,
        { id: myUserId, reportBy: reportData.reportBy }
      );
      console.log(report);
      if (report.status === 200) {
        setIsReported(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {data && data?._count?.report > 0 ? (
        <div className="p-diary-paper">
          <div className="p-diary-report-main">
            <div>
              <FontAwesomeIcon
                icon={faExclamation}
                className="modal-icon-exclamation"
              />
              <p>해당 일기는 신고가 접수되어 검토 중인 일기입니다.</p>
            </div>
          </div>
          <div className="p-diary-footer">
            <div>조회수 {data?.views}</div>
            <div>참 잘했어요 {data?._count?.likes}</div>
          </div>
        </div>
      ) : (
        <div className="p-diary-paper">
          <div>
            <p className="p-diary-date">
              {`${
                data &&
                new Date(data?.createdAt).toLocaleString("ko-KR").split(".")[0]
              }년 ${
                data &&
                new Date(data?.createdAt).toLocaleString("ko-KR").split(".")[1]
              }월 ${
                data &&
                new Date(data?.createdAt).toLocaleString("ko-KR").split(".")[2]
              }일`}
            </p>
            <div className="p-diary-title">{data?.title}</div>
            <div className="p-diary-content">
              <pre style={{ whiteSpace: "pre-wrap" }}>{data?.content}</pre>
            </div>
          </div>
          <div className="p-diary-footer">
            <div>조회수 {data?.views}</div>
            <div>참 잘했어요 {data?._count?.likes}</div>
          </div>
        </div>
      )}
      <div className="p-diary-utility">
        {data?.authorId === session?.user.id ||
        (data?.author?.auth === session?.user.provider &&
          data?.author?.email === session?.user.email) ? (
          <>
            <Link
              href={`/user/${params.id}/${params.diaryId}/update`}
              className="p-diary-like-button"
            >
              수정하기
            </Link>
            <Link
              href={`/user/${params.id}/${params.diaryId}/?modal=true`}
              className="p-diary-report-button"
            >
              삭제하기
            </Link>
            {showModal && (
              <div className="modal__outer">
                <div className="modal" style={{ height: "240px" }}>
                  {!isDeleted ? (
                    <>
                      <button className="modal-escape" onClick={router.back}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <div className="modal-title__outer">
                        <FontAwesomeIcon
                          icon={faExclamation}
                          className="modal-icon-exclamation"
                        />
                        <h1 className="modal-title">
                          일기를 정말 삭제하시겠습니까?
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
                          onClick={() => {
                            deleteDiary();
                          }}
                        >
                          확인
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/user/${params.id}`}
                        className="modal-escape"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Link>
                      <div className="modal-title__outer">
                        <h1 className="modal-title">
                          정상적으로 삭제되었습니다.
                        </h1>
                      </div>
                      <div className="modal-button__outer">
                        <Link
                          href={`/user/${params.id}`}
                          className="modal-button confirm"
                        >
                          확인
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        ) : session && session.user ? (
          <>
            {isLiked ? (
              <button
                className="p-diary-like-button cancel"
                onClick={() => {
                  unlike();
                }}
              >
                참 잘했어요 취소
              </button>
            ) : (
              <button
                className="p-diary-like-button"
                onClick={() => {
                  like();
                }}
              >
                참 잘했어요
              </button>
            )}
            <Link
              href={`/user/${params.id}/${params.diaryId}/?reportModal=true`}
              className="p-diary-report-button"
            >
              신고하기
            </Link>
            {showReportModal && (
              <div className="modal__outer">
                <div
                  className="modal"
                  style={
                    !isReported ? { height: "400px" } : { height: "200px" }
                  }
                >
                  {!isReported ? (
                    <>
                      <button className="modal-escape" onClick={router.back}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <div className="modal-title__outer">
                        <FontAwesomeIcon
                          icon={faExclamation}
                          className="modal-icon-exclamation"
                        />
                        <h1 className="modal-title">
                          해당 일기를 정말 신고하시겠습니까?
                        </h1>
                        <span className="modal-content">
                          신고 즉시 해당 일기는 비공개 처리되며, 관리자가 최종
                          검토하여 신고자 이메일로 결과를 전달합니다.
                        </span>
                      </div>
                      <form className="modal-form">
                        <span>
                          - 구체적인 신고 사유{" "}
                          <span className="modal-form-require">필수</span>
                        </span>
                        <textarea
                          {...register("reportBy", {
                            required: "신고 사유를 입력해주세요.",
                          })}
                          className={
                            errors.reportBy
                              ? "modal-textarea errored"
                              : "modal-textarea"
                          }
                          placeholder="예시) 음담패설/욕설/명예훼손 등 비난성 글, 광고성 목적의 글, 특정 종교/정치/이념 등의 소재로 분쟁을 야기하는 글"
                        ></textarea>
                        <div className="modal-form-error-message">
                          {errors.reportBy?.message}
                        </div>
                      </form>
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
                            report(data);
                          })}
                        >
                          신고
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/user/${params.id}`}
                        className="modal-escape"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Link>
                      <div className="modal-title__outer">
                        <h1 className="modal-title">
                          정상적으로 신고되었습니다.
                        </h1>
                      </div>
                      <div className="modal-button__outer">
                        <Link
                          href={`/user/${params.id}`}
                          className="modal-button confirm"
                        >
                          확인
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
