"use client";
import { useState } from "react";
import {
  faAngleUp,
  faAngleDown,
  faCommentDots,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className="p-about-main-FAQ-list-item"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={
            isOpen
              ? "p-about-main-FAQ-list-item-header opened"
              : "p-about-main-FAQ-list-item-header"
          }
        >
          <div className="p-about-main-FAQ-list-item-question">
            <div className="p-about-main-FAQ-list-item-Qmark">
              <FontAwesomeIcon icon={faCircleQuestion} width={18} height={18} />
            </div>
            <div>{question}</div>
          </div>
          <div>
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} width={18} height={18} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} width={18} height={18} />
            )}
          </div>
        </div>
        <div className="p-about-main-FAQ-list-item-main__outer">
          {isOpen && (
            <div className="p-about-main-FAQ-list-item-main">
              <div>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  width={18}
                  height={18}
                  style={{ color: "#414a55" }}
                />
              </div>
              <div>{answer}</div>
            </div>
          )}
        </div>
      </li>
    </>
  );
}
