import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarAlt,
  faUserFriends,
  faSearch,
  faPlus,
  faMinus,
  faChevronRight,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/search/HotelListPage.scss";
import FilterSidebar from "./FilterSidebar";
import { hotelApi } from "../../api/hotelApi";
import { useWishlist } from "../../context/WishlistContext";

const HotelListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  /* 초기값 설정 */
  const initialDest = searchParams.get("city") || searchParams.get("destination") || "";
  const initialCheckIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn"))
    : new Date();
  const initialCheckOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut"))
    : new Date();
  const initialRooms = Number(searchParams.get("rooms")) || 1;
  const initialGuests = Number(searchParams.get("guests")) || 2;

  const [destination, setDestination] = useState(initialDest);
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [rooms, setRooms] = useState(initialRooms);
  const [guests, setGuests] = useState(initialGuests);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("recommend");

  /* 호텔 데이터 로드 */
  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      try {
        const params = {
          guests,
          sort: sortBy,
          page: 1,
          limit: 20,
        };

        // 목적지가 있으면 추가
        if (destination) {
          params.city = destination;
        }

        // 체크인/체크아웃이 있으면 추가
        if (checkInDate && checkOutDate) {
          params.checkIn = checkInDate.toISOString().split('T')[0];
          params.checkOut = checkOutDate.toISOString().split('T')[0];
        }

        const response = await hotelApi.getHotels(params);
        setHotels(response?.items || []);
        setTotalCount(response?.total || 0);
      } catch (error) {
        console.error('호텔 로드 실패:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [destination, guests, checkInDate, checkOutDate, sortBy]);

  /* 카운터 핸들러 */
  const handleCounter = (type, operation) => {
    if (type === "rooms") {
      if (operation === "inc") setRooms((prev) => prev + 1);
      if (operation === "dec" && rooms > 1) setRooms((prev) => prev - 1);
    } else {
      if (operation === "inc") setGuests((prev) => prev + 1);
      if (operation === "dec" && guests > 1) setGuests((prev) => prev - 1);
    }
  };

  /* 찜하기 토글 */
  const handleToggleWishlist = async (hotel) => {
    try {
      await toggleWishlist(hotel);
    } catch (error) {
      console.error('찜하기 실패:', error);
      alert('찜하기에 실패했습니다.');
    }
  };

  /* 검색 실행 */
  const handleSearch = () => {
    const params = {
      city: destination,
      guests: guests.toString(),
      checkIn: checkInDate?.toISOString().split('T')[0],
      checkOut: checkOutDate?.toISOString().split('T')[0],
    };
    setSearchParams(params);
  };

  return (
    <div className="search-page">
      {/* 1. 상단 검색바 영역 */}
      <div className="search-bar-wrapper">
        <div className="search-container">
          {/* Destination */}
          <div className="input-group">
            <label>Enter Destination</label>
            <div className="input-field">
              <FontAwesomeIcon icon={faBed} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination"
              />
            </div>
          </div>

          {/* Check In */}
          <div className="input-group">
            <label>Check In</label>
            <div className="input-field">
              <DatePicker
                selected={checkInDate}
                onChange={setCheckInDate}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* Check Out */}
          <div className="input-group">
            <label>Check Out</label>
            <div className="input-field">
              <DatePicker
                selected={checkOutDate}
                onChange={setCheckOutDate}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
                minDate={checkInDate}
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* Rooms & Guests */}
          <div className="input-group" style={{ position: "relative" }}>
            <label>Rooms & Guests</label>
            <div
              className="input-field pointer"
              onClick={() => setShowGuestPopup(!showGuestPopup)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUserFriends} />
              <span
                className="guest-text"
                style={{
                  marginLeft: "1rem",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {rooms} Room, {guests} Guests
              </span>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  marginLeft: "auto",
                  fontSize: "1.2rem",
                  transform: `rotate(${showGuestPopup ? "90deg" : "0deg"})`,
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {/* 인원수 팝업 */}
            {showGuestPopup && (
              <div className="guest-popup">
                <div className="counter-row">
                  <span className="label">Rooms</span>
                  <div className="counter-controls">
                    <button
                      onClick={() => handleCounter("rooms", "dec")}
                      disabled={rooms <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{rooms}</span>
                    <button onClick={() => handleCounter("rooms", "inc")}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="counter-row">
                  <span className="label">Guests</span>
                  <div className="counter-controls">
                    <button
                      onClick={() => handleCounter("guests", "dec")}
                      disabled={guests <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{guests}</span>
                    <button onClick={() => handleCounter("guests", "inc")}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 검색 버튼 */}
          <button className="btn-search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 영역 (좌우 분할) */}
      <div className="container">
        <div className="search-layout-grid">
          {/* 왼쪽 사이드바 (필터) */}
          <aside className="search-sidebar">
            <FilterSidebar />
          </aside>

          {/* 오른쪽 메인 콘텐츠 (호텔 리스트) */}
          <main className="search-content">
            {/* 정렬 및 결과 개수 */}
            <div
              className="list-header"
              style={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "2rem" }}>
                {loading ? "로딩 중..." : `Showing ${totalCount} places`}
              </h2>
              <select
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommend">Sort by Recommended</option>
                <option value="popular">Popular</option>
                <option value="rating">Rating High to Low</option>
              </select>
            </div>

            {/* 호텔 카드 리스트 */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
            ) : hotels.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>검색 결과가 없습니다.</div>
            ) : (
              <div className="hotel-list">
                {hotels.map((hotel) => {
                  const hotelId = hotel._id || hotel.id;
                  return (
                    <div key={hotelId} className="hotel-card-list-item">
                      <div className="hotel-image-container">
                        <img src={hotel.images?.[0] || hotel.image || "/images/hotel-placeholder.jpg"} alt={hotel.name} />
                        <button
                          className={`btn-wishlist ${isInWishlist(hotelId) ? "active" : ""}`}
                          onClick={() => handleToggleWishlist(hotel)}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      </div>

                      <div className="hotel-info">
                        <div className="hotel-header">
                          <div>
                            <h3>{hotel.name}</h3>
                            <p className="location">{hotel.location || hotel.city}</p>
                          </div>
                          <div className="price-section">
                            <div className="rating">
                              <span className="rating-badge">{hotel.rating || 0}</span>
                              <span className="rating-text">Very good</span>
                            </div>
                            <p className="reviews">{hotel.reviewsCount || 0} reviews</p>
                          </div>
                        </div>

                        <p className="amenities">{hotel.amenities || hotel.description}</p>

                        <div className="options-grid">
                          {hotel.amenities?.slice(0, 4).map((amenity, idx) => (
                            <span key={idx} className="option-tag">{amenity}</span>
                          ))}
                        </div>

                        <div className="hotel-footer">
                          <div className="price-info">
                            {hotel.originalPrice && (
                              <p className="original-price">₩{hotel.originalPrice.toLocaleString()}</p>
                            )}
                            <p className="current-price">
                              ₩{(hotel.price || 0).toLocaleString()}/night
                            </p>
                          </div>
                          <button
                            className="btn-view-details"
                            onClick={() => navigate(`/hotels/${hotelId}`)}
                          >
                            View Hotel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Show more results 버튼 */}
            {hotels.length > 0 && (
              <button className="btn-show-more">Show more results</button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelListPage;