import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentMethodApi } from '../../api/paymentMethodApi';
import '../../styles/pages/payment/AddPaymentPage.scss';

const AddPaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    cardHolder: '',
    nickname: '',
    isDefault: false,
  });
  const [cardPreview, setCardPreview] = useState({
    number: '0000 0000 0000 0000',
    name: 'YOUR NAME',
    expiry: 'MM/YY',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // 프리뷰 업데이트
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardPreview((prev) => ({ ...prev, number: formatted || '0000 0000 0000 0000' }));
    } else if (name === 'cardHolder') {
      setCardPreview((prev) => ({ ...prev, name: value.toUpperCase() || 'YOUR NAME' }));
    } else if (name === 'cardExpirationMonth' || name === 'cardExpirationYear') {
      const month = name === 'cardExpirationMonth' ? value : formData.cardExpirationMonth;
      const year = name === 'cardExpirationYear' ? value : formData.cardExpirationYear;
      setCardPreview((prev) => ({
        ...prev,
        expiry: month && year ? `${month}/${year}` : 'MM/YY',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 유효성 검사
      if (!formData.cardNumber || !formData.cardExpirationMonth || !formData.cardExpirationYear) {
        alert('카드 번호, 만료월, 만료연도는 필수입니다.');
        setLoading(false);
        return;
      }

      const payload = {
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        cardExpirationMonth: formData.cardExpirationMonth,
        cardExpirationYear: formData.cardExpirationYear,
        cardHolder: formData.cardHolder || 'N/A',
        nickname: formData.nickname,
        isDefault: formData.isDefault,
      };

      console.log('카드 추가 요청 시작:', payload);
      const result = await paymentMethodApi.create(payload);
      console.log('카드 추가 성공:', result);
      alert('카드가 성공적으로 추가되었습니다.');
      navigate('/mypage/payment');
    } catch (error) {
      console.error('카드 추가 실패:', error);
      const errorMessage = error?.response?.data?.message || error.message || '카드 추가에 실패했습니다.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page container">
      <div className="inner">
        <h2 className="page-title">결제 수단 추가</h2>
        <div className="card-form-container">
          <div className="card-preview">
            <div className="card-chip"></div>
            <div className="card-number">{cardPreview.number}</div>
            <div className="card-info">
              <div className="card-name">{cardPreview.name}</div>
              <div className="card-expiry">{cardPreview.expiry}</div>
            </div>
          </div>

          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>카드 번호</label>
              <input 
                type="text" 
                name="cardNumber"
                placeholder="0000-0000-0000-0000" 
                className="input--lg"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="25"
                inputMode="numeric"
                required
              />
              <small style={{color: '#666', marginTop: '4px', display: 'block'}}>
                테스트: 4111-1111-1111-1111
              </small>
            </div>
            
            <div className="input-row">
              <div className="form-group">
                <label>만료월</label>
                <input 
                  type="text" 
                  name="cardExpirationMonth"
                  placeholder="MM" 
                  className="input--lg"
                  value={formData.cardExpirationMonth}
                  onChange={handleInputChange}
                  maxLength="2"
                  required
                />
              </div>
              <div className="form-group">
                <label>만료연도</label>
                <input 
                  type="text" 
                  name="cardExpirationYear"
                  placeholder="YY" 
                  className="input--lg"
                  value={formData.cardExpirationYear}
                  onChange={handleInputChange}
                  maxLength="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="password" placeholder="123" className="input--lg" maxLength="3" />
              </div>
            </div>

            <div className="form-group">
              <label>카드 소유자 이름</label>
              <input 
                type="text" 
                name="cardHolder"
                placeholder="카드에 적힌 이름" 
                className="input--lg"
                value={formData.cardHolder}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>카드 별칭 (선택)</label>
              <input 
                type="text" 
                name="nickname"
                placeholder="예: 신한카드" 
                className="input--lg"
                value={formData.nickname}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="control">
                <input 
                  type="checkbox" 
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                />
                <span>이 카드를 기본 결제 수단으로 저장</span>
              </label>
            </div>

            <div className="btn-group">
              <button type="button" className="btn btn--ghost btn--lg" onClick={() => navigate(-1)}>
                취소
              </button>
              <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
                {loading ? '등록 중...' : '등록 완료'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentPage;