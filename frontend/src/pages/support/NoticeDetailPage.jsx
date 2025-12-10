import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faTags, faEye } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/support/NoticeDetailPage.scss';

const NoticeDetailPage = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  // Mock 데이터 - 실제로는 API에서 가져옴
  const noticeData = {
    id: parseInt(noticeId),
    title: '2025년 1월 새해 이벤트 안내',
    date: '2025-01-10',
    category: 'event',
    categoryLabel: '이벤트',
    views: 1250,
    content: `
      <h2>새해를 맞이하여 특별한 이벤트를 준비했습니다!</h2>
      
      <p>호텔허브는 2025년 새해를 맞이하여 대단위 이벤트를 개최합니다. 이번 이벤트를 통해 모든 고객분들께 최고의 가치를 제공하려고 합니다.</p>
      
      <h3>이벤트 내용</h3>
      <ul>
        <li>전국 호텔 30% 할인 (선착순 100개 호텔)</li>
        <li>신규 고객 회원가입 시 5,000포인트 증정</li>
        <li>예약 금액이 100,000원 이상일 경우 추가 10% 할인</li>
        <li>리뷰 작성 시 마일리지 2배 적립</li>
      </ul>
      
      <h3>이벤트 기간</h3>
      <p>2025년 1월 10일 00:00 ~ 1월 31일 23:59</p>
      
      <h3>주의사항</h3>
      <p>
        - 각 호텔당 예약 가능한 객실 수가 제한되어 있습니다.<br/>
        - 할인된 가격은 변경 또는 취소 불가능합니다.<br/>
        - 쿠폰과 포인트는 중복 사용 불가능합니다.<br/>
        - 부정한 방법으로 이벤트 참여 시 처벌받을 수 있습니다.
      </p>
      
      <h3>자주 묻는 질문</h3>
      <p><strong>Q. 모든 호텔이 할인 대상인가요?</strong></p>
      <p>A. 아닙니다. 호텔허브와 제휴된 호텔 중 일부만 할인 대상입니다. 검색 시 할인 마크가 표시되는 호텔만 할인을 받을 수 있습니다.</p>
      
      <p><strong>Q. 할인과 포인트를 함께 사용할 수 있나요?</strong></p>
      <p>A. 포인트는 사용 가능하지만 다른 쿠폰과는 중복 사용이 불가능합니다.</p>
      
      <p><strong>Q. 취소한 후 다시 예약할 수 있나요?</strong></p>
      <p>A. 이벤트 할인으로 예약한 객실은 취소 후 재예약이 불가능합니다.</p>
      
      <p>이벤트에 대해 더 궁금한 점이 있으시면 고객 문의를 통해 문의해주세요.</p>
    `,
  };

  // 이전/다음 공지사항 (mock)
  const relatedNotices = [
    { id: 2, title: '여름 성수기 예약 안내', direction: 'prev' },
    { id: 4, title: '새로운 결제 수단 추가', direction: 'next' },
  ];

  const handleNavigate = (id) => {
    navigate(`/support/notices/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="notice-detail-page">
      <div className="container">
        <div className="detail-content">
          {/* 뒤로가기 버튼 */}
          <button className="back-btn" onClick={() => navigate('/support/notices')}>
            <FontAwesomeIcon icon={faArrowLeft} />
            공지사항 목록으로
          </button>

          {/* 공지사항 헤더 */}
          <div className="notice-detail-header">
            <div className="header-meta">
              <span className="category-badge">{noticeData.categoryLabel}</span>
              <span className="view-count">
                <FontAwesomeIcon icon={faEye} />
                {noticeData.views.toLocaleString()}
              </span>
            </div>

            <h1 className="notice-title">{noticeData.title}</h1>

            <div className="notice-info">
              <span className="info-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {noticeData.date}
              </span>
            </div>
          </div>

          {/* 구분선 */}
          <div className="divider"></div>

          {/* 공지사항 본문 */}
          <div
            className="notice-body"
            dangerouslySetInnerHTML={{ __html: noticeData.content }}
          ></div>

          {/* 구분선 */}
          <div className="divider"></div>

          {/* 이전/다음 공지사항 네비게이션 */}
          <div className="notice-navigation">
            {relatedNotices.map((notice) => (
              <button
                key={notice.id}
                className={`nav-item ${notice.direction}`}
                onClick={() => handleNavigate(notice.id)}
              >
                <span className="nav-label">{notice.direction === 'prev' ? '이전글' : '다음글'}</span>
                <span className="nav-title">{notice.title}</span>
              </button>
            ))}
          </div>

          {/* 하단 CTA */}
          <div className="cta-section">
            <button className="btn-list" onClick={() => navigate('/support/notices')}>
              공지사항 목록
            </button>
            <button className="btn-contact" onClick={() => navigate('/support/contact')}>
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;