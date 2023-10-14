"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  return (
    <>
      <div className="modal__outer">
        <div className="modal">
          <button className="modal-escape" onClick={router.back}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h1 className="modal-title">정상적으로 일기가 작성되었습니다.</h1>
          <div className="modal-button__outer">
            <button type="submit" className="modal-button confirm">
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
