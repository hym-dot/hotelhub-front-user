import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { favoriteApi } from '../api/favoriteApi';

const WishlistContext = createContext();

const normalizeHotel = (hotel = {}) => {
  const id = hotel._id || hotel.id || hotel.hotelId || hotel?.hotel?._id;
  return { ...hotel, id };
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { isAuthed } = useAuth();
  const [wishlist, setWishlist] = useState([]); // [{ favoriteId?, hotelId, hotel }]

  const derivedHotels = (items) =>
    items.map((item) => normalizeHotel(item.hotel || item));

  const persistLocal = (items) => {
    if (isAuthed) return;
    localStorage.setItem('wishlist', JSON.stringify(derivedHotels(items)));
  };

  const fetchFavorites = async () => {
    try {
      const favorites = await favoriteApi.getFavorites();
      const normalized = (favorites || []).map((fav) => ({
        favoriteId: fav._id,
        hotelId: fav.hotel?._id || fav.hotelId,
        hotel: normalizeHotel(fav.hotel || fav),
      }));
      setWishlist(normalized);
    } catch (error) {
      console.error('찜하기 목록 로드 실패:', error);
    }
  };

  // Load initial state (local for guests, remote for authed)
  useEffect(() => {
    if (isAuthed) {
      fetchFavorites();
      return;
    }

    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWishlist(parsed.map((hotel) => ({ hotel: normalizeHotel(hotel), hotelId: hotel.id })));
      } catch (error) {
        console.error('찜하기 목록 로드 오류:', error);
      }
    } else {
      setWishlist([]);
    }
  }, [isAuthed]);

  const addToWishlist = async (hotel) => {
    const normalizedHotel = normalizeHotel(hotel);
    const hotelId = normalizedHotel.id;

    // Already exists
    if (wishlist.some((item) => item.hotelId === hotelId)) return;

    try {
      if (isAuthed) {
        const created = await favoriteApi.addFavorite(hotelId);
        const favoriteId = created?._id || created?.id;
        setWishlist((prev) => [
          ...prev,
          {
            favoriteId,
            hotelId,
            hotel: normalizeHotel(created?.hotel || normalizedHotel),
          },
        ]);
      } else {
        const next = [...wishlist, { hotelId, hotel: normalizedHotel }];
        setWishlist(next);
        persistLocal(next);
      }
    } catch (error) {
      console.error('찜하기 추가 실패:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (hotelId) => {
    const target = wishlist.find(
      (item) => item.hotelId === hotelId || item.hotel?.id === hotelId || item.hotel?._id === hotelId
    );

    try {
      if (isAuthed && target?.favoriteId) {
        await favoriteApi.removeFavorite(target.favoriteId);
      }
    } catch (error) {
      console.error('찜하기 제거 실패:', error);
      throw error;
    } finally {
      const next = wishlist.filter(
        (item) => item.hotelId !== hotelId && item.hotel?.id !== hotelId && item.hotel?._id !== hotelId
      );
      setWishlist(next);
      persistLocal(next);
    }
  };

  const isInWishlist = (hotelId) =>
    wishlist.some((item) => item.hotelId === hotelId || item.hotel?.id === hotelId || item.hotel?._id === hotelId);

  const toggleWishlist = async (hotel) => {
    const normalizedHotel = normalizeHotel(hotel);
    if (isInWishlist(normalizedHotel.id)) {
      await removeFromWishlist(normalizedHotel.id);
    } else {
      await addToWishlist(normalizedHotel);
    }
  };

  const getWishlist = () => derivedHotels(wishlist);
  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist: derivedHotels(wishlist),
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        getWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
