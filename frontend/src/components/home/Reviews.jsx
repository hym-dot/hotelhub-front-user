import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/home/Reviews.scss';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      author: '김지은',
      rating: 5,
      text: '정말 최고의 호텔 예약 경험이었습니다. 깔끔한 인터페이스와 빠른 예약 과정이 인상적이었어요. 강력 추천합니다!',
      avatar: '👩‍💼',
      date: '2025-01-05',
    },
    {
      id: 2,
      author: '박준호',
      rating: 5,
      text: '다양한 호텔 선택지와 합리적인 가격, 그리고 빠른 고객서비스가 있어서 정말 만족합니다. 또 이용하겠습니다!',
      avatar: '👨‍💼',
      date: '2025-01-03',
    },
    {
      id: 3,
      author: '이수연',
      rating: 4.5,
      text: '포인트 적립과 쿠폰 할인이 정말 좋아요. 몇 번 사용해봤는데 매번 만족스러운 경험을 하고 있습니다.',
      avatar: '👩‍🔬',
      date: '2024-12-29',
    },
    {
      id: 4,
      author: '최명우',
      rating: 5,
      text: '호텔 필터링이 매우 세분화되어 있어서 찾고 싶은 호텔을 쉽게 찾을 수 있습니다. 휴가 계획 세울 때 꼭 이용합니다!',
      avatar: '👨‍🎓',
      date: '2024-12-25',
    },
  ];

  return (
    <div className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2>고객 리뷰</h2>
          <p>실제 사용자들의 솔직한 후기를 들어보세요</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="avatar">{review.avatar}</span>
                  <div>
                    <h4>{review.author}</h4>
                    <span className="date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={i < Math.floor(review.rating) ? 'filled' : 'empty'}
                      />
                    ))}
                </div>
              </div>

              <div className="review-quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>

              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h3>당신의 경험을 공유해주세요</h3>
          <p>숙박 후 리뷰를 작성하면 포인트를 적립할 수 있습니다</p>
          <button className="btn-write-review">리뷰 작성하기</button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
