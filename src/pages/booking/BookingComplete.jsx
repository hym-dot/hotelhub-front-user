import { useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDownload, faHome, faCalendarAlt, faUsers, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingComplete.scss';

const BookingComplete = () => {
  const navigate = useNavigate();
  const { bookingData } = useOutletContext();

  const handleDownload = () => {
    // PDF 다운로드 로직
    alert('예약 확인서를 다운로드합니다.');
  };

  const handlePrint = () => {
    // 인쇄 로직
    window.print();
  };

  if (!bookingData || !bookingData.reservationId) {
    return (
      <div className="booking-complete-page">
        <div className="error-header">
          <h1>예약 정보를 찾을 수 없습니다.</h1>
          <button className="btn-home" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faHome} />
            홈으로
          </button>
        </div>
      </div>
    );
  }

  const displayData = {
    confirmationNumber: bookingData.reservationId || 'N/A',
    bookingDate: new Date().toLocaleDateString(),
    hotelName: bookingData.hotel?.name || '호텔',
    location: bookingData.hotel?.address || '위치 정보',
    checkInDate: bookingData.checkIn || bookingData.checkInDate,
    checkOutDate: bookingData.checkOut || bookingData.checkOutDate,
    nights: bookingData.nights || 1,
    roomType: bookingData.roomType?.name || bookingData.roomType || '객실',
    guests: bookingData.guests || bookingData.guestCount || 1,
    totalPrice: bookingData.totalPrice || 0,
    email: bookingData.email || bookingData.contactEmail || '입력된 이메일 없음',
    phone: bookingData.phone || bookingData.contactPhone || '',
  };

  return (
    <div className="booking-complete-page">
      <div className="success-header">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <h1>예약이 완료되었습니다!</h1>
        <p>
          {displayData.email && displayData.email !== '입력된 이메일 없음'
            ? `예약 확인 메일이 ${displayData.email}로 발송되었습니다.`
            : '예약 확인 메일은 예약 시 입력한 이메일로 발송됩니다.'}
        </p>
      </div>

      <div className="container">
        <div className="booking-summary">
          <div className="confirmation-section">
            <h2>예약 확인번호</h2>
            <div className="confirmation-number">{displayData.confirmationNumber}</div>
            <p className="confirmation-note">
              예약과 관련된 문의사항이 있으실 때는 이 확인번호를 알려주세요.
            </p>
          </div>

          <div className="booking-details">
            <h2>예약 정보</h2>

            <div className="details-grid">
              {/* 호텔 정보 */}
              <div className="detail-group">
                <label>호텔</label>
                <h3>{displayData.hotelName}</h3>
                <p>{displayData.location}</p>
              </div>

              {/* 체크인/아웃 */}
              <div className="detail-group">
                <label>체크인 날짜</label>
                <p className="detail-value">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {displayData.checkInDate}
                </p>
              </div>

              <div className="detail-group">
                <label>체크아웃 날짜</label>
                <p className="detail-value">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {displayData.checkOutDate}
                </p>
              </div>

              {/* 숙박 기간 */}
              <div className="detail-group">
                <label>숙박 기간</label>
                <p className="detail-value">{displayData.nights}박</p>
              </div>

              {/* 객실 정보 */}
              <div className="detail-group">
                <label>객실 타입</label>
                <p className="detail-value">{displayData.roomType}</p>
              </div>

              {/* 투숙객 */}
              <div className="detail-group">
                <label>투숙객 수</label>
                <p className="detail-value">
                  <FontAwesomeIcon icon={faUsers} />
                  {displayData.guests}명
                </p>
              </div>

              {/* 연락처 */}
              {displayData.phone && (
                <div className="detail-group">
                  <label>연락처</label>
                  <p className="detail-value">{displayData.phone}</p>
                </div>
              )}

              {/* 총 가격 */}
              <div className="detail-group full-width">
                <label>총 결제 금액</label>
                <p className="detail-value price">₩{displayData.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* 다음 단계 안내 */}
          <div className="next-steps">
            <h2>다음 단계</h2>
            <div className="steps-list">
              <div className="step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>예약 확인</h4>
                  <p>메일로 받은 예약 확인서를 확인하세요.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>호텔에 연락</h4>
                  <p>특별 요청사항이 있다면 호텔에 미리 연락하세요.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>체크인</h4>
                  <p>체크인 날짜에 호텔에 도착하여 확인번호를 제시하세요.</p>
                </div>
              </div>

              <div className="step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>리뷰 작성</h4>
                  <p>숙박 후 리뷰를 작성하면 포인트를 받을 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 도움말 */}
          <div className="help-section">
            <h3>도움이 필요하신가요?</h3>
            <p>예약에 관련된 문의사항이 있으시면 고객센터로 문의해주세요.</p>
            <button className="btn-contact">고객센터 문의</button>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="action-buttons">
          <button className="btn-download" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} />
            확인서 다운로드
          </button>
          <button className="btn-print" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
            인쇄하기
          </button>
          <button className="btn-home" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faHome} />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingComplete;