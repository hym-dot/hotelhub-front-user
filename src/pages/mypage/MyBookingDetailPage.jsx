import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faEnvelope,
  faArrowLeft,
  faDownload,
  faPrint,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyBookingDetailPage.scss";

const MyBookingDetailPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = {
    id: bookingId,
    hotelName: "CVK Park Bosphorus Hotel Istanbul",
    location: "Istanbul, Turkey",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    guests: 2,
    roomType: "Superior Room",
    price: 450,
    totalPrice: 1350,
    status: "confirmed",
    image: "/images/hotel1.jpg",
    reservationCode: "RES001",
    nights: 3,
    guestName: "김철수",
    guestEmail: "kim@example.com",
    guestPhone: "010-1234-5678",
    bookingDate: "2024-12-20",
    amenities: ["WiFi", "수영장", "스파", "레스토랑"],
    cancellationPolicy: "예약 7일 전까지 전액 환불 가능",
  };

  return (
    <div className="booking-detail-page">
      {/* 헤더 */}
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          돌아가기
        </button>
        <h1>예약 상세정보</h1>
        <div className="header-actions">
          <button className="btn-action">
            <FontAwesomeIcon icon={faDownload} /> 영수증
          </button>
          <button className="btn-action">
            <FontAwesomeIcon icon={faPrint} /> 출력
          </button>
        </div>
      </div>

      {/* 상태 배너 */}
      <div className="status-banner confirmed">
        <div className="status-content">
          <h2>예약이 확정되었습니다</h2>
          <p>예약번호: {booking.reservationCode}</p>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="detail-content">
        {/* 호텔 정보 */}
        <section className="section">
          <h3>숙박 정보</h3>
          <div className="hotel-info">
            <div className="hotel-image">
              <img src={booking.image} alt={booking.hotelName} />
            </div>
            <div className="hotel-details">
              <h2>{booking.hotelName}</h2>
              <p className="location">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {booking.location}
              </p>
              <div className="amenities-grid">
                {booking.amenities.map((amenity, idx) => (
                  <span key={idx} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 예약 날짜 및 기본 정보 */}
        <section className="section">
          <h3>예약 기본정보</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">체크인</span>
              <span className="value">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {booking.checkIn}
              </span>
            </div>
            <div className="info-item">
              <span className="label">체크아웃</span>
              <span className="value">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {booking.checkOut}
              </span>
            </div>
            <div className="info-item">
              <span className="label">숙박일수</span>
              <span className="value">
                <FontAwesomeIcon icon={faClock} />
                {booking.nights}박
              </span>
            </div>
            <div className="info-item">
              <span className="label">객실</span>
              <span className="value">{booking.roomType}</span>
            </div>
            <div className="info-item">
              <span className="label">숙박자</span>
              <span className="value">
                <FontAwesomeIcon icon={faUser} />
                {booking.guests}명
              </span>
            </div>
            <div className="info-item">
              <span className="label">1박 금액</span>
              <span className="value">₩{booking.price.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* 고객 정보 */}
        <section className="section">
          <h3>고객정보</h3>
          <div className="customer-info">
            <div className="info-row">
              <span className="label">이름</span>
              <span className="value">{booking.guestName}</span>
            </div>
            <div className="info-row">
              <span className="label">이메일</span>
              <span className="value">
                <FontAwesomeIcon icon={faEnvelope} />
                {booking.guestEmail}
              </span>
            </div>
            <div className="info-row">
              <span className="label">전화</span>
              <span className="value">
                <FontAwesomeIcon icon={faPhone} />
                {booking.guestPhone}
              </span>
            </div>
          </div>
        </section>

        {/* 결제 정보 */}
        <section className="section">
          <h3>결제정보</h3>
          <div className="payment-info">
            <div className="payment-row">
              <span>1박 금액 × {booking.nights}박</span>
              <span>₩{(booking.price * booking.nights).toLocaleString()}</span>
            </div>
            <div className="payment-row discount">
              <span>할인</span>
              <span>-₩0</span>
            </div>
            <div className="payment-row total">
              <span>총 결제금액</span>
              <span>₩{booking.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* 취소 정책 */}
        <section className="section">
          <h3>취소 정책</h3>
          <div className="policy-box">
            <p>{booking.cancellationPolicy}</p>
          </div>
        </section>

        {/* 액션 버튼 */}
        <section className="section action-section">
          <button className="btn-primary">리뷰 작성</button>
          <button className="btn-secondary">예약 취소</button>
        </section>
      </div>
    </div>
  );
};

export default MyBookingDetailPage;