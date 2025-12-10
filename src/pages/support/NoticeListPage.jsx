import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/support/NoticeListPage.scss';

const NoticeListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notices = [
    {
      id: 1,
      title: '2025년 1월 새해 이벤트 안내',
      date: '2025-01-10',
      category: 'event',
      view: 1250,
      content: '새해 맞이 특별 이벤트를 개최합니다. 관심있는 호텔에서 30% 할인을 받을 수 있습니다.',
    },
    {
      id: 2,
      title: '여름 성수기 예약 안내',
      date: '2025-06-01',
      category: 'notice',
      view: 892,
      content: '여름 성수기 기간 예약이 매우 많으니 미리 예약해주시기 바랍니다.',
    },
    {
      id: 3,
      title: '서버 정기 점검 안내',
      date: '2025-01-08',
      category: 'system',
      view: 645,
      content: '더 나은 서비스 제공을 위해 1월 12일 00시부터 06시까지 점검을 진행합니다.',
    },
    {
      id: 4,
      title: '새로운 결제 수단 추가',
      date: '2024-12-29',
      category: 'feature',
      view: 1843,
      content: '기존 결제 수단 외에 NAVER Pay, PAYCO가 추가되었습니다.',
    },
    {
      id: 5,
      title: '앱 버전 업데이트 안내',
      date: '2024-12-25',
      category: 'update',
      view: 523,
      content: '모바일 앱이 최신 버전으로 업데이트되었습니다. 안정성이 향상되었습니다.',
    },
    {
      id: 6,
      title: '고객 이용약관 변경 안내',
      date: '2024-12-20',
      category: 'notice',
      view: 934,
      content: '2025년 1월 1일부터 적용되는 새로운 이용약관을 안내드립니다.',
    },
    {
      id: 7,
      title: '포인트 정책 변경 안내',
      date: '2024-12-15',
      category: 'policy',
      view: 1567,
      content: '포인트 적립률이 1%에서 1.5%로 변경되었습니다.',
    },
    {
      id: 8,
      title: '보안 업데이트 완료',
      date: '2024-12-10',
      category: 'security',
      view: 456,
      content: '사용자 정보 보호를 위한 보안 업데이트가 완료되었습니다.',
    },
    {
      id: 9,
      title: '겨울 특가 호텔 추천',
      date: '2024-12-05',
      category: 'event',
      view: 2134,
      content: '겨울 시즌 특가 호텔들을 소개합니다. 지금 바로 예약하세요!',
    },
    {
      id: 10,
      title: '휴일 고객 지원 시간 안내',
      date: '2024-12-01',
      category: 'service',
      view: 678,
      content: '연말 연초 휴일 기간 고객 지원 시간을 안내드립니다.',
    },
  ];

  const categoryLabels = {
    event: '이벤트',
    notice: '공지',
    system: '시스템',
    feature: '기능',
    update: '업데이트',
    policy: '정책',
    security: '보안',
    service: '서비스',
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="notice-page">
      <div className="notice-header">
        <div className="container">
          <div className="header-content">
            <div className="header-icon">
              <FontAwesomeIcon icon={faBullhorn} />
            </div>
            <h1>공지사항</h1>
            <p>호텔허브의 최신 소식을 확인하세요</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="notice-content">
          {/* 검색 바 */}
          <div className="search-section">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="공지사항을 검색하세요..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <p className="search-info">{filteredNotices.length}개의 공지사항</p>
          </div>

          {/* 공지사항 리스트 */}
          {paginatedNotices.length > 0 ? (
            <>
              <div className="notice-list">
                {paginatedNotices.map((notice) => (
                  <Link
                    key={notice.id}
                    to={`/support/notices/${notice.id}`}
                    className="notice-item"
                  >
                    <div className="notice-top">
                      <span className="category-badge">{categoryLabels[notice.category]}</span>
                      <span className="view-count">{notice.view.toLocaleString()} 조회</span>
                    </div>
                    <h3 className="notice-title">{notice.title}</h3>
                    <p className="notice-preview">{notice.content}</p>
                    <div className="notice-footer">
                      <span className="notice-date">{notice.date}</span>
                      <span className="arrow">→</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <p>검색 결과가 없습니다.</p>
              <p>다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeListPage;