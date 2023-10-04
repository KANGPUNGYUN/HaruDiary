import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "하루쓰기 | 모두의 일기",
  description: "당신의 하루를 작성하세요",
};

export default function Diary() {
  return (
    <>
      <div className="p-diary-main-outter">
        <main className="p-diary-main">
          <h2 className="p-diary-year">2023</h2>
          <ol className="p-diary-month-list">
            <li className="p-diary-month-item">
              <h3 className="p-diary-month">December</h3>
              <ol className="p-diary-list">
                <li className="p-diary-item">
                  <Link href="/">
                    <div className="p-diary-item-day">01</div>
                    <div className="p-diary-item-week">WED</div>
                  </Link>
                </li>
                <li className="p-diary-item">
                  <Link href="/">
                    <div className="p-diary-item-day">02</div>
                    <div className="p-diary-item-week">THU</div>
                  </Link>
                </li>
                <li className="p-diary-item">
                  <Link href="/">
                    <div className="p-diary-item-day">03</div>
                    <div className="p-diary-item-week">FRI</div>
                  </Link>
                </li>
                <li
                  className="p-diary-item"
                  style={{ backgroundColor: "#009fce" }}
                >
                  <Link href="/">
                    <div className="p-diary-item-day">04</div>
                    <div className="p-diary-item-week">SAT</div>
                  </Link>
                </li>
                <li
                  className="p-diary-item"
                  style={{ backgroundColor: "#009fce" }}
                >
                  <Link href="/">
                    <div className="p-diary-item-day">05</div>
                    <div className="p-diary-item-week">SUN</div>
                  </Link>
                </li>
              </ol>
            </li>
            <li className="p-diary-month-item">
              <h3 className="p-diary-month">November</h3>
              <ol className="p-diary-list">
                <li className="p-diary-item empty">
                  <Link href="/">
                    <div className="p-diary-item-add">+</div>
                  </Link>
                </li>
              </ol>
            </li>
            <li className="p-diary-month-item">
              <h3 className="p-diary-month">October</h3>
              <div className="p-diary-list__outer">
                <ol className="p-diary-list">
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">04</div>
                      <div className="p-diary-item-week">WED</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">05</div>
                      <div className="p-diary-item-week">THU</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">06</div>
                      <div className="p-diary-item-week">FRI</div>
                    </Link>
                  </li>
                  <li
                    className="p-diary-item"
                    style={{ backgroundColor: "#009fce" }}
                  >
                    <Link href="/">
                      <div className="p-diary-item-day">07</div>
                      <div className="p-diary-item-week">SAT</div>
                    </Link>
                  </li>
                  <li
                    className="p-diary-item"
                    style={{ backgroundColor: "#009fce" }}
                  >
                    <Link href="/">
                      <div className="p-diary-item-day">08</div>
                      <div className="p-diary-item-week">SUN</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">09</div>
                      <div className="p-diary-item-week">MON</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">10</div>
                      <div className="p-diary-item-week">TUE</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">11</div>
                      <div className="p-diary-item-week">WEN</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">12</div>
                      <div className="p-diary-item-week">THU</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">13</div>
                      <div className="p-diary-item-week">FRI</div>
                    </Link>
                  </li>
                  <li
                    className="p-diary-item"
                    style={{ backgroundColor: "#009fce" }}
                  >
                    <Link href="/">
                      <div className="p-diary-item-day">14</div>
                      <div className="p-diary-item-week">SAT</div>
                    </Link>
                  </li>
                  <li
                    className="p-diary-item"
                    style={{ backgroundColor: "#009fce" }}
                  >
                    <Link href="/">
                      <div className="p-diary-item-day">15</div>
                      <div className="p-diary-item-week">SUN</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">16</div>
                      <div className="p-diary-item-week">MON</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">17</div>
                      <div className="p-diary-item-week">TUE</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">18</div>
                      <div className="p-diary-item-week">WEN</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">19</div>
                      <div className="p-diary-item-week">THU</div>
                    </Link>
                  </li>
                  <li className="p-diary-item">
                    <Link href="/">
                      <div className="p-diary-item-day">20</div>
                      <div className="p-diary-item-week">FRI</div>
                    </Link>
                  </li>
                  <li
                    className="p-diary-item"
                    style={{ backgroundColor: "#009fce" }}
                  >
                    <Link href="/">
                      <div className="p-diary-item-day">21</div>
                      <div className="p-diary-item-week">SAT</div>
                    </Link>
                  </li>
                </ol>
              </div>
            </li>
          </ol>
        </main>
      </div>
    </>
  );
}
