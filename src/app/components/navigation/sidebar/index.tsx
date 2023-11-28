import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { GowunBatang } from "@/app/styles/font";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../navbar/Logo";
import SigninButton from "../navbar/SigninButton";

interface MenuList {
  id: Number;
  title: string;
  href: string;
}

export default function Sidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
}): JSX.Element {
  let outside = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    let handler = (e: any) => {
      if (!outside.current?.contains(e.target) && isOpen) {
        toggle(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const menuList = [
    { id: 1, title: "소개", href: "/about" },
    { id: 2, title: "모두의 하루", href: "/user" },
    { id: 3, title: "나의 하루", href: `/user/${userId}` },
    { id: 4, title: "하루쓰기", href: "/user/write" },
    { id: 5, title: "마이페이지", href: "/mypage" },
  ];

  useEffect(() => {
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

          if (userId !== null) {
            setUserId(userId);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getUserId();
    }
  }, [status, session]);

  return (
    <>
      <div
        className="m-sidebar-outer"
        style={{
          overflow: `${isOpen ? "visible" : "hidden"}`,
          opacity: `${isOpen ? "1" : "0"}`,
          right: ` ${isOpen ? "0" : "-100%"}`,
          transition: ` ${isOpen ? "" : "0.3s ease"}`,
        }}
      >
        <div
          className={`m-sidebar ${isOpen ? "active" : "inactive"}`}
          ref={outside}
        >
          <div className="m-sidebar-top">
            <div
              className="m-sidebar-logo-wrapper"
              onClick={() => {
                toggle(false);
              }}
            >
              <Logo />
            </div>
            <button
              className="m-sidebar-tabmenu"
              onClick={() => {
                toggle(false);
              }}
              role="button"
              aria-label="메뉴 닫기 버튼"
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#2f3438", verticalAlign: "2.89px" }}
              />
              <span className="p-blind">메뉴 닫기 버튼</span>
            </button>
          </div>
          <Link href="/sign_in">
            <SigninButton width="100%" />
          </Link>
          <hr className="m-sidebar-tabmenu-hr" />
          <ul className="m-sidebar-tabmenu-ul">
            {menuList.map((item: MenuList) => (
              <li
                className={`m-sidebar-tabmenu-item ${GowunBatang.className}`}
                onClick={() => {
                  toggle(false);
                }}
                key={`${item.id}`}
              >
                <Link href={item.href}>
                  <div>{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
