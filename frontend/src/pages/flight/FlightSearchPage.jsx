import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faCalendarAlt,
  faUserFriends,
  faSearch,
  faPlus,
  faMinus,
  faChevronRight,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/flight/FlightSearchPage.scss";

const FlightSearchPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [tripType, setTripType] = useState("roundtrip"); // roundtrip, oneway
  const [departFrom, setDepartFrom] = useState("");
  const [arriveAt, setArriveAt] = useState("");
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [passengers, setPassengers] = useState(1);
  const [showPassengerPopup, setShowPassengerPopup] = useState(false);

  // 승객 수 조절
  const handlePassengerCounter = (operation) => {
    if (operation === "inc") setPassengers((prev) => prev + 1);
    if (operation === "dec" && passengers > 1) setPassengers((prev) => prev - 1);
  };

  // 출발지와 도착지 교환
  const swapLocations = () => {
    const temp = departFrom;
    setDepartFrom(arriveAt);
    setArriveAt(temp);
  };

  // 더미 데이터 - 인기 항공사
  const popularFlights = [
    {
      id: 1,
      airline: "Asiana Airlines",
      departure: "ICN",
      arrival: "JPN",
      departureTime: "10:00",
      arrivalTime: "14:30",
      duration: "4h 30m",
      price: 120,
      image: "/images/flight1.jpg",
    },
    {
      id: 2,
      airline: "Korean Air",
      departure: "ICN",
      arrival: "JPN",
      departureTime: "14:00",
      arrivalTime: "18:45",
      duration: "4h 45m",
      price: 145,
      image: "/images/flight2.jpg",
    },
    {
      id: 3,
      airline: "Jeju Air",
      departure: "ICN",
      arrival: "JPN",
      departureTime: "06:30",
      arrivalTime: "11:00",
      duration: "4h 30m",
      price: 95,
      image: "/images/flight3.jpg",
    },
    {
      id: 4,
      airline: "Air Busan",
      departure: "ICN",
      arrival: "JPN",
      departureTime: "18:00",
      arrivalTime: "22:30",
      duration: "4h 30m",
      price: 110,
      image: "/images/flight4.jpg",
    },
  ];

  return (
    <div className="flight-search-page">
      {/* 1. 헤로 섹션 - 배경 이미지와 함께 */}
      <div className="flight-hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Flight</h1>
          <p>Explore the world with the best flight deals</p>
        </div>

        {/* 2. 검색 폼 영역 */}
        <div className="flight-search-container">
          {/* 여행 타입 선택 */}
          <div className="trip-type-selector">
            <label>
              <input
                type="radio"
                name="tripType"
                value="roundtrip"
                checked={tripType === "roundtrip"}
                onChange={(e) => setTripType(e.target.value)}
              />
              <span>Round Trip</span>
            </label>
            <label>
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={tripType === "oneway"}
                onChange={(e) => setTripType(e.target.value)}
              />
              <span>One Way</span>
            </label>
          </div>

          {/* 검색 입력 필드 */}
          <div className="search-fields">
            {/* 출발지 */}
            <div className="input-group">
              <label>From</label>
              <div className="input-field">
                <FontAwesomeIcon icon={faPlane} />
                <input
                  type="text"
                  value={departFrom}
                  onChange={(e) => setDepartFrom(e.target.value)}
                  placeholder="Departure city"
                />
              </div>
            </div>

            {/* 교환 버튼 */}
            <button className="btn-swap" onClick={swapLocations}>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            </button>

            {/* 도착지 */}
            <div className="input-group">
              <label>To</label>
              <div className="input-field">
                <FontAwesomeIcon icon={faPlane} />
                <input
                  type="text"
                  value={arriveAt}
                  onChange={(e) => setArriveAt(e.target.value)}
                  placeholder="Arrival city"
                />
              </div>
            </div>

            {/* 출발 날짜 */}
            <div className="input-group">
              <label>Depart</label>
              <div className="input-field">
                <DatePicker
                  selected={departDate}
                  onChange={setDepartDate}
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker"
                />
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
            </div>

            {/* 귀환 날짜 (왕복일 때만) */}
            {tripType === "roundtrip" && (
              <div className="input-group">
                <label>Return</label>
                <div className="input-field">
                  <DatePicker
                    selected={returnDate}
                    onChange={setReturnDate}
                    dateFormat="yyyy-MM-dd"
                    className="custom-datepicker"
                    minDate={departDate}
                  />
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </div>
            )}

            {/* 승객 수 */}
            <div className="input-group" style={{ position: "relative" }}>
              <label>Passengers</label>
              <div
                className="input-field pointer"
                onClick={() => setShowPassengerPopup(!showPassengerPopup)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faUserFriends} />
                <span className="passenger-text">{passengers} Passenger{passengers > 1 ? "s" : ""}</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{
                    marginLeft: "auto",
                    fontSize: "1.2rem",
                    transform: `rotate(${showPassengerPopup ? "90deg" : "0deg"})`,
                    transition: "transform 0.2s",
                  }}
                />
              </div>

              {/* 승객 수 팝업 */}
              {showPassengerPopup && (
                <div className="passenger-popup">
                  <div className="counter-row">
                    <span className="label">Adults</span>
                    <div className="counter-controls">
                      <button
                        onClick={() => handlePassengerCounter("dec")}
                        disabled={passengers <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="count">{passengers}</span>
                      <button onClick={() => handlePassengerCounter("inc")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 검색 버튼 */}
            <button className="btn-search-flight">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. 메인 콘텐츠 영역 */}
      <div className="container">
        {/* 인기 항공권 섹션 */}
        <section className="popular-flights-section">
          <div className="section-header">
            <h2>Popular Flights</h2>
            <button className="btn-see-all">See All</button>
          </div>

          <div className="flights-grid">
            {popularFlights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-image">
                  <img src={flight.image} alt={flight.airline} />
                </div>

                <div className="flight-info">
                  <h3>{flight.airline}</h3>

                  <div className="flight-route">
                    <div className="location">
                      <span className="code">{flight.departure}</span>
                      <span className="time">{flight.departureTime}</span>
                    </div>

                    <div className="duration">
                      <span>{flight.duration}</span>
                    </div>

                    <div className="location">
                      <span className="code">{flight.arrival}</span>
                      <span className="time">{flight.arrivalTime}</span>
                    </div>
                  </div>

                  <div className="flight-footer">
                    <span className="price">${flight.price}</span>
                    <button className="btn-book">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 특가 항공권 섹션 */}
        <section className="deals-section">
          <h2>Special Deals</h2>
          <div className="deals-grid">
            <div className="deal-card mint-bg">
              <h3>🌴 Tropical Paradise</h3>
              <p>Fly to Bali, Maldives, or Thailand</p>
              <span className="deal-price">From $250</span>
              <button className="btn-explore">Explore Deals</button>
            </div>

            <div className="deal-card blue-bg">
              <h3>🗼 Asia Adventure</h3>
              <p>Tokyo, Bangkok, Singapore & more</p>
              <span className="deal-price">From $180</span>
              <button className="btn-explore">Explore Deals</button>
            </div>

            <div className="deal-card pink-bg">
              <h3>✈️ Europe Calling</h3>
              <p>Paris, London, Barcelona & more</p>
              <span className="deal-price">From $400</span>
              <button className="btn-explore">Explore Deals</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlightSearchPage;
