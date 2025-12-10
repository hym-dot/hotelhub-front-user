import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/layouts/MyPageLayout.scss';

const MyPageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: '대시보드', path: '/mypage' },
    { name: '내 프로필', path: '/mypage/profile' },
    { name: '예약 내역', path: '/mypage/bookings' },
    { name: '나의 리뷰', path: '/mypage/reviews' },
    { name: '위시리스트', path: '/mypage/wishlist' },
    { name: '쿠폰함', path: '/mypage/coupons' },
    { name: '포인트', path: '/mypage/points' },
    { name: '1:1 문의', path: '/mypage/inquiries' },
  ];

  return (
    <div className="mypage-layout container">
      <div className="inner">
        <aside className="mypage-sidebar">
          <div className="sidebar-header">
            <button className="btn-back" onClick={() => navigate('/')}>
              <FontAwesomeIcon icon={faHome} />
              <span>홈으로</span>
            </button>
          </div>
          <h2 className="sidebar-title">마이페이지</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="mypage-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;