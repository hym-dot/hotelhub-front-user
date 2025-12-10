import React from "react";
import MalakaTour from "./MalakaTour";
import TravelGallery from "./TravelGallery";
/* 👇 아래 줄이 핵심입니다. 이 코드가 있는지 꼭 확인해주세요! */
import "../../styles/components/home/TravelMore.scss"; 

const TravelMore = () => {
  return (
    <section className="travel-more container">
      <div className="inner">
        <div className="section-header">
          <div className="text-group">
            <h2 className="section-title">여행 더보기</h2>
            <p className="section-subtitle">
              Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
            </p>
          </div>
          <button className="see-all-btn">See All</button>
        </div>

        <div className="travel-content">
          <MalakaTour />
          <TravelGallery />
        </div>
      </div>
    </section>
  );
};

export default TravelMore;