import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { couponApi } from "../../api/couponApi";
import "../../styles/pages/mypage/MyCouponsPage.scss";

const MyCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const loadCoupons = async () => {
      setLoading(true);
      try {
        const data = await couponApi.getAvailable();
        setCoupons(data || []);
      } catch (error) {
        console.error('쿠폰 목록 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, []);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <span className="badge available">사용 가능</span>;
      case "upcoming":
        return <span className="badge upcoming">예정</span>;
      case "expired":
        return <span className="badge expired">만료됨</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getDiscountText = (discount, type) => {
    return type === "percent" ? `${discount}%` : `₩${discount.toLocaleString()}`;
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div className="my-coupons-page">
      <div className="coupons-header">
        <h1>나의 쿠폰</h1>
        <p>보유한 쿠폰을 확인하고 사용하세요</p>
      </div>

      <div className="coupons-list">
        {coupons.length > 0 ? (
          coupons.map((coupon) => {
            const couponId = coupon._id || coupon.id;
            const discountValue = coupon.discountPercent || coupon.discountAmount || coupon.discount || 0;
            const discountType = coupon.discountPercent ? "percent" : "fixed";
            const code = coupon.code || `COUPON${couponId}`;
            const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
            const status = isExpired ? "expired" : (coupon.status || "available");
            
            return (
              <div key={couponId} className={`coupon-card ${status}`}>
                <div className="coupon-left">
                  <div className="coupon-icon">
                    <FontAwesomeIcon icon={faTicket} />
                  </div>
                  <div className="coupon-info">
                    <h3>{coupon.name || coupon.title || 'Coupon'}</h3>
                    <p className="discount">
                      {discountType === "percent" ? `${discountValue}%` : `₩${discountValue.toLocaleString()}`} 할인
                    </p>
                    {coupon.minPrice && (
                      <p className="min-price">
                        최소 구매: ₩{coupon.minPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="coupon-right">
                  <div className="coupon-validity">
                    {coupon.expiryDate && (
                      <span className="valid-date">
                        ~ {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                    {getStatusBadge(status)}
                  </div>

                  <button
                    className={`btn-copy ${copiedId === code ? "copied" : ""}`}
                    onClick={() => handleCopyCoupon(code)}
                    disabled={status !== "available"}
                  >
                    {copiedId === code ? (
                      <>
                        <FontAwesomeIcon icon={faCheck} />
                        복사됨
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCopy} />
                        {code}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faTicket} />
            <h3>쿠폰이 없습니다</h3>
            <p>사용할 수 있는 쿠폰을 받으려면 예약을 진행하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCouponsPage;