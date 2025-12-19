import React, { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCheck,
  faParking,
  faWifi,
  faConciergeBell,
  faSpa,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingStepExtras.scss';

const BookingStepExtras = () => {
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const { hotelId } = useParams();
  const [selectedExtras, setSelectedExtras] = useState(bookingData.extras || []);

  const extras = [
    {
      id: 1,
      name: '공항 픽업',
      description: '인천/김포 ↔ 호텔 전용 차량 이동',
      icon: faConciergeBell,
      price: 45000,
      selected: false,
    },
    {
      id: 2,
      name: '주차',
      description: '투숙 기간 내내 주차',
      icon: faParking,
      price: 20000,
      selected: false,
    },
    {
      id: 3,
      name: '조식 뷔페',
      description: '1인 기준 조식 뷔페 제공',
      icon: faConciergeBell,
      price: 18000,
      selected: false,
    },
    {
      id: 4,
      name: '스파 패키지',
      description: '사우나 + 마사지 60분',
      icon: faSpa,
      price: 80000,
      selected: false,
    },
    {
      id: 5,
      name: '레이트 체크아웃',
      description: '오후 4시까지 체크아웃 연장',
      icon: faConciergeBell,
      price: 25000,
      selected: false,
    },
    {
      id: 6,
      name: '얼리 체크인',
      description: '정오 12시 이전 입실 보장',
      icon: faWifi,
      price: 30000,
      selected: false,
    },
  ];

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) => {
      if (prev.includes(extraId)) {
        return prev.filter((id) => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };

  const selectedExtrasDetails = extras.filter((extra) => selectedExtras.includes(extra.id));
  const totalExtrasPrice = selectedExtrasDetails.reduce((sum, extra) => sum + extra.price, 0);

  const handleNext = () => {
    setBookingData((prev) => {
      const baseAmount = (prev.totalPrice || 0) - (prev.extrasTotal || 0);
      const recalculatedBase =
        baseAmount > 0 ? baseAmount : (prev.pricePerNight || 0) * (prev.nights || 1);
      return {
        ...prev,
        extras: selectedExtras,
        extrasDetail: selectedExtrasDetails,
        extrasTotal: totalExtrasPrice,
        totalPrice: recalculatedBase + totalExtrasPrice,
      };
    });
    navigate(`/booking/${hotelId}/payment`);
  };

  const handleBack = () => {
    navigate(`/booking/${hotelId}/room`);
  };

  const skipExtras = () => {
    setBookingData((prev) => {
      const baseAmount = (prev.totalPrice || 0) - (prev.extrasTotal || 0);
      const recalculatedBase =
        baseAmount > 0 ? baseAmount : (prev.pricePerNight || 0) * (prev.nights || 1);
      return {
        ...prev,
        extras: [],
        extrasDetail: [],
        extrasTotal: 0,
        totalPrice: recalculatedBase,
      };
    });
    navigate(`/booking/${hotelId}/payment`);
  };

  return (
    <div className="booking-step-extras">
      <h2>추가 서비스를 선택하세요</h2>
      <p className="subtitle">국내 호텔 투숙 시 자주 선택되는 옵션을 준비했어요</p>

      <div className="extras-grid">
        {extras.map((extra) => (
          <div
            key={extra.id}
            className={`extra-card ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
            onClick={() => toggleExtra(extra.id)}
          >
            <div className="extra-header">
              <div className="icon-box">
                <FontAwesomeIcon icon={extra.icon} />
              </div>
              <div className="extra-title">
                <h3>{extra.name}</h3>
                <p>{extra.description}</p>
              </div>
            </div>

            <div className="extra-footer">
              <span className="price">+₩{extra.price.toLocaleString()}</span>
              <div className={`checkbox ${selectedExtras.includes(extra.id) ? 'checked' : ''}`}>
                {selectedExtras.includes(extra.id) && <FontAwesomeIcon icon={faCheck} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 비용 요약 */}
      {selectedExtras.length > 0 && (
        <div className="extras-summary">
          <h3>선택한 추가 옵션</h3>
          <div className="summary-list">
            {selectedExtrasDetails.map((extra) => (
              <div key={extra.id} className="summary-item">
                <span>{extra.name}</span>
                <span className="price">+₩{extra.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>추가 옵션 금액</span>
            <span className="price">₩{totalExtrasPrice.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* 네비게이션 버튼 */}
      <div className="navigation-buttons">
        <button className="btn-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          이전 단계
        </button>
        {selectedExtras.length > 0 && (
          <button className="btn-skip" onClick={skipExtras}>
            추가 옵션 건너뛰기
          </button>
        )}
        <button className="btn-next" onClick={handleNext}>
          결제 단계로 이동
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default BookingStepExtras;
