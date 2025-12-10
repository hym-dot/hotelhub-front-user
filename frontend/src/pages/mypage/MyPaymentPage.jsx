import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPlus, faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { paymentMethodApi } from "../../api/paymentMethodApi";
import "../../styles/pages/mypage/MyPaymentPage.scss";

const MyPaymentPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      try {
        const data = await paymentMethodApi.list();
        setCards(data || []);
      } catch (error) {
        console.error('카드 목록 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleDeleteCard = async (id) => {
    if (window.confirm("카드를 삭제하시겠습니까?")) {
      try {
        await paymentMethodApi.remove(id);
        setCards(cards.filter((card) => (card._id || card.id) !== id));
        alert('카드가 삭제되었습니다.');
      } catch (error) {
        console.error('카드 삭제 실패:', error);
        alert(error.message || '카드 삭제에 실패했습니다.');
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await paymentMethodApi.setDefault(id);
      setCards(
        cards.map((card) => ({
          ...card,
          isDefault: (card._id || card.id) === id,
        }))
      );
      alert('기본 카드가 설정되었습니다.');
    } catch (error) {
      console.error('기본 카드 설정 실패:', error);
      alert(error.message || '기본 카드 설정에 실패했습니다.');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩 중...</div>;

  return (
    <div className="my-payment-page">
      <div className="payment-header">
        <div>
          <h1>결제 수단 관리</h1>
          <p>저장된 카드를 관리하고 새로운 카드를 추가하세요</p>
        </div>
        <button className="btn-add-card" onClick={() => navigate("/payment/add")}>
          <FontAwesomeIcon icon={faPlus} />
          새 카드 추가
        </button>
      </div>

      <div className="cards-list">
        {cards.length > 0 ? (
          cards.map((card) => {
            const cardId = card._id || card.id;
            const cardNumber = card.cardNumber ? `**** **** **** ${card.cardNumber.slice(-4)}` : card.number;
            const expiry = card.cardExpirationMonth && card.cardExpirationYear 
              ? `${card.cardExpirationMonth}/${card.cardExpirationYear}` 
              : card.expiry;
            return (
              <div key={cardId} className="card-item">
                <div className="card-left">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <div className="card-info">
                    <h3>{card.nickname || card.name || 'Card'}</h3>
                    <p className="card-number">{cardNumber}</p>
                    <p className="card-expiry">유효기간: {expiry}</p>
                  </div>
                </div>

                <div className="card-right">
                  <div className="card-actions">
                    {!card.isDefault && (
                      <button
                        className="btn-default"
                        onClick={() => handleSetDefault(cardId)}
                      >
                        기본으로 설정
                      </button>
                    )}
                    {card.isDefault && (
                      <span className="badge-default">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        기본 카드
                      </span>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCard(cardId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faCreditCard} />
            <h3>저장된 카드가 없습니다</h3>
            <p>결제를 위해 카드를 추가하세요</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/payment/add")}
            >
              카드 추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPaymentPage;