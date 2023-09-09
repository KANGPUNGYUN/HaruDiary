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
  return (
    <>
      <div
        className="m-sidebar-outer"
        style={{
          display: `${isOpen ? "block" : "none"}`,
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
        }}
      >
        <div className="m-sidebar">
          <div className="m-sidebar-top">
            <Logo />
            <button className="m-sidebar-tabmenu" onClick={toggle}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#2f3438", verticalAlign: "2.89px" }}
              />
            </button>
          </div>
          <Button />
          <hr className="m-sidebar-tabmenu-hr" />
          <ul className="m-sidebar-tabmenu-ul">
            <li className="m-sidebar-tabmenu-item">
              <Link href="/about">
                <div>소개</div>
              </Link>
            </li>
            <li className="m-sidebar-tabmenu-item">
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
