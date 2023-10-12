"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

export default function DiaryList() {
  const [data, setData] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getDiary = async () => {
      const session = await getSession();

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}`,
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

  const month = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };

  interface diary {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
  }

  return (
    <>
      <ol className="p-diary-list">
        {data.map((v: diary) => (
          <li className="p-diary-item" key={v.id}>
            <Link href={`/user/${params.id}/` + v.id}>
              <h3>
                {Number(
                  new Date(v.createdAt).toLocaleString("ko-KR").split(".")[2]
                ) < 10
                  ? `0${
                      new Date(v.createdAt)
                        .toLocaleString("ko-KR")
                        .split(". ")[2]
                    }`
                  : new Date(v.createdAt).toLocaleString("ko-KR").split(".")[2]}
              </h3>
              <h4>
                {
                  month[
                    Number(
                      new Date(v.createdAt)
                        .toLocaleString("ko-KR")
                        .split(".")[1]
                    )
                  ]
                }
              </h4>
              <h4>
                {new Date(v.createdAt).toLocaleString("kr-KR").split(".")[0]}
              </h4>
              <span className="p-diary-item-fold"></span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
