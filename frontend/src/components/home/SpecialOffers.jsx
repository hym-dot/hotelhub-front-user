import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../../context/WishlistContext';
import '../../styles/components/home/SpecialOffers.scss';

const SpecialOffers = () => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const specialOffers = [
    {
      id: 1,
      name: '제주도힐 리조트',
      location: '제주도, 대한민국',
      originalPrice: 290000,
      price: 240000,
      discount: 17,
      rating: 4.8,
      reviews: 156,
      image: '/images/hotel1.jpg',
      tag: '특가',
      badge: '오늘만 50% 할인',
      type: '5 Star Resort',
      amenities: 'Pool, Spa, Restaurant',
    },
    {
      id: 2,
      name: '발리 럭셔리 리조트',
      location: '발리, 인도네시아',
      originalPrice: 220000,
      price: 180000,
      discount: 18,
      rating: 4.9,
      reviews: 98,
      image: '/images/hotel2.jpg',
      tag: '인기',
      badge: '주중 20% 추가 할인',
      type: 'Luxury Resort',
      amenities: 'Beach, Spa, Bar',
    },
    {
      id: 3,
      name: '방콕 프리미엄 호텔',
      location: '방콕, 태국',
      originalPrice: 165000,
      price: 130000,
      discount: 21,
      rating: 4.7,
      reviews: 145,
      image: '/images/hotel3.jpg',
      tag: '신규',
      badge: '쿠폰으로 추가 할인',
      type: 'Premium Hotel',
      amenities: 'WiFi, Restaurant, Gym',
    },
  ];

  const handleWishlistToggle = (offer) => {
    toggleWishlist({
      id: offer.id,
      name: offer.name,
      location: offer.location,
      image: offer.image,
      rating: offer.rating,
      reviews: offer.reviews,
      price: offer.price,
      originalPrice: offer.originalPrice,
      type: offer.type,
      amenities: offer.amenities,
    });
  };

  return (
    <div className="special-offers-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2>지금 특가 중인 호텔</h2>
            <p>제한된 시간 동안만 제공되는 특별한 할인 혜택</p>
          </div>
          <button className="btn-view-all">모든 특가 보기</button>
        </div>

        <div className="offers-grid">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image">
                <img src={offer.image} alt={offer.name} />
                <div className="offer-badge">{offer.badge}</div>
                <button
                  className={`btn-wishlist ${isInWishlist(offer.id) ? 'active' : ''}`}
                  onClick={() => handleWishlistToggle(offer)}
                  title={isInWishlist(offer.id) ? '찜 제거' : '찜하기'}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <div className="offer-discount">-{offer.discount}%</div>
              </div>

              <div className="offer-content">
                <span className="offer-tag">{offer.tag}</span>
                <h3>{offer.name}</h3>

                <div className="offer-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {offer.location}
                </div>

                <div className="offer-rating">
                  <div className="stars">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={i < Math.floor(offer.rating) ? 'filled' : 'empty'}
                        />
                      ))}
                  </div>
                  <span className="rating-value">{offer.rating}</span>
                  <span className="reviews">({offer.reviews})</span>
                </div>

                <div className="offer-price">
                  <span className="original-price">
                    ₩{offer.originalPrice.toLocaleString()}
                  </span>
                  <span className="discount-price">
                    ₩{offer.price.toLocaleString()}
                  </span>
                </div>

                <button className="btn-book">예약하기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
