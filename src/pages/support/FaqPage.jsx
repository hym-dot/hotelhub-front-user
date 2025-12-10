import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faQuestion } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/support/FaqPage.scss';

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const faqCategories = [
    { id: 'all', label: '전체' },
    { id: 'booking', label: '예약' },
    { id: 'payment', label: '결제' },
    { id: 'cancellation', label: '취소/환불' },
    { id: 'account', label: '계정' },
    { id: 'other', label: '기타' },
  ];

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: '예약은 어떻게 하나요?',
      answer:
        '호텔을 선택한 후 원하는 날짜를 입력하고 객실을 선택합니다. 그 후 추가 옵션을 선택하고 결제 정보를 입력하면 예약이 완료됩니다.',
    },
    {
      id: 2,
      category: 'booking',
      question: '체크인 시간은 언제인가요?',
      answer: '일반적으로 체크인은 오후 3시, 체크아웃은 오전 11시입니다. 호텔마다 다를 수 있으니 예약 확인서를 참고하세요.',
    },
    {
      id: 3,
      category: 'booking',
      question: '선호도 설정이 뭔가요?',
      answer: '고층 또는 저층, 조용한 지역 등 체크인 시 특별히 요청할 사항을 미리 등록해두는 기능입니다.',
    },
    {
      id: 4,
      category: 'payment',
      question: '어떤 결제 수단을 사용할 수 있나요?',
      answer:
        '신용카드, 체크카드, 카카오페이, 네이버페이 등 다양한 결제 수단을 지원합니다. 보유하신 카드를 미리 등록하면 더 빠르게 결제할 수 있습니다.',
    },
    {
      id: 5,
      category: 'payment',
      question: '쿠폰은 어떻게 사용하나요?',
      answer:
        '마이페이지에서 보유한 쿠폰을 확인하고, 예약 결제 단계에서 적용할 쿠폰을 선택하여 사용할 수 있습니다.',
    },
    {
      id: 6,
      category: 'payment',
      question: '포인트는 언제 적립되나요?',
      answer: '결제가 완료된 예약에 대해 예약 금액의 1%가 포인트로 적립되며, 적립된 포인트는 다음 예약에서 사용할 수 있습니다.',
    },
    {
      id: 7,
      category: 'cancellation',
      question: '예약을 취소하려면 어떻게 해야 하나요?',
      answer:
        '마이페이지 > 예약 내역에서 취소하고 싶은 예약을 선택하고 "취소하기" 버튼을 클릭하면 됩니다.',
    },
    {
      id: 8,
      category: 'cancellation',
      question: '환불은 언제 받나요?',
      answer:
        '호텔의 취소 정책에 따라 환불 기한이 다릅니다. 일반적으로 취소 후 3-5일 내에 결제하신 카드로 환불됩니다.',
    },
    {
      id: 9,
      category: 'cancellation',
      question: '예약 수정은 가능한가요?',
      answer:
        '선택하신 호텔에 따라 다릅니다. 일부 호텔은 예약 수정이 가능하지만, 대부분의 경우 취소 후 재예약해야 합니다.',
    },
    {
      id: 10,
      category: 'account',
      question: '비밀번호를 잊어버렸어요.',
      answer:
        '로그인 페이지의 "비밀번호 찾기"를 클릭하고 가입하신 이메일 주소를 입력하면 비밀번호 재설정 링크가 발송됩니다.',
    },
    {
      id: 11,
      category: 'account',
      question: '회원 탈퇴는 어떻게 하나요?',
      answer:
        '마이페이지 > 계정 설정에서 "회원 탈퇴"를 클릭하고 안내에 따라 진행하면 됩니다. 탈퇴 후 보유한 포인트와 쿠폰은 소실됩니다.',
    },
    {
      id: 12,
      category: 'account',
      question: '찜 목록은 어디서 확인하나요?',
      answer:
        '헤더의 "찜하기" 버튼을 클릭하거나 마이페이지 > 찜 목록에서 관심있는 호텔을 확인할 수 있습니다.',
    },
    {
      id: 13,
      category: 'other',
      question: '리뷰를 작성하려면 어떻게 해야 하나요?',
      answer:
        '숙박이 완료된 예약에 대해서만 리뷰를 작성할 수 있습니다. 마이페이지 > 리뷰에서 작성해주세요.',
    },
    {
      id: 14,
      category: 'other',
      question: '가격 알림 서비스는 뭔가요?',
      answer:
        '찜한 호텔의 가격이 설정하신 목표 가격 이하로 내려가면 이메일로 알림을 받을 수 있는 서비스입니다.',
    },
  ];

  const filteredItems = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <div className="container">
          <div className="header-content">
            <div className="header-icon">
              <FontAwesomeIcon icon={faQuestion} />
            </div>
            <h1>자주 묻는 질문</h1>
            <p>궁금한 내용을 빠르게 찾아보세요</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="faq-content">
          {/* 검색 바 */}
          <div className="search-section">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="질문이나 키워드를 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="category-filter">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ 리스트 */}
          <div className="faq-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className={`faq-item ${expandedId === item.id ? 'expanded' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <span className="question-text">{item.question}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
                  </button>
                  {expandedId === item.id && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>검색 결과가 없습니다.</p>
                <p>다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>

          {/* 추가 도움말 */}
          <div className="help-cta">
            <h3>원하는 답변을 찾지 못하셨나요?</h3>
            <p>고객 문의를 통해 직접 질문하실 수 있습니다.</p>
            <button className="btn-contact">고객 문의하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;