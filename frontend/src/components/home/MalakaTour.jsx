import React from 'react';

const MalakaTour = () => {
  return (
    <div className="malaka-tour-card">
      <div className="content-overlay">
        
        {/* 상단 그룹 */}
        <div className="top-section">
          <div className="header-row">
            <h3>말라카 투어</h3>
            <div className="price-box">
              <span className="label">From</span>
              <span className="amount">$700</span>
            </div>
          </div>
          
          <p className="description">
            여행의 시각적 퀄리티가 깨어나는 도시, 말라카(Malaka).<br />
            말레이시아의 문화 보석 같은 이 도시는 동서양 문화가 만나는 
            교류이자, 세계문화유산으로 지정된 매혹적인 여행지입니다.
          </p>
        </div>

        {/* 하단 버튼 */}
        <button className="btn-book-flight">Book Flight</button>
      </div>
    </div>
  );
};

export default MalakaTour;