import React from "react";
import "../../styles/components/common/Newsletter.scss";

const Newsletter = () => {
  return (
    <div className="newsletter-section">
      <div className="inner">
        <div className="newsletter-card">
          
          {/* 1. 왼쪽: 텍스트 및 입력 폼 */}
          <div className="content-container">
            <h2 className="title">
              구독서비스<br />신청해보세요
            </h2>
            <div className="description-group">
              <p className="sub-title">The Travel</p>
              <p className="desc">구독하고 쿠폰, 최신 이벤트를 받아보세요.</p>
            </div>

            <form className="email-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="email-input"
              />
              <button type="submit" className="submit-btn">
                Subscribe
              </button>
            </form>
          </div>

          {/* 2. 오른쪽: CSS로 만든 3D 우체통 */}
          <div className="mailbox-illustration">
            <div className="mailbox-body">
              {/* 입체감을 위한 뒷부분 (어두운 색) */}
              <div className="mailbox-depth"></div>
              {/* 앞부분 (밝은 색) */}
              <div className="mailbox-front"></div>
              {/* 깃발 */}
              <div className="mailbox-flag"></div>
            </div>
            {/* 기둥 */}
            <div className="mailbox-post"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Newsletter;