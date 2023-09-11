import { useEffect, useRef } from "react";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../navbar/Button";
import Logo from "../navbar/Logo";

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
            <li className="m-sidebar-tabmenu-item" onClick={toggle}>
              <Link href="/about">
                <div>소개</div>
              </Link>
            </li>
            <li className="m-sidebar-tabmenu-item" onClick={toggle}>
              <Link href="/contacts">
                <div>문의/제안</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
