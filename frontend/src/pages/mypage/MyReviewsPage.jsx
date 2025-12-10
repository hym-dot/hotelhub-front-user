import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { reviewApi } from "../../api/reviewApi";
import "../../styles/pages/mypage/MyReviewsPage.scss";

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await reviewApi.list();
        setReviews(data || []);
      } catch (error) {
        console.error('리뷰 목록 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    if (window.confirm("이 리뷰를 삭제하시겠습니까?")) {
      try {
        await reviewApi.remove(id);
        setReviews(reviews.filter((r) => (r._id || r.id) !== id));
        alert('리뷰가 삭제되었습니다.');
      } catch (error) {
        console.error('리뷰 삭제 실패:', error);
        alert(error.message || '리뷰 삭제에 실패했습니다.');
      }
    }
  };

  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? "filled" : "empty"}
        />
      ))}
    </div>
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div className="my-reviews-page">
      <div className="reviews-header">
        <h1>나의 리뷰</h1>
        <p>총 {reviews.length}개의 리뷰를 작성하셨습니다</p>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const reviewId = review._id || review.id;
            return (
              <div key={reviewId} className="review-card">
                <div className="card-top">
                  <div className="hotel-info-section">
                    <img 
                      src={review.hotel?.images?.[0] || review.hotelImage || '/images/hotel-placeholder.jpg'} 
                      alt={review.hotel?.name || review.hotelName || 'Hotel'} 
                      className="hotel-thumbnail"
                    />
                    <div className="hotel-details">
                      <h3>{review.hotel?.name || review.hotelName || 'N/A'}</h3>
                      <p className="stay-dates">숙박기간: {review.stayDates || 'N/A'}</p>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                        <span className="rating-text">{review.rating}.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-actions">
                    <button className="btn-action edit">
                      <FontAwesomeIcon icon={faEdit} />
                      수정
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDeleteReview(reviewId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      삭제
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  {review.title && <h4>{review.title}</h4>}
                  <p className="review-content">{review.comment || review.content}</p>
                  {review.images?.length > 0 && (
                    <div className="review-images">
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt="Review" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <span className="date">작성일: {review.date || (review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A')}</span>
                  {review.helpful !== undefined && (
                    <span className="helpful">도움이 됨 {review.helpful}</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-reviews">
            <p>아직 작성한 리뷰가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;