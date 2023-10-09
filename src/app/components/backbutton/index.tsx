"use client";
import { useRouter } from "next/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="p-back-button" onClick={() => router.back()}>
      <FontAwesomeIcon icon={faChevronLeft} /> 이전 페이지
    </div>
  );
}
