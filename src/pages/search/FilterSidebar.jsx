import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

/* ✅ [추가] 접었다 폈다 할 수 있는 섹션 컴포넌트 */
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="filter-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        {/* 열려있으면 위쪽 화살표, 닫혀있으면 아래쪽 화살표 */}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>

      {/* 열려있을 때만 내용 보여줌 */}
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState(1200);

  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">Filters</h3>

      {/* 1. Price Filter */}
      <FilterSection title="Price">
        <div className="price-range-control">
          <input
            type="range"
            min="50"
            max="1200"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="range-slider"
            style={{
              background: `linear-gradient(to right, #112211 0%, #112211 ${
                ((priceRange - 50) / (1200 - 50)) * 100
              }%, #ddd ${((priceRange - 50) / (1200 - 50)) * 100}%, #ddd 100%)`,
            }}
          />
          <div className="range-labels">
            <span>$50</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </FilterSection>

      <div className="divider"></div>

      {/* 2. Rating Filter */}
      <FilterSection title="Rating">
        <div className="checkbox-group">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="checkbox-item">
              <input type="checkbox" />
              <span className="stars">
                {[...Array(star)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="star-gold"
                  />
                ))}
                {[...Array(5 - star)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="star-gray"
                  />
                ))}
              </span>
              <span className="count">{star * 15 + 20}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="divider"></div>

      {/* 3. Freebies Filter */}
      <FilterSection title="Freebies">
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" /> Free breakfast
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Free parking
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Free internet
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Free airport shuttle
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Free cancellation
          </label>
        </div>
      </FilterSection>

      <div className="divider"></div>

      {/* 4. Amenities Filter */}
      <FilterSection title="Amenities">
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" /> 24hr front desk{" "}
            <span className="count">108</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Air-conditioned{" "}
            <span className="count">45</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Fitness <span className="count">32</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" /> Pool <span className="count">21</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
