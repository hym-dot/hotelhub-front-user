import React from "react";
import "../../styles/components/home/PopularDestinations.scss";
import DestinationCard from "./DestinationCard";
import { mockDestinations } from "../../api/mockData";

const PopularDestinations = () => {
  // 화면에 딱 4개만 보여주기 위해 데이터를 자릅니다. (데이터가 더 많을 경우를 대비)
  const displayDestinations = mockDestinations.slice(0, 4);

  return (
    <section className="container">
      <div className="inner">
        <div className="section-header">
          <div>
            <h2>여행에 빠지다</h2>
            <p>특가상품으로 진행되는 여행을 예약해보세요</p>
          </div>
          <button className="btn-see-all">See All</button>
        </div>

        {/* Swiper 대신 일반 div 사용 */}
        <div className="destinations-grid">
          {displayDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;