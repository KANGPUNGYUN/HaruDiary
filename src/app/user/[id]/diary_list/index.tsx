"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

export default function DiaryList() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/${params.id}/getUserData`,
        {
          method: "GET",
          headers: {
            authorization: `${session}`,
          },
        }
      );
      const user = await res.data;
      return user;
    };
    const getDiary = async () => {
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
    getUserData().then((res) => setUser(res));
    getDiary().then((res) => setData(res));
  }, [session, params.id]);

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

  if (Number(params.id) === 0) {
    return (
      <>
        <h2 className="p-diary-list-title">나의 하루</h2>
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
        <h2 className="p-diary-list-title">
          <span className="p-diary-list-title-user-nickname">{user?.name}</span>
          의 하루
        </h2>
        {data.length === 0 ? (
          <div className="p-diary-list-unuser__outer">
            <div className="p-diary-list-unuser">
              <p>아직 작성된 일기가 없습니다. 당신의 하루를 작성해 보세요.</p>
              <Link href="/user/write" className="login-button confirm">
                나의 하루 작성하러가기
              </Link>
            </div>
          </div>
        ) : (
          <ol className="p-diary-list">
            {data.map((v: diary) => (
              <li className="p-diary-item" key={v.id}>
                <Link href={`/user/${params.id}/` + v.id}>
                  <h3>
                    {Number(
                      new Date(v.createdAt)
                        .toLocaleString("ko-KR")
                        .split(".")[2]
                    ) < 10
                      ? `0${
                          new Date(v.createdAt)
                            .toLocaleString("ko-KR")
                            .split(". ")[2]
                        }`
                      : new Date(v.createdAt)
                          .toLocaleString("ko-KR")
                          .split(".")[2]}
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
                    {
                      new Date(v.createdAt)
                        .toLocaleString("kr-KR")
                        .split(".")[0]
                    }
                  </h4>
                  <span className="p-diary-item-fold"></span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </>
    );
  }
}
