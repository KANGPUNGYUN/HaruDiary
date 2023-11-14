"use client";
import Link from "next/link";
import {
  faGithub,
  faLinkedinIn,
  faVimeoV,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyBoard from "../copyboard";

export default function Footer() {
  return (
    <>
      <footer className="p-footer">
        <div className="p-footer__inner">
          <address className="p-footer__address">
            <div className="p-footer__address__company">
              <strong className="p-footer__address__company-name">
                하루쓰기 | Haru Diary
              </strong>
            </div>
            <div className="p-footer__address__company-rules">
              <Link href="/about">서비스 소개</Link>
              <Link href="/policy">이용약관</Link>
              <Link href="/privacy">개인정보처리방침</Link>
            </div>
            Developer : 강풍윤
            <br />
            e-mail : zkdvnd@naver.com <CopyBoard />
          </address>
          <ul className="p-footer__social-list">
            <li className="p-footer__social-list-item">
              <Link href="https://github.com/KANGPUNGYUN">
                <FontAwesomeIcon
                  className="p-footer__social-list-item__icon"
                  icon={faGithub}
                />
                <span className="p-blind">강풍윤의 깃허브 사이트 이동하기</span>
              </Link>
            </li>
            <li className="p-footer__social-list-item">
              <Link href="https://www.linkedin.com/in/pung-yun-kang-b2677a212/">
                <FontAwesomeIcon
                  className="p-footer__social-list-item__icon"
                  icon={faLinkedinIn}
                />
                <span className="p-blind">
                  강풍윤의 링크드인 사이트 이동하기
                </span>
              </Link>
            </li>
            <li className="p-footer__social-list-item">
              <Link href="https://velog.io/@kangpungyun">
                <FontAwesomeIcon
                  className="p-footer__social-list-item__icon"
                  icon={faVimeoV}
                />
                <span className="p-blind">강풍윤의 벨로그 사이트 이동하기</span>
              </Link>
            </li>
          </ul>
          <div className="p-footer__copyright">
            Copyright 2023. KANGPUNGYUN. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
