import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faHeart,
  faCoins,
  faTicketAlt,
  faChevronRight,
  faStar,
  faMapMarkerAlt,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/mypage/MyOverviewPage.scss';

const MyOverviewPage = () => {
  const [upcomingBookings] = useState([
    {
      id: 1,
      hotelName: 'CVK Park Bosphorus Hotel Istanbul',
      location: 'Istanbul, Turkey',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      image: '/images/hotel1.jpg',
      status: 'confirmed',
      nights: 3,
    },
  ]);

  const stats = [
    {
      icon: faCalendarAlt,
      label: 'Upcoming Bookings',
      value: upcomingBookings.length,
      color: '#8DD3BB',
      link: '/mypage/bookings',
    },
    {
      icon: faHeart,
      label: 'Wishlisted Hotels',
      value: 5,
      color: '#FF6B6B',
      link: '/wishlist',
    },
    {
      icon: faCoins,
      label: 'Points Balance',
      value: '2,500 P',
      color: '#FFB627',
      link: '/mypage/points',
    },
    {
      icon: faTicketAlt,
      label: 'Available Coupons',
      value: 3,
      color: '#6C63FF',
      link: '/mypage/coupons',
    },
  ];

  return (
    <div className="mypage-overview">
      <div className="overview-header">
        <h1>Welcome Back!</h1>
        <p>Here's what's happening with your account</p>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">{stat.value}</strong>
            </div>
            <div className="stat-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Link>
        ))}
      </div>

      {/* 다음 예약 */}
      <section className="upcoming-section">
        <div className="section-header">
          <h2>Your Next Trip</h2>
          {upcomingBookings.length > 0 && (
            <Link to="/mypage/bookings" className="view-all">
              View All
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )}
        </div>

        {upcomingBookings.length > 0 ? (
          <div className="upcoming-cards">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="upcoming-card">
                <div className="card-image">
                  <img src={booking.image} alt={booking.hotelName} />
                  <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                </div>
                <div className="card-content">
                  <h3>{booking.hotelName}</h3>
                  <p className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {booking.location}
                  </p>
                  <p className="dates">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    {booking.checkIn} → {booking.checkOut} ({booking.nights} nights)
                  </p>
                  <Link to={`/mypage/bookings/${booking.id}`} className="btn-details">
                    View Details
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No upcoming bookings</p>
            <Link to="/search" className="btn-book">
              Book Your Next Stay
            </Link>
          </div>
        )}
      </section>

      {/* 최근 리뷰 */}
      <section className="reviews-section">
        <div className="section-header">
          <h2>Recent Reviews</h2>
          <Link to="/mypage/reviews" className="view-all">
            View All
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>

        <div className="reviews-list">
          <div className="review-card">
            <div className="review-header">
              <h4>Great Experience at CVK Park</h4>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star filled" />
                ))}
              </div>
            </div>
            <p className="review-text">
              Wonderful stay with excellent service and beautiful views. Highly recommended!
            </p>
            <span className="review-date">Posted on Dec 15, 2024</span>
          </div>
        </div>
      </section>

      {/* 빠른 링크 */}
      <section className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          <Link to="/mypage/account" className="quick-link">
            <span>Account Settings</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to="/mypage/payment" className="quick-link">
            <span>Payment Methods</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to="/support/faq" className="quick-link">
            <span>Help & FAQ</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
          <Link to="/support/contact" className="quick-link">
            <span>Contact Support</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MyOverviewPage;