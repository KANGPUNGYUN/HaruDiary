"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  faMagnifyingGlass,
  faCircleUser,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { GowunBatang } from "@/app/styles/font";
import UserListSkeleton from "./UserListSkeleton";

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
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [listIndex, setListIndex] = useState(2);
  const [totalUser, setTotalUser] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getUserList`,
        { page: 1 }
      );
      const result = await res.data;
      setUserList(result[1]);
      setTotalUser(result[0]);
    };
    getUserList().then(() => setIsResolved(true));
  }, []);

  const searchUserList = async (e: any) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getUserNameList`,
      { name: e.target.value }
    );
    const userList = await res.data;
    console.log("유저 검색");
    setUserList(userList);
    setSearchText(e.target.value);
    if (e.target.value !== "") {
      setIsSearched(true);
    } else {
      setIsSearched(false);
      showInit();
    }
  };

  const showMore = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getUserList`,
      { page: listIndex }
    );
    const result: never[] = await res.data;
    setUserList([...userList, ...result[1]]);
    setListIndex(listIndex + 1);
  };

  const showInit = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/getUserList`,
      { page: 1 }
    );
    const result: never[] = await res.data;
    setUserList(result[1]);
    setListIndex(2);
  };

  return (
    <>
      <div className="p-user-search-bar__outer">
        <div className="p-user-search-bar">
          <span className="p-user-search-bar-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="SearchSVG" />
          </span>
          <input
            type="text"
            className="p-user-search-bar-input"
            placeholder="닉네임으로 검색하기"
            onChange={searchUserList}
          />
        </div>
      </div>
      <p className="p-user-search-result">
        {isSearched
          ? `검색결과 ${userList.length}명`
          : !isResolved
          ? "회원 검색 중..."
          : `전체 ${totalUser}명`}
      </p>
      <ol className="p-user-list">
        {!isResolved ? (
          <UserListSkeleton />
        ) : userList.length === 0 ? (
          <li>일치하는 닉네임의 회원이 없습니다.</li>
        ) : (
          userList.map((v: userListData) => (
            <li className="p-user-list-item" key={v.id}>
              <Link href={`/user/${v.id}`}>
                <div className="p-user-list-user-profile-image__outer">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="p-user-list-user-profile-image"
                    width="40px"
                    height="40px"
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
                    <span className="p-user-list-user-auth__outer">
                      <span
                        className={`p-user-list-user-auth ${GowunBatang.className}`}
                        style={{
                          backgroundColor: "#62d9fc",
                          color: "var(--white)",
                          fontWeight: 400,
                          fontSize: "12px",
                          borderRadius: "0",
                          padding: "2px",
                        }}
                      >
                        하
                      </span>
                    </span>
                  )}
                </div>
                <div className="p-user-list-user-profile">
                  <div className="p-user-list-user-name">
                    {searchText ? (
                      <>
                        {v.name.slice(0, v.name.indexOf(searchText))}
                        <span style={{ color: "#009fce" }}>{searchText}</span>
                        {v.name.slice(
                          v.name.indexOf(searchText) + searchText.length
                        )}
                      </>
                    ) : (
                      v.name
                    )}
                  </div>
                  <div className="p-user-list-user-diarys">
                    {v._count.diarys} diarys
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ol>
      {isSearched ? (
        ""
      ) : totalUser > (listIndex - 1) * 5 ? (
        <button
          className="p-user-list-show-more-button"
          onClick={() => {
            showMore();
          }}
        >
          더보기
        </button>
      ) : (
        <button
          className="p-user-list-show-more-button fold"
          onClick={() => {
            showInit();
          }}
        >
          접기
        </button>
      )}
    </>
  );
}
