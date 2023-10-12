import { useEffect, useRef } from "react";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../navbar/Button";
import Logo from "../navbar/Logo";

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
  toggle: () => void;
}): JSX.Element {
  let outside = useRef<HTMLDivElement>(null);

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
  });

  const menuList = [
    { id: 1, title: "소개", href: "/abuot" },
    { id: 2, title: "문의/제안", href: "/contacts" },
    { id: 3, title: "모두의 하루", href: "/user" },
    { id: 4, title: "나의 하루", href: "/user" },
    { id: 5, title: "하루쓰기", href: "/user/write" },
  ];

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
            <div className="m-sidebar-logo-wrapper" onClick={toggle}>
              <Logo />
            </div>
            <button className="m-sidebar-tabmenu" onClick={toggle}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#2f3438", verticalAlign: "2.89px" }}
              />
            </button>
          </div>
          <Link href="/sign_in">
            <Button />
          </Link>
          <hr className="m-sidebar-tabmenu-hr" />
          <ul className="m-sidebar-tabmenu-ul">
            {menuList.map((item: MenuList) => (
              <li
                className="m-sidebar-tabmenu-item"
                onClick={toggle}
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
