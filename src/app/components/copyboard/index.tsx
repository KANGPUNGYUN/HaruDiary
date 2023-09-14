"use client";
import { useEffect, useState } from "react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CopyBoard() {
  const [appear, setAppear] = useState("");
  const [next, setNext] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("해당 이메일 주소가 클립보드에 복사되었습니다.");
      })
      .catch(() => {
        alert("복사하기를 실패했습니다.");
      });
  };

  useEffect(() => {
    if (!next) return;
    let timeout = setTimeout(() => {
      setAppear("");
      setNext(false);
    }, 1000);
    return () => {
      setAppear("appear");
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <button
        className="p-contact-email-copy-button"
        onClick={() => {
          copy("zkdvnd@naver.com");
          setNext(true);
        }}
      >
        <span
          className={`p-contact-email-copy-button-text ${next ? "appear" : ""}`}
        >
          복사됨 :)
        </span>
        <FontAwesomeIcon
          icon={faCopy}
          width="10px"
          height="10px"
          color="white"
        />
      </button>
    </>
  );
}
