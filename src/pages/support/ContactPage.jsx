import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/support/ContactPage.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 실제 API 호출은 여기서 수행됨
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      // 3초 후 폼 리셋
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          category: 'general',
          subject: '',
          message: '',
        });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: '이메일',
      content: 'support@hotelhub.com',
      description: '24시간 내 답변',
    },
    {
      icon: faPhone,
      title: '전화',
      content: '1688-3333',
      description: '평일 09:00 ~ 18:00',
    },
    {
      icon: faClock,
      title: '운영 시간',
      content: '평일 09:00 ~ 18:00',
      description: '토일 공휴일 휴무',
    },
    {
      icon: faMapMarkerAlt,
      title: '사무실',
      content: '서울시 강남구 테헤란로',
      description: '지도 보기',
    },
  ];

  const categories = [
    { value: 'general', label: '일반 문의' },
    { value: 'booking', label: '예약 관련' },
    { value: 'payment', label: '결제 관련' },
    { value: 'cancellation', label: '취소/환불' },
    { value: 'bug', label: '버그 리포트' },
    { value: 'other', label: '기타' },
  ];

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <div className="header-content">
            <h1>고객 문의</h1>
            <p>언제든지 문의해주세요. 성심성의껏 답변하겠습니다.</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* 연락처 정보 카드 */}
          <div className="info-section">
            <h2>연락처 정보</h2>
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <h3>{info.title}</h3>
                  <p className="info-content">{info.content}</p>
                  <p className="info-description">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="form-section">
            <h2>문의하기</h2>

            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>문의가 전송되었습니다!</h3>
                <p>빠른 시간 내에 답변 드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">이름 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">이메일 *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">문의 유형 *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">제목 *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">문의 내용 *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="문의 내용을 입력하세요 (500자 이내)"
                    rows="8"
                    maxLength="500"
                    required
                  ></textarea>
                  <p className="char-count">{formData.message.length}/500</p>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  {loading ? '전송 중...' : '문의 전송'}
                </button>
              </form>
            )}
          </div>

          {/* FAQ 링크 */}
          <div className="faq-link-section">
            <h3>자주 묻는 질문</h3>
            <p>대부분의 문의는 FAQ에서 답변을 찾을 수 있습니다.</p>
            <button
              className="btn-faq"
              onClick={() => (window.location.href = '/support/faq')}
            >
              FAQ 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;