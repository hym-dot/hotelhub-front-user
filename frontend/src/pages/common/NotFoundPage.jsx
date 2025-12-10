import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/common/NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">페이지를 찾을 수 없습니다</h1>
        <p className="error-description">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="error-illustration">
          <div className="hotel-icon">🏨</div>
        </div>

        <div className="button-group">
          <button
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faHome} className="icon" />
            홈으로 돌아가기
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
            이전 페이지
          </button>
        </div>

        <div className="help-section">
          <h3>도움이 필요하신가요?</h3>
          <ul className="help-links">
            <li>
              <button onClick={() => navigate('/search')}>호텔 검색하기</button>
            </li>
            <li>
              <button onClick={() => navigate('/support/faq')}>자주 묻는 질문</button>
            </li>
            <li>
              <button onClick={() => navigate('/support/contact')}>고객 문의</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;