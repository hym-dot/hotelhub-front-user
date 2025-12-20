/* src/components/common/Header.jsx */
import React, {useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faHeart, faBed } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import LogoutModal from "./LogoutModal";
import "../../styles/components/common/Header.scss";

const Header = ({ onMouseEnter, onMouseLeave }) => {
  const { isAuthenticated, login, logout, user } = useAuth();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const wishlistCount = getWishlistCount();

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  /* 현재 페이지 확인 */
  const isWishlistPage = location.pathname === "/wishlist";
  const isSearchPage = location.pathname === "/search";

  return (
    <>
      {/* 찜하기 페이지일 때 'wishlist-header' 클래스 추가 */}
      <header className={`header ${isWishlistPage ? "wishlist-header" : ""}`}>
        <div className="header-inner">
          {isWishlistPage ? (
            /* ==============================
              CASE 1: 찜하기 페이지용 헤더
               ============================== */
            <>
              <div className="header-left wishlist-mode">
                <Link to="/" className="logo-link">
                  <FontAwesomeIcon icon={faHotel} />
                  <span>Hotels</span>
                </Link>
              </div>

              <div className="header-center"></div>

              <div className="header-right wishlist-mode">
                {/* 찜하기 버튼 (활성화 표시) */}
                <Link
                  to="/wishlist"
                  className="nav-item active wishlist-badge-wrapper"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <span>찜하기</span>
                  {wishlistCount > 0 && (
                    <span className="badge">{wishlistCount}</span>
                  )}
                </Link>

                <Link to="/hotels" className="nav-item">
                  <FontAwesomeIcon icon={faBed} />
                  <span>Find Stays</span>
                </Link>
                <span className="divider">|</span>

                {isAuthenticated ? (
                  <>
                    <div
                      className="user-menu-wrapper"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="user-simple"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="avatar-circle"></div>
                        <span>{user && user.name ? user.name : "Tomhoon"}</span>
                      </div>

                      {showUserMenu && (
                        <div className="user-dropdown-menu">
                          <Link
                            to="/mypage"
                            onClick={() => setShowUserMenu(false)}
                          >
                            마이페이지
                          </Link>
                          <Link
                            to="/mypage/bookings"
                            onClick={() => setShowUserMenu(false)}
                          >
                            예약 내역
                          </Link>
                          <Link
                            to="/mypage/wishlist"
                            onClick={() => setShowUserMenu(false)}
                          >
                            찜한 호텔
                          </Link>
                          <Link
                            to="/mypage/profile"
                            onClick={() => setShowUserMenu(false)}
                          >
                            프로필 설정
                          </Link>
                          <div className="divider"></div>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowModal(true);
                            }}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ==============================
              CASE 2: 일반 페이지용 헤더
               ============================== */
            <>
              <div className="header-left">
                <Link to="/" className="logo">
                  <FontAwesomeIcon icon={faHotel} />
                  <span>Hotels</span>
                </Link>
              </div>

              <div className="header-center"></div>

              <div className="header-right">
                <Link
                  to="/wishlist"
                  className="nav-item wishlist-btn wishlist-badge-wrapper"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <span>찜하기</span>
                  {wishlistCount > 0 && (
                    <span className="badge">{wishlistCount}</span>
                  )}
                </Link>

                <Link to="/hotels" className="nav-item">
                  <FontAwesomeIcon icon={faBed} />
                  <span>Find Stays</span>
                </Link>

                <div className="separator">|</div>

                {isAuthenticated ? (
                  <>
                    <div
                      className="user-menu-wrapper"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="user-simple"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="avatar-circle"></div>
                        <span>{user && user.name ? user.name : "Tomhoon"}</span>
                      </div>

                      {showUserMenu && (
                        <div className="user-dropdown-menu">
                          <Link
                            to="/mypage"
                            onClick={() => setShowUserMenu(false)}
                          >
                            마이페이지
                          </Link>
                          <Link
                            to="/mypage/bookings"
                            onClick={() => setShowUserMenu(false)}
                          >
                            예약 내역
                          </Link>
                          <Link
                            to="/mypage/wishlist"
                            onClick={() => setShowUserMenu(false)}
                          >
                            찜한 호텔
                          </Link>
                          <Link
                            to="/mypage/profile"
                            onClick={() => setShowUserMenu(false)}
                          >
                            프로필 설정
                          </Link>
                          <div className="divider"></div>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              setShowModal(true);
                            }}
                          >
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;
