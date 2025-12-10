import React, { useState, useEffect } from "react";
/* ✅ [추가] 페이지 이동을 위한 useNavigate */
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faHeart,
  faMugHot, 
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../context/WishlistContext";
import "../../styles/components/hotel/HotelCard.scss";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isFavorite, setIsFavorite] = useState(false);

  // Sync local state with context
  useEffect(() => {
    const hotelId = hotel._id || hotel.id;
    setIsFavorite(isInWishlist(hotelId));
  }, [hotel, isInWishlist]);

  /* ✅ 상세 페이지 이동 함수 */
  const goToDetail = () => {
    const hotelId = hotel._id || hotel.id;
    console.log('🏨 호텔 상세 페이지로 이동:', { hotelId, hotelName: hotel?.name });
    if (hotelId) {
      navigate(`/hotels/${hotelId}`);
    } else {
      console.error('❌ 호텔 ID를 찾을 수 없습니다:', hotel);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="hotel-card-horizontal">
      {/* 1. 왼쪽 이미지 영역 (클릭 시 이동) */}
      <div className="card-left" onClick={goToDetail} style={{ cursor: 'pointer' }}>
        {hotel?.images?.[0] || hotel?.image ? (
          <img src={hotel?.images?.[0] || hotel?.image} alt={hotel?.name || 'Hotel'} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className="image-count">{(hotel?.images?.length || 1)} images</span>
      </div>

      {/* 2. 오른쪽 컨텐츠 영역 */}
      <div className="card-right">
        <div className="card-header-row">
          {/* ✅ 호텔 이름 클릭 시 이동 */}
          <h3 className="hotel-name" onClick={goToDetail} style={{ cursor: 'pointer' }}>
            {hotel?.name || 'Hotel'}
          </h3>
          
          <p className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{hotel?.address || hotel?.location || 'Location'}</span>
          </p>

          <div className="rating-section">
            <div className="stars">{renderStars(hotel?.rating || 0)}</div>
            <span className="star-text">{hotel?.type || '호텔'}</span>
            {hotel?.amenities && (
              <div className="amenity">
                <FontAwesomeIcon icon={faMugHot} />
                <span>{(hotel.amenities?.length || 0)}개 편의시설</span>
              </div>
            )}
          </div>

          <div className="review-score-box">
            <div className="score-badge">{hotel?.rating || 'N/A'}</div>
            <div className="review-text">
              <strong>매우 좋음</strong>
              <span className="count">{hotel?.reviews || 0}개 리뷰</span>
            </div>
          </div>
        </div>

        <div className="price-group">
          <span className="label">기본 요금</span>
          <div className="price">
            <span className="currency">₩</span>
            <span className="amount">{(hotel?.basePrice || hotel?.price || 0).toLocaleString()}</span>
            <span className="unit">/박</span>
          </div>
          <span className="tax">세금 제외</span>
        </div>

        <div className="card-bottom-row">
          <div className="divider"></div>
          <div className="buttons-wrapper">
            <button
              className={`btn-heart ${isFavorite ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(hotel);
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            
            {/* ✅ 호텔 보기 버튼 클릭 시 이동 */}
            <button className="btn-view" onClick={goToDetail}>
              상세보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;