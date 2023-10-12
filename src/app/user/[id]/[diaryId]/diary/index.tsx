"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { types } from "util";

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

  const params = useParams();
  const { data: session } = useSession();

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

      return diary;
    };

    getDiary().then((res) => {
      setData(res);
    });
  }, []);

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
            <button className="p-diary-report-button">삭제하기</button>
          </>
        ) : (
          <>
            <button className="p-diary-like-button">참 잘했어요</button>
            <button className="p-diary-report-button">신고하기</button>
          </>
        )}
      </div>
    </>
  );
}
