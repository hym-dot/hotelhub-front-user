import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { reservationApi } from "../../api/reservationApi";
import "../../styles/pages/mypage/MyBookingsPage.scss";

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const data = await reservationApi.getMyReservations();
        const normalized = (data || []).map((booking) => {
          const checkIn = booking.checkIn || booking.checkInDate;
          const checkOut = booking.checkOut || booking.checkOutDate;
          const nights =
            checkIn && checkOut
              ? Math.max(
                  1,
                  Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
                )
              : booking.nights || 1;
          const price =
            booking.totalPrice ??
            booking.basePrice ??
            booking.price ??
            0;

          return {
            id: booking.id || booking._id || booking.reservationId,
            reservationCode: booking.reservationId || booking.id || booking._id,
            status: booking.status || "pending",
            hotelName: booking.hotelId?.name || booking.hotelName || "호텔",
            location:
              booking.hotelId?.address ||
              booking.location ||
              booking.hotelId?.city ||
              "위치 정보",
            image:
              booking.image ||
              booking.hotelId?.images?.[0] ||
              booking.roomId?.image ||
              "/images/hotel-placeholder.jpg",
            checkIn: checkIn ? new Date(checkIn).toLocaleDateString() : "",
            checkOut: checkOut ? new Date(checkOut).toLocaleDateString() : "",
            guests: booking.guests || booking.guestCount || 1,
            roomType: booking.roomId?.name || booking.roomId?.type || booking.roomType || "객실",
            nights,
            price,
            cancellable: booking.status === "confirmed",
            coords: booking.hotelId?.coords,
            address: booking.hotelId?.address || booking.location || "",
          };
        });
        setBookings(normalized);
      } catch (error) {
        console.error('예약 목록 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="badge confirmed">확정</span>;
      case "completed":
        return <span className="badge completed">완료</span>;
      case "cancelled":
        return <span className="badge cancelled">취소</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1>나의 예약</h1>
        <p>모든 예약 내역을 확인하고 관리하세요</p>
      </div>

      <div className="bookings-tabs">
        <button
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체 ({bookings.length})
        </button>
        <button
          className={`tab-item ${activeTab === "confirmed" ? "active" : ""}`}
          onClick={() => setActiveTab("confirmed")}
        >
          확정된 예약
        </button>
        <button
          className={`tab-item ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          완료된 예약
        </button>
        <button
          className={`tab-item ${activeTab === "cancelled" ? "active" : ""}`}
          onClick={() => setActiveTab("cancelled")}
        >
          취소된 예약
        </button>
      </div>

      <div className="bookings-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Link
              to={`/mypage/bookings/${booking.id}`}
              key={booking.id}
              className="booking-card"
            >
              <div className="booking-image">
                <img src={booking.image} alt={booking.hotelName} />
                {getStatusBadge(booking.status)}
              </div>

              <div className="booking-content">
                <div className="booking-header">
                  <div className="hotel-info">
                    <h3>{booking.hotelName}</h3>
                    <p className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {booking.location}
                    </p>
                  </div>
                  <div className="booking-code">
                    <span className="code-label">예약번호</span>
                    <span className="code-value">{booking.reservationCode}</span>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                      <div className="detail-text">
                        <span className="label">체크인</span>
                        <span className="value">{booking.checkIn}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                      <div className="detail-text">
                        <span className="label">체크아웃</span>
                        <span className="value">{booking.checkOut}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      <div className="detail-text">
                        <span className="label">투숙객</span>
                        <span className="value">{booking.guests}명</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faClock} className="icon" />
                      <div className="detail-text">
                        <span className="label">객실 타입</span>
                        <span className="value">{booking.roomType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="price-section">
                    <span className="nights-label">{booking.nights}박</span>
                    <div className="price-info">
                      <span className="price-label">총 금액</span>
                      <span className="price">₩{Number(booking.price || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-action btn-details">
                      자세히보기
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <h3>예약이 없습니다</h3>
            <p>지금 호텔을 검색해 예약해 보세요.</p>
            <Link to="/search" className="btn-search">
              호텔 검색하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
