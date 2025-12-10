import React, { useState } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBed, faGift, faCreditCard, faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingStepLayout.scss';

const BookingStepLayout = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState({
    hotelId,
    checkInDate: null,
    checkOutDate: null,
    roomType: null,
    guestCount: 1,
    extras: [],
    paymentMethod: null,
    totalPrice: 0,
  });

  const steps = [
    { id: 'dates', label: 'Dates', icon: faCalendarAlt, path: '' },
    { id: 'room', label: 'Room', icon: faBed, path: 'room' },
    { id: 'extras', label: 'Extras', icon: faGift, path: 'extras' },
    { id: 'payment', label: 'Payment', icon: faCreditCard, path: 'payment' },
  ];

  const currentStepIndex = steps.findIndex((step) => {
    const currentPath = location.pathname.split('/').pop();
    return step.path === '' ? currentPath === hotelId : currentPath === step.path;
  });

  const handleStepClick = (stepPath) => {
    if (stepPath === '') {
      navigate(`/booking/${hotelId}`);
    } else {
      navigate(`/booking/${hotelId}/${stepPath}`);
    }
  };

  return (
    <div className="booking-step-layout">
      <div className="container">
        {/* 상단 네비게이션 */}
        <div className="booking-header">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>뒤로</span>
          </button>
          <button className="btn-home" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faHome} />
            <span>홈으로</span>
          </button>
        </div>

        {/* 진행 상황 표시 */}
        <div className="booking-progress">
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div key={step.id} className="step-item">
                <div
                  className={`step-circle ${index <= currentStepIndex ? 'active' : ''} ${
                    index === currentStepIndex ? 'current' : ''
                  }`}
                  onClick={() => handleStepClick(step.path)}
                >
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <span className="step-label">{step.label}</span>
                {index < steps.length - 1 && (
                  <div className={`step-line ${index < currentStepIndex ? 'active' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="booking-content">
          <Outlet context={{ bookingData, setBookingData, navigate }} />
        </div>
      </div>
    </div>
  );
};

export default BookingStepLayout;