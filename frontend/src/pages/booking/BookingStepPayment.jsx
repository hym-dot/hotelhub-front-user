import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { reservationApi } from '../../api/reservationApi';
import { paymentApi } from '../../api/paymentApi';
import '../../styles/pages/booking/BookingStepPayment.scss';

const BookingStepPayment = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [paymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const tossClientKey =
    import.meta.env.VITE_TOSS_CLIENT_KEY || 'test_ck_vZnjEJeQVxLR916Jw7ePVPmOoBN0';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const loadTossPayments = () =>
    new Promise((resolve, reject) => {
      if (window.TossPayments) {
        resolve(window.TossPayments);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.tosspayments.com/v1/payment';
      script.onload = () => resolve(window.TossPayments);
      script.onerror = reject;
      document.head.appendChild(script);
    });

  const fetchReservationDetail = async (reservationId) => {
    if (!reservationId) return null;
    try {
      const detail = await reservationApi.getReservationDetail(reservationId);
      return detail;
    } catch (err) {
      console.error('예약 상세 조회 실패:', err);
      return null;
    }
  };

  const confirmIfRedirected = async () => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = Number(searchParams.get('amount'));
    const reservationId = searchParams.get('reservationId') || bookingData?.reservationId;

    if (!paymentKey || !orderId || !amount || !reservationId) return;

    setLoading(true);
    try {
      const result = await paymentApi.confirmPayment({
        paymentKey,
        orderId,
        amount,
        reservationId,
        roomId: bookingData?.roomType?._id || bookingData?.roomType?.id,
        customerName: formData.fullName || bookingData?.payerName,
        customerEmail: formData.email || bookingData?.email,
        customerPhone: formData.phone || bookingData?.phone,
      });

      const detail = await fetchReservationDetail(reservationId);

      setBookingData((prev) => ({
        ...prev,
        reservationId: result?.reservationId || reservationId,
        paymentMethod,
        totalPrice: result?.totalAmount || detail?.totalPrice || prev.totalPrice || amount,
        hotel: detail?.hotelId || prev.hotel,
        roomType: detail?.roomId || prev.roomType,
        checkIn: detail?.checkIn || prev.checkIn,
        checkOut: detail?.checkOut || prev.checkOut,
        guests: detail?.guests || prev.guests,
        nights:
          prev.nights ||
          (detail?.checkIn && detail?.checkOut
            ? Math.max(
                1,
                Math.ceil((new Date(detail.checkOut) - new Date(detail.checkIn)) / (1000 * 60 * 60 * 24))
              )
            : 1),
        email: formData.email || prev.email,
        phone: formData.phone || prev.phone,
        payerName: formData.fullName || prev.payerName,
      }));

      navigate(`/booking/${hotelId}/complete`);
    } catch (error) {
      console.error('결제 승인 실패:', error);
      alert(error.response?.data?.message || error.message || '결제 승인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    confirmIfRedirected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePayment = async () => {
    if (!formData.agreeTerms) {
      alert('이용 약관에 동의해주세요.');
      return;
    }

    if (!bookingData.roomType) {
      alert('객실을 선택해주세요.');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('체크인/체크아웃 정보를 먼저 선택해주세요.');
      navigate(`/booking/${hotelId}`);
      return;
    }

    if (!tossClientKey) {
      alert('Toss Payments 클라이언트 키가 설정되지 않았습니다.');
      return;
    }

    setLoading(true);
    try {
      const reservationPayload = {
        hotelId: hotelId,
        roomId: bookingData.roomType._id || bookingData.roomType.id,
        checkIn: bookingData.checkIn || bookingData.checkInDate?.toISOString().split('T')[0],
        checkOut: bookingData.checkOut || bookingData.checkOutDate?.toISOString().split('T')[0],
        guests: bookingData.guests || bookingData.guestCount || 1,
      };

      if (bookingData.extras && bookingData.extras.length > 0) {
        reservationPayload.extras = bookingData.extras;
      }

      const reservation = await reservationApi.createReservation(reservationPayload);
      const reservationId = reservation._id || reservation.id;
      const amount = reservation.totalPrice || bookingData.totalPrice || 0;
      const orderId = `order-${reservationId}`;
      const orderName = `${bookingData.hotel?.name || 'Hotel'} - ${bookingData.roomType?.name || 'Room'}`;

      setBookingData((prev) => ({
        ...prev,
        reservationId,
        paymentMethod,
        totalPrice: amount,
        hotel: reservation.hotel || prev.hotel,
        roomType: reservation.roomType || prev.roomType,
        checkIn: reservation.checkIn || prev.checkIn,
        checkOut: reservation.checkOut || prev.checkOut,
        guests: reservation.guests || prev.guests,
        nights: reservation.nights || prev.nights,
        email: formData.email,
        phone: formData.phone,
        payerName: formData.fullName,
      }));

      const tossPaymentsCtor = await loadTossPayments();
      const tossPayments = tossPaymentsCtor(tossClientKey);

      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set('reservationId', reservationId);
      successUrl.searchParams.set('orderId', orderId);
      successUrl.searchParams.set('amount', amount);

      const failUrl = new URL(window.location.href);
      failUrl.searchParams.set('reservationId', reservationId);
      failUrl.searchParams.set('orderId', orderId);
      failUrl.searchParams.set('amount', amount);

      await tossPayments.requestPayment('CARD', {
        amount,
        orderId,
        orderName,
        successUrl: successUrl.toString(),
        failUrl: failUrl.toString(),
        customerName: formData.fullName || '고객',
        customerEmail: formData.email,
        customerMobilePhone: formData.phone,
      });
    } catch (error) {
      console.error('결제 요청 실패:', error.response?.data || error.message);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        '결제 요청에 실패했습니다.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/booking/${hotelId}/extras`);
  };

  const nights =
    bookingData.nights ||
    (bookingData.checkInDate && bookingData.checkOutDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1);

  const pricePerNight =
    bookingData.pricePerNight || bookingData.roomType?.price || bookingData.hotel?.price || 0;
  const extrasTotal = bookingData.extrasTotal || 0;
  const roomTotal =
    pricePerNight > 0
      ? pricePerNight * nights
      : Math.max(0, (bookingData.totalPrice || 0) - extrasTotal);
  const calculatedTotal = roomTotal + extrasTotal;
  const totalPrice = bookingData.totalPrice || calculatedTotal;
  const extrasCount = bookingData.extras?.length || bookingData.extrasDetail?.length || 0;

  return (
    <div className="booking-step-payment">
      <div className="payment-grid">
        <div className="order-summary-section">
          <div className="order-summary">
            <h3>결제 요약</h3>

            <div className="summary-items">
              <div className="summary-item">
                <span>객실 ({nights}박)</span>
                <span className="price">₩{roomTotal.toLocaleString()}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="summary-item">
                  <span>추가 옵션 {extrasCount > 0 ? `(${extrasCount}개)` : ''}</span>
                  <span className="price">+₩{extrasTotal.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>총 결제 금액</span>
              <span className="price">₩{totalPrice.toLocaleString()}</span>
            </div>

            <div className="security-badge">
              <FontAwesomeIcon icon={faLock} />
              <span>안전한 결제 보안</span>
            </div>
          </div>
        </div>

        <div className="payment-form-section">
          <h2>결제 정보를 입력하세요</h2>

          <div className="payment-methods">
            <button
              type="button"
              className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
              onClick={() => handlePayment()}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span>카드/간편결제</span>
            </button>
          </div>

          <div className="contact-fields">
            <label>이름</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="결제자 이름"
            />

            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
            />

            <label>휴대폰 번호</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
            />
          </div>

          <div className="terms">
            <label>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <span>결제 약관 및 환불 정책에 동의합니다.</span>
            </label>
          </div>

          <div className="navigation-buttons">
            <button type="button" className="btn-back" onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
              이전 단계
            </button>
            <button type="button" className="btn-next" onClick={handlePayment} disabled={loading}>
              결제 요청하기
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepPayment;
