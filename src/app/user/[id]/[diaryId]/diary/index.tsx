"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Diary() {
  const [data, setData] = useState([]);

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

  interface diary {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
  }

  return (
    <>
      {<h2 className="p-diary-title">{data.title}</h2>}
      {<h2 className="p-diary-title">{data.content}</h2>}
    </>
  );
}
