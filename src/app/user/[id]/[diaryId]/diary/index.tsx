"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  _count: { likes: number };
}

export default function Diary() {
  const [data, setData] = useState<DiaryData>({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [isliked, setIsliked] = useState(false);
  const [myUserId, setMyUserId] = useState(0);

  const params = useParams();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const showModal = searchParams?.get("modal");

  const router = useRouter();

  useEffect(() => {
    const getDiary = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`,
        {
          method: "GET",
          headers: {
            authorization: session?.user?.accessToken,
          },
        }
      );
      const diary = await res.data;
      console.log(diary);

      return diary;
    };

    const updateViews = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/views`,
        {
          views: data._count,
        }
      );
      const result = await res.data;

      return result;
    };

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

    getMyUserId();
    getDiary().then((res) => {
      setData(res);
      updateViews();
    });
  }, []);

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

  async function likes() {
    try {
      const like = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}/like`,
        { id: myUserId }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-diary-paper">
        <div>
          <p className="p-diary-date">
            {`${
              new Date(data.createdAt).toLocaleString("ko-KR").split(".")[0]
            }년 ${
              new Date(data.createdAt).toLocaleString("ko-KR").split(".")[1]
            }월 ${
              new Date(data.createdAt).toLocaleString("ko-KR").split(".")[2]
            }일`}
          </p>
          <p className="p-diary-title">{data.title}</p>
          <p className="p-diary-content">{data.content}</p>
        </div>
        <div className="p-diary-footer">
          <div>조회수 {data.views}</div>
          <div>참 잘했어요 {data._count?.likes}</div>
        </div>
      </div>
      <div className="p-diary-utility">
        {data.authorId === session?.user.id ||
        (data.author?.auth === session?.user.provider &&
          data.author?.email === session?.user.email) ? (
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
        ) : (
          <>
            <button
              className="p-diary-like-button"
              onClick={() => {
                likes();
              }}
            >
              참 잘했어요
            </button>
            <button className="p-diary-report-button">신고하기</button>
          </>
        )}
      </div>
    </>
  );
}
