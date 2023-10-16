"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { faCircleUser, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

interface userListData {
  id: number;
  email: string;
  name: string;
  auth: string;
  _count: {
    diarys: number;
  };
}

export default function UserList() {
  const { data: session } = useSession();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      if (session && session?.user) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getUserList`,
          {
            method: "GET",
            headers: {
              authorization: `${session}`,
            },
          }
        );
        const userList = await res.data;
        setUserList(userList);
      }
    };
    getUserList();
  }, [session]);
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className="p-user-search-bar__outer">
        <div className="p-user-search-bar">
          <span className="p-user-search-bar-icon"></span>
          <input
            type="text"
            className="p-user-search-bar-input"
            placeholder="닉네임으로 검색하기"
          />
        </div>
      </div>
      <p className="p-user-search-result">전체</p>
      <ol className="p-user-list">
        {userList.length === 0 ? (
          <li>유저 정보가 없습니다.</li>
        ) : (
          userList.map((v: userListData) => (
            <li className="p-user-list-item" key={v.id}>
              <Link href={`/user/${v.id}`}>
                <div className="p-user-list-user-profile-image__outer">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="p-user-list-user-profile-image"
                  />
                  {v.id === 1 ? (
                    <FontAwesomeIcon
                      className="p-user-list-user-certified"
                      icon={faCircleCheck}
                    />
                  ) : v.auth === "kakao" ? (
                    <span className="p-user-list-user-auth__outer">
                      <span
                        className="p-user-list-user-auth"
                        style={{ backgroundColor: "#fee500" }}
                      >
                        <Image
                          src="/kakao_logo.svg"
                          alt="kakao 간편로그인 회원"
                          width="10"
                          height="12"
                        />
                      </span>
                    </span>
                  ) : v.auth === "naver" ? (
                    <span className="p-user-list-user-auth__outer">
                      <span
                        className="p-user-list-user-auth"
                        style={{ backgroundColor: "#03c75a" }}
                      >
                        <Image
                          src="/naver_logo.svg"
                          alt="naver 간편로그인 회원"
                          width="18"
                          height="18"
                        />
                      </span>
                    </span>
                  ) : v.auth === "google" ? (
                    <span className="p-user-list-user-auth__outer">
                      <span
                        className="p-user-list-user-auth"
                        style={{
                          backgroundColor: "var(--white)",
                          border: "1px solid #8b8d91",
                        }}
                      >
                        <Image
                          src="/google_logo.svg"
                          alt="google 간편로그인 회원"
                          width="28"
                          height="28"
                        />
                      </span>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="p-user-list-user-profile">
                  <div className="p-user-list-user-name">{v.name}</div>
                  <div className="p-user-list-user-diarys">
                    {v._count.diarys} diarys
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ol>
    </>
  );
}
