"use client";
import { useState } from "react";
import Link from "next/link";
import {
  faGithub,
  faLinkedinIn,
  faVimeoV,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  return (
    <>
      <footer className="p-footer">
        <div className="p-footer__inner">
          <address className="p-footer__address">
            <strong className="p-footer__address__company-name">
              하루쓰기 | Haru Diary
            </strong>
            Developer : 강풍윤
            <br />
            e-mail : zkdvnd@naver.com
          </address>
          <ul className="p-footer__social-list">
            <Link
              href="https://github.com/KANGPUNGYUN"
              className="p-footer__social-list-item"
              onMouseOver={() => setIsHover1(true)}
              onMouseLeave={() => setIsHover1(false)}
            >
              <FontAwesomeIcon
                className="p-footer__social-list-item__icon"
                icon={faGithub}
                style={isHover1 ? { color: "#ffffff" } : { color: "#8b8d91" }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/pungyun-kang-b2677a212/"
              className="p-footer__social-list-item"
              onMouseOver={() => setIsHover2(true)}
              onMouseLeave={() => setIsHover2(false)}
            >
              <FontAwesomeIcon
                className="p-footer__social-list-item__icon"
                icon={faLinkedinIn}
                style={isHover2 ? { color: "#ffffff" } : { color: "#8b8d91" }}
              />
            </Link>
            <Link
              href="https://velog.io/@kangpungyun"
              className="p-footer__social-list-item"
              onMouseOver={() => setIsHover3(true)}
              onMouseLeave={() => setIsHover3(false)}
            >
              <FontAwesomeIcon
                className="p-footer__social-list-item__icon"
                icon={faVimeoV}
                style={isHover3 ? { color: "#ffffff" } : { color: "#8b8d91" }}
              />
            </Link>
          </ul>
          <div className="p-footer__copyright">
            Copyright 2023. KANGPUNGYUN. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
