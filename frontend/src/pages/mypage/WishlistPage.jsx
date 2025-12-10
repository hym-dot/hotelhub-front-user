import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMapMarkerAlt,
  faTrash,
  faHeart,
  faChevronRight,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../../context/WishlistContext';
import '../../styles/pages/mypage/WishlistPage.scss';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { getWishlist, removeFromWishlist } = useWishlist();
  
  const wishlistItems = getWishlist();

  const handleRemoveWishlist = (hotelId) => {
    removeFromWishlist(hotelId);
  };

  const handleGoToHotel = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  const totalPrice = wishlistItems.reduce((sum, hotel) => sum + (hotel.price || 0), 0);
  const avgPrice = wishlistItems.length > 0 ? Math.round(totalPrice / wishlistItems.length) : 0;
  const minPrice = wishlistItems.length > 0 ? Math.min(...wishlistItems.map((h) => h.price || 0)) : 0;
  const maxPrice = wishlistItems.length > 0 ? Math.max(...wishlistItems.map((h) => h.price || 0)) : 0;

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p className="header-subtitle">
          <FontAwesomeIcon icon={faHeart} />
          {wishlistItems.length} hotels saved
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <h2>No hotels in your wishlist</h2>
          <p>Start exploring and add your favorite hotels to your wishlist</p>
          <button className="btn-explore" onClick={() => navigate('/search')}>
            Explore Hotels
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      ) : (
        <div className="wishlist-container">
          <div className="wishlist-main">
            <div className="wishlist-grid">
              {wishlistItems.map((hotel, index) => (
                <div 
                  key={hotel.id} 
                  className="wishlist-card" 
                  style={{ animation: `fadeIn 0.4s ease-out ${index * 0.1}s both` }}
                >
                  <div className="card-image">
                    <img src={hotel.image || '/images/hotel-placeholder.jpg'} alt={hotel.name} />
                    <div className="overlay">
                      <button className="btn-view-details" onClick={() => handleGoToHotel(hotel.id)}>
                        View Details
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                    <span className="wishlist-badge">
                      <FontAwesomeIcon icon={faHeart} />
                      Wishlist
                    </span>
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <h3>{hotel.name}</h3>
                      <button
                        className="btn-remove-quick"
                        onClick={() => handleRemoveWishlist(hotel.id)}
                        title="Remove from wishlist"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <p className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {hotel.location || 'Location not available'}
                    </p>

                    <div className="rating-section">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={i < Math.floor(hotel.rating || 0) ? 'star filled' : 'star'}
                          />
                        ))}
                      </div>
                      <span className="rating-text">
                        {hotel.rating || 0} ({hotel.reviews || 0} reviews)
                      </span>
                    </div>

                    <div className="specs-row">
                      <span className="spec">
                        <FontAwesomeIcon icon={faBed} />
                        {hotel.type || 'Hotel'}
                      </span>
                    </div>

                    {hotel.amenities && <p className="amenities">{hotel.amenities}</p>}

                    <div className="card-footer">
                      <div className="price-section">
                        {hotel.originalPrice && (
                          <p className="original-price">₩{hotel.originalPrice}</p>
                        )}
                        <p className="current-price">₩{hotel.price || 0}/night</p>
                      </div>
                      <button className="btn-book" onClick={() => handleGoToHotel(hotel.id)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 요약 카드 */}
          <aside className="wishlist-summary">
            <div className="summary-card">
              <h3>Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="label">Total Hotels</span>
                  <span className="value">{wishlistItems.length}</span>
                </div>
                <div className="stat">
                  <span className="label">Average Price</span>
                  <span className="value">₩{avgPrice}</span>
                </div>
                <div className="stat">
                  <span className="label">Price Range</span>
                  <span className="value">₩{minPrice} - ₩{maxPrice}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button className="btn-view-all" onClick={() => navigate('/search')}>
                  View All Hotels
                </button>
                <button className="btn-compare">Compare Hotels</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
