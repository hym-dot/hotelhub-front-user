/* src/components/common/Header.jsx */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faHeart, faBed } from "@fortawesome/free-solid-svg-icons";
import LogoutModal from "./LogoutModal";
import "../../styles/components/common/Header.scss";
import useHeader from "./hooks/useHeader.js";

const Header = ({ onMouseEnter, onMouseLeave }) => {

  const {
    navigate,
    isAuthenticated,
    user,
    wishlistCount,
    showModal,
    setShowModal,
    setShowUserMenu,
    showUserMenu,
    isWishlistPage,
    handleLogoutConfirm,
  } = useHeader({ onMouseEnter, onMouseLeave });

  return (
    <>
      {/* 찜하기 페이지일 때 'wishlist-header' 클래스 추가 */}
      <header className={`header ${isWishlistPage && "wishlist-header"}`}>
        <div className="header-inner">
            <>
              <div className={`header-left ${isWishlistPage && "wishlist-header"}`}>
                <Link to="/" className="logo">
                  <FontAwesomeIcon icon={faHotel} />
                  <span>Hotels</span>
                </Link>
              </div>

              <div className="header-center"></div>

              <div className={`header-right ${isWishlistPage && "wishlist-mode"}`}>
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
                  <AuthenticatedMenu
                    user={user}
                    setShowUserMenu={setShowUserMenu}
                    showUserMenu={showUserMenu}
                    setShowModal={setShowModal}
                  />
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

// ✅ 로그인시 노출되는 메뉴
function AuthenticatedMenu({ user, setShowUserMenu, showUserMenu, setShowModal }) {
  return (
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
  )
}

export default Header;
