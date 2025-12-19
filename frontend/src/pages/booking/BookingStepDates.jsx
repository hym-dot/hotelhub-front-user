import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { hotelApi } from '../../api/hotelApi';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/pages/booking/BookingStepDates.scss';

const BookingStepDates = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const { bookingData, setBookingData, navigate } = useOutletContext();

  const urlCheckIn = searchParams.get('checkIn');
  const urlCheckOut = searchParams.get('checkOut');
  const urlGuests = searchParams.get('guests');

  const [checkInDate, setCheckInDate] = useState(
    bookingData?.checkInDate || (urlCheckIn ? new Date(urlCheckIn) : new Date())
  );
  const [checkOutDate, setCheckOutDate] = useState(
    bookingData?.checkOutDate || (urlCheckOut ? new Date(urlCheckOut) : new Date(new Date().getTime() + 86400000))
  );
  const [guestCount, setGuestCount] = useState(
    bookingData?.guestCount || (urlGuests ? Number(urlGuests) : 1)
  );
  const [roomCount, setRoomCount] = useState(bookingData?.roomCount || 1);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true);
      try {
        const data = await hotelApi.getHotelDetail(hotelId);
        setHotel({
          ...(data?.hotel || data || {}),
          rooms: data?.rooms || [],
        });
      } catch (error) {
        console.error('호텔 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      loadHotel();
    }
  }, [hotelId]);

  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  const minRoomPrice = Array.isArray(hotel?.rooms)
    ? Math.min(
        ...hotel.rooms
          .map((r) => r?.price)
          .filter((v) => typeof v === 'number' && !Number.isNaN(v)),
        Infinity
      )
    : Infinity;
  const pricePerNight =
    (typeof hotel?.price === 'number' && !Number.isNaN(hotel.price) && hotel.price > 0
      ? hotel.price
      : typeof hotel?.basePrice === 'number' && !Number.isNaN(hotel.basePrice) && hotel.basePrice > 0
        ? hotel.basePrice
        : minRoomPrice !== Infinity
          ? minRoomPrice
          : 0);
  const totalPrice = nights * pricePerNight;

  const handleNext = () => {
    setBookingData((prev) => ({
      ...prev,
      checkIn: checkInDate?.toISOString().split('T')[0],
      checkOut: checkOutDate?.toISOString().split('T')[0],
      checkInDate,
      checkOutDate,
      guests: guestCount,
      guestCount,
      roomCount,
      nights,
      pricePerNight,
      totalPrice,
      hotel: hotel,
    }));
    navigate(`/booking/${hotelId}/room`);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>호텔 정보를 불러오는 중...</div>;
  if (!hotel) return <div style={{ padding: '2rem', textAlign: 'center' }}>호텔 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="booking-step-dates">
      <div className="dates-grid">
        {/* 좌측: 호텔 정보 카드 */}
        <div className="hotel-card-section">
          <div className="hotel-card">
            <img
              src={hotel?.images?.[0] || hotel?.image || '/images/hotel-placeholder.jpg'}
              alt={hotel?.name || 'Hotel'}
              className="hotel-image"
            />
            <div className="hotel-info">
              <h3>{hotel?.name || '호텔 이름'}</h3>
              <p>{hotel?.address || hotel?.location || '위치 정보'}</p>
              <div className="price-info">
                <span className="price">₩{pricePerNight.toLocaleString()}</span>
                <span className="unit">/1박</span>
              </div>
            </div>
          </div>
        </div>

        {/* 우측: 날짜 선택 영역 */}
        <div className="date-form-section">
          <h2>투숙 날짜를 선택하세요</h2>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} />
              체크인 날짜
            </label>
            <DatePicker
              selected={checkInDate}
              onChange={setCheckInDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="date-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} />
              체크아웃 날짜
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={setCheckOutDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date(checkInDate.getTime() + 86400000)}
              className="date-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUsers} />
                투숙객 수
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="number-input"
              />
            </div>
            <div className="form-group">
              <label>객실 수</label>
              <input
                type="number"
                min="1"
                max="5"
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
                className="number-input"
              />
            </div>
          </div>

          {/* 예약 요약 */}
          <div className="booking-summary">
            <h3>예약 요약</h3>
            <div className="summary-row">
              <span>숙박 일정</span>
              <span className="value">{nights}박</span>
            </div>
            <div className="summary-row">
              <span>1박 요금</span>
              <span className="value">₩{pricePerNight.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>투숙객 수</span>
              <span className="value">{guestCount}</span>
            </div>
            <div className="summary-row">
              <span>객실 수</span>
              <span className="value">{roomCount}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>예상 결제 금액</span>
              <span className="value">₩{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* 다음 버튼 */}
          <button className="btn-next" onClick={handleNext}>
            객실 선택으로 이동
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepDates;
