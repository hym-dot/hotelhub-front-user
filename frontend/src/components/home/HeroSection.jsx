import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faSearch, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/home/HeroSection.scss";
import useHeroSection from "./hooks/useHeroSection.js";

const HeroSection = ({ isCardVisible, onCardEnter, onCardLeave }) => {
  const {
    handlePrevBackground,
    handleNextBackground,
    handleKeyDown,
    destination,
    setDestination,
    backgroundIndex,
    setBackgroundIndex,
    backgroundImages,
    handleSearch,
  } = useHeroSection({isCardVisible, onCardEnter, onCardLeave});

  return (
    <div className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})` }}
      ></div>

      <button className="hero-nav-btn hero-nav-prev" onClick={handlePrevBackground}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="hero-nav-btn hero-nav-next" onClick={handleNextBackground}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="hero-indicators">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === backgroundIndex ? "active" : ""}`}
            onClick={() => setBackgroundIndex(index)}
            aria-label={`Go to background ${index + 1}`}
          />
        ))}
      </div>





      <div className="hero-content">
        <div className="text-section">
          <span className="eyebrow">특가 · 무료 취소 · 실시간 재고</span>
          <h1>당신의 다음 여행을 찾아보세요</h1>
          <p>검색을 통해 요금을 비교하고 무료 취소를 포함한 최저가 특가까지 한 번에 확인하세요.</p>
        </div>

        <div className="search-section">
          <h3>Where are you staying?</h3>

          <div className="search-form-simple">

            <div className="input-field">
              <FontAwesomeIcon icon={faBed} className="input-icon"/>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Search places, hotels..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

            </div>

            <button className="btn-search-main" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>

          </div>
        </div>
      </div>





    </div>
  );
};

export default HeroSection;
