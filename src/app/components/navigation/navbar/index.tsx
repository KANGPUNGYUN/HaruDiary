import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="p-navbar">
      <div className="p-container">
        <div className="p-container__inner p-navbar__inner-container">
          <div className="p-navbar__logo-container">
            <Logo />
            <ul className="p-navbar-tabmenu-ul">
              <li>
                <Link href="/about">
                  <p>소개</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>문의/제안</p>
                </Link>
              </li>
              <li>
                <Button />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
