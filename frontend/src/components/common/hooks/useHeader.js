import {useAuth} from "../../../context/AuthContext.jsx";
import {useWishlist} from "../../../context/WishlistContext.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function useHeader() {
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

  return {
    navigate,
    isAuthenticated,
    login,
    logout,
    user,
    wishlistCount,
    showModal,
    setShowModal,
    setShowUserMenu,
    showUserMenu,
    isWishlistPage,
    handleLogoutConfirm,
  }
}