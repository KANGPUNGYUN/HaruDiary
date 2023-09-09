import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar({ toggle }: { toggle: () => void }) {
  return (
    <nav className="p-navbar">
      <div className="p-container">
        <div className="p-container__inner p-navbar__inner-container">
          <div className="p-navbar__logo-container">
            <Logo />
            <ul className="p-navbar-tabmenu-ul">
              <li className="p-navbar-tabmenu-item">
                <Link href="/about">소개</Link>
              </li>
              <li className="p-navbar-tabmenu-item">
                <Link href="/contacts">문의/제안</Link>
              </li>
              <li className="p-navbar-tabmenu-item-login">
                <Button />
              </li>
            </ul>
            <button className="m-navbar-tabmenu" onClick={toggle}>
              <FontAwesomeIcon icon={faBars} style={{ color: "#2f3438" }} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
