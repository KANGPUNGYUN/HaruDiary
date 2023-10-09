"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Diary() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const getDiary = async () => {
      const session = await getSession();

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/${params.diaryId}`,
        {
          method: "GET",
          headers: {
            authorization: `${session}`,
          },
        }
      );
      const diary = await res.data;

      return diary;
    };

    getDiary().then((res) => setData(res));
  }, []);

  return (
    <>
      <div>
        <p className="p-diary-date">
          {`${
            new Date(data.createdAt).toLocaleString("kr-KR").split(".")[0]
          }년 ${
            new Date(data.createdAt).toLocaleString("kr-KR").split(".")[1]
          }월 ${
            new Date(data.createdAt).toLocaleString("kr-KR").split(".")[2]
          }일`}
        </p>
        <p className="p-diary-title">{data.title}</p>
        <p className="p-diary-content">{data.content}</p>
      </div>
      <div className="p-diary-footer">
        <div>조회수 {data.views}</div>
        <div>참 잘했어요 {data.likes}</div>
      </div>
    </>
  );
}
