"use client";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  return (
    <>
      <div className="modal">
        <h1>Modal title</h1>
        <p>Body</p>
        <button>확인</button>
        <button onClick={router.back}>취소</button>
      </div>
    </>
  );
}
