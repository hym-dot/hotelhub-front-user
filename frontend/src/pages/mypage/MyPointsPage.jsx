import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHistory, faGift } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyPointsPage.scss";

const MyPointsPage = () => {
  const points = 45680;
  const pointHistory = [
    {
      id: 1,
      description: "호텔 예약 적립",
      points: 1350,
      type: "earn",
      date: "2024-12-20",
      bookingId: "RES001",
    },
    {
      id: 2,
      description: "포인트 사용",
      points: -5000,
      type: "use",
      date: "2024-12-15",
      bookingId: "RES002",
    },
    {
      id: 3,
      description: "신규 가입 보너스",
      points: 10000,
      type: "earn",
      date: "2024-12-01",
      bookingId: "WELCOME",
    },
    {
      id: 4,
      description: "리뷰 작성 적립",
      points: 500,
      type: "earn",
      date: "2024-11-28",
      bookingId: "REVIEW001",
    },
    {
      id: 5,
      description: "호텔 예약 적립",
      points: 2840,
      type: "earn",
      date: "2024-11-20",
      bookingId: "RES003",
    },
  ];

  return (
    <div className="my-points-page">
      {/* 포인트 요약 */}
      <section className="points-summary">
        <div className="points-card">
          <div className="points-content">
            <p className="label">총 포인트</p>
            <h1 className="points-value">
              <FontAwesomeIcon icon={faStar} />
              {points.toLocaleString()}
            </h1>
            <p className="description">예약 시 포인트로 사용 가능합니다</p>
          </div>
          <div className="points-icon">
            <FontAwesomeIcon icon={faGift} />
          </div>
        </div>
      </section>

      {/* 포인트 사용 방법 */}
      <section className="points-info">
        <h3>포인트 적립 및 사용</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="icon earn">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h4>포인트 적립</h4>
              <p>호텔 예약 금액의 1% 포인트로 적립됩니다</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon use">
              <FontAwesomeIcon icon={faGift} />
            </div>
            <div>
              <h4>포인트 사용</h4>
              <p>예약 시 1포인트 = 1원으로 사용 가능합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 포인트 내역 */}
      <section className="points-history">
        <h3>
          <FontAwesomeIcon icon={faHistory} />
          포인트 내역
        </h3>

        <div className="history-list">
          {pointHistory.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-left">
                <div className={`history-icon ${item.type}`}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="history-info">
                  <h4>{item.description}</h4>
                  <p className="history-date">{item.date}</p>
                  <p className="history-id">ID: {item.bookingId}</p>
                </div>
              </div>
              <div className="history-right">
                <span className={`points ${item.type}`}>
                  {item.type === "earn" ? "+" : ""}
                  {item.points.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyPointsPage;