import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MenuList {
  id: Number;
  title: string;
  href: string;
}

export default function Navbar({ toggle }: { toggle: () => void }) {
  const menuList = [
    { id: 1, title: "소개", href: "/abuot" },
    { id: 2, title: "문의/제안", href: "/contacts" },
    { id: 3, title: "모두의 하루", href: "/user" },
    { id: 4, title: "나의 하루", href: "/user" },
    { id: 5, title: "하루쓰기", href: "/user/write" },
  ];
  return (
    <nav className="p-navbar">
      <div className="p-container">
        <div className="p-container__inner p-navbar__inner-container">
          <div className="p-navbar__logo-container">
            <Logo />
            <ul className="p-navbar-tabmenu-ul">
              {menuList.map((item: MenuList) => (
                <li className="p-navbar-tabmenu-item" key={`${item.id}`}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
              <li className="p-navbar-tabmenu-item-login">
                <Link href="/sign_in">
                  <Button />
                </Link>
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
