"use client";

import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { GowunBatang } from "@/app/styles/font";

interface MenuList {
  id: Number;
  title: string;
  href: string;
}

export default function Navbar({ toggle }: { toggle: () => void }) {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState(0);

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

          if (userId === null) {
            try {
              const newUser = await axios.post(
                `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/signup/signupwithAuth`,
                {
                  name: session?.user?.name,
                  email: session?.user?.email,
                  auth: session?.user?.provider,
                  password: "",
                }
              );
              userId = newUser?.data?.id;
            } catch (error) {
              console.error(error);
            }
          }
          setUserId(userId);
        } catch (error) {
          console.log(error);
        }
      };

      getUserId();
    }
  }, [status, session]);

  return (
    <nav className="p-navbar">
      <div className="p-container">
        <div className="p-container__inner p-navbar__inner-container">
          <div className="p-navbar__logo-container">
            <Logo />
            <ul className="p-navbar-tabmenu-ul">
              {menuList.map((item: MenuList) => (
                <li
                  className={`p-navbar-tabmenu-item ${GowunBatang.className}`}
                  key={`${item.id}`}
                >
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
              <li className="p-navbar-tabmenu-item-login">
                <Link href="/sign_in">
                  <Button />
                </Link>
              </li>
            </ul>
            <button
              className="m-navbar-tabmenu"
              onClick={toggle}
              role="button"
              aria-label="메뉴 버튼"
            >
              <FontAwesomeIcon icon={faBars} style={{ color: "#2f3438" }} />
              <span className="p-blind">메뉴 버튼</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
