import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/ProfilePage.scss";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: "4532",
      expiryDate: "02/27",
      cardholderName: "이용자",
      isActive: true
    }
  ]);
  const [newCard, setNewCard] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [cardErrors, setCardErrors] = useState({});

  // 계정 정보 상태
  const [formData, setFormData] = useState({
    name: user?.name || "정보 없음",
    email: user?.email || "정보 없음",
    phone: user?.phone || "정보 없음",
    address: user?.address || "정보 없음",
    dateOfBirth: user?.dateOfBirth || ""
  });

  // 임시 수정값 저장
  const [editValue, setEditValue] = useState("");

  // 수정 시작
  const handleEditStart = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue === "정보 없음" ? "" : currentValue);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // 수정 저장
  const handleEditSave = async (field) => {
    // 필드 유효성 검사
    if (!editValue.trim()) {
      setErrorMessage("필수 정보입니다.");
      return;
    }

    // 이메일 형식 검사
    if (field === "email" && !isValidEmail(editValue)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }

    // 전화번호 형식 검사
    if (field === "phone" && !isValidPhone(editValue)) {
      setErrorMessage("올바른 전화번호 형식이 아닙니다. (010-1234-5678)");
      return;
    }

    setIsLoading(true);
    try {
      // 프로필 업데이트 API 호출
      const updateData = { [field]: editValue };
      await updateProfile(updateData);

      // 로컬 상태 업데이트
      setFormData({
        ...formData,
        [field]: editValue
      });

      setEditingField(null);
      setEditValue("");
      setSuccessMessage(`${getFieldLabel(field)}이 업데이트되었습니다.`);
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      setErrorMessage("업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingField(null);
    setEditValue("");
    setErrorMessage("");
  };

  // 이메일 유효성 검사
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 전화번호 유효성 검사
  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  // 필드명 한글로 변환
  const getFieldLabel = (field) => {
    const labels = {
      name: "이름",
      email: "이메일",
      phone: "전화번호",
      address: "주소",
      dateOfBirth: "생년월일"
    };
    return labels[field] || field;
  };

  // 카드 추가 모달 열기
  const handleOpenAddCardModal = () => {
    setShowAddCardModal(true);
    setNewCard({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });
    setCardErrors({});
  };

  // 카드 추가 모달 닫기
  const handleCloseAddCardModal = () => {
    setShowAddCardModal(false);
    setNewCard({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });
    setCardErrors({});
  };

  // 카드 입력값 변경
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // 카드 번호 포매팅 (4자리씩 띄어쓰기)
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    }

    // 유효기간 포매팅 (MM/YY)
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }

    // CVV 숫자만
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setNewCard({
      ...newCard,
      [name]: formattedValue
    });
  };

  // 카드 유효성 검사
  const validateCard = () => {
    const errors = {};

    if (!newCard.cardholderName.trim()) {
      errors.cardholderName = "카드 소유자 이름은 필수입니다.";
    }

    const cardNumberOnly = newCard.cardNumber.replace(/\s/g, "");
    if (!cardNumberOnly || cardNumberOnly.length !== 16) {
      errors.cardNumber = "16자리 카드 번호를 입력하세요.";
    }

    if (!newCard.expiryDate || newCard.expiryDate.length !== 5) {
      errors.expiryDate = "유효기간을 MM/YY 형식으로 입력하세요.";
    } else {
      const [month, year] = newCard.expiryDate.split("/");
      if (parseInt(month) > 12 || parseInt(month) < 1) {
        errors.expiryDate = "월(01-12)을 올바르게 입력하세요.";
      }
    }

    if (!newCard.cvv || newCard.cvv.length !== 3) {
      errors.cvv = "3자리 CVV를 입력하세요.";
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 카드 추가 저장
  const handleAddCard = () => {
    if (!validateCard()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // 새 카드 추가
      const cardNumber = newCard.cardNumber.replace(/\s/g, "").slice(-4);
      const newCardData = {
        id: Date.now(),
        cardNumber: cardNumber,
        expiryDate: newCard.expiryDate,
        cardholderName: newCard.cardholderName,
        isActive: false
      };

      setCards([...cards, newCardData]);
      setIsLoading(false);
      handleCloseAddCardModal();
      setSuccessMessage("카드가 추가되었습니다.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  // 카드 삭제
  const handleDeleteCard = (cardId) => {
    if (cards.length === 1) {
      setErrorMessage("최소 1개 이상의 카드가 필요합니다.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setCards(cards.filter(card => card.id !== cardId));
    setSuccessMessage("카드가 삭제되었습니다.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // 기본 카드 변경
  const handleSetDefaultCard = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isActive: card.id === cardId
    })));
    setSuccessMessage("기본 결제 수단이 변경되었습니다.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // 필드 렌더링
  const renderField = (label, field, value) => {
    const isEditing = editingField === field;
    
    return (
      <div className="field-row" key={field}>
        <label>{label}</label>
        <div className="field-value">
          {isEditing ? (
            <div className="field-edit">
              {field === "dateOfBirth" ? (
                <input
                  type="date"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                  disabled={isLoading}
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                  autoFocus
                  disabled={isLoading}
                  placeholder={`${label}을 입력하세요`}
                />
              )}
              <div className="edit-actions">
                <button 
                  className="btn-confirm"
                  onClick={() => handleEditSave(field)}
                  title="저장"
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button 
                  className="btn-cancel"
                  onClick={handleEditCancel}
                  title="취소"
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <span>{!value || value === "정보 없음" ? "정보 없음" : value}</span>
              <button 
                className="btn-change"
                onClick={() => handleEditStart(field, value)}
              >
                수정
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="profile-page">
      {/* 헤더 영역 */}
      <div className="profile-header">
        <div className="header-bg">
          <div className="gradient-overlay"></div>
        </div>
        <div className="profile-avatar-section">
          <div className="avatar-wrapper">
            <img src="/images/profile-placeholder.png" alt="Profile" className="avatar-img" />
            <button className="btn-upload-photo">
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </div>
          <button className="btn-upload-cover">
            <FontAwesomeIcon icon={faCamera} />
            Upload new cover
          </button>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user?.name || "사용자"}</h2>
          <p className="profile-email">{user?.email || "이메일 없음"}</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button 
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
        <button 
          className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          Payment methods
        </button>
      </div>

      {/* Account 탭 콘텐츠 */}
      {activeTab === "account" && (
        <div className="account-content">
          <h3 className="section-title">계정 정보</h3>
          
          {/* 메시지 표시 */}
          {successMessage && (
            <div className="message success-message">
              ✓ {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="message error-message">
              ✕ {errorMessage}
            </div>
          )}
          
          <div className="account-fields">
            {renderField("이름", "name", formData.name)}
            {renderField("이메일", "email", formData.email)}
            {renderField("전화번호", "phone", formData.phone)}
            {renderField("주소", "address", formData.address)}
            {renderField("생년월일", "dateOfBirth", formData.dateOfBirth)}
          </div>
        </div>
      )}

      {/* History 탭 콘텐츠 */}
      {activeTab === "history" && (
        <div className="history-content">
          <div className="history-header">
            <h3>예약내역</h3>
            <select className="sort-select">
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="booking-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="booking-card">
                <div className="booking-date">
                  <div className="date-badge">
                    <span className="day">08</span>
                    <span className="month">DEC</span>
                  </div>
                </div>
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">Check In</span>
                    <span className="value">Thur, Dec 8</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Check Out</span>
                    <span className="value">Fri, Dec 9</span>
                  </div>
                </div>
                <div className="booking-time">
                  <div className="time-info">
                    <div className="label">Check In</div>
                    <div className="value">12:00pm</div>
                  </div>
                  <div className="time-info">
                    <div className="label">Room No.</div>
                    <div className="value">On arrival</div>
                  </div>
                </div>
                <button className="btn-download">Download Ticket</button>
                <button className="btn-arrow">›</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment 탭 콘텐츠 */}
      {activeTab === "payment" && (
        <div className="payment-content">
          <h3 className="section-title">결제수단</h3>
          
          {/* 메시지 표시 */}
          {successMessage && (
            <div className="message success-message">
              ✓ {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="message error-message">
              ✕ {errorMessage}
            </div>
          )}
          
          <div className="cards-grid">
            {/* 저장된 카드 목록 */}
            {cards.map((card) => (
              <div key={card.id} className={`payment-card ${card.isActive ? "active" : ""}`}>
                <div className="card-top">
                  <span className="card-label">**** **** **** {card.cardNumber}</span>
                  <div className="card-logo">VISA</div>
                </div>
                <div className="card-number">{card.cardNumber}</div>
                <div className="card-holder">{card.cardholderName}</div>
                <div className="card-bottom">
                  <div className="card-info">
                    <span className="label">Valid Thru</span>
                    <span className="value">{card.expiryDate}</span>
                  </div>
                  <div className="card-actions">
                    {!card.isActive && (
                      <button 
                        className="btn-card-action"
                        onClick={() => handleSetDefaultCard(card.id)}
                        title="기본 카드로 설정"
                      >
                        기본설정
                      </button>
                    )}
                    <button 
                      className="btn-card-delete"
                      onClick={() => handleDeleteCard(card.id)}
                      title="삭제"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* 카드 추가 버튼 */}
            <div 
              className="add-card-btn"
              onClick={handleOpenAddCardModal}
            >
              <div className="plus-icon">+</div>
              <span>Add a new card</span>
            </div>
          </div>
        </div>
      )}

      {/* 카드 추가 모달 */}
      {showAddCardModal && (
        <div className="modal-overlay">
          <div className="modal-content card-modal">
            <div className="modal-header">
              <h2>새 카드 추가</h2>
              <button 
                className="modal-close"
                onClick={handleCloseAddCardModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>카드 소유자 이름</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={newCard.cardholderName}
                  onChange={handleCardInputChange}
                  placeholder="홍길동"
                  className={cardErrors.cardholderName ? "error" : ""}
                />
                {cardErrors.cardholderName && (
                  <span className="error-message">{cardErrors.cardholderName}</span>
                )}
              </div>

              <div className="form-group">
                <label>카드 번호</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={cardErrors.cardNumber ? "error" : ""}
                />
                {cardErrors.cardNumber && (
                  <span className="error-message">{cardErrors.cardNumber}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>유효기간</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={newCard.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={cardErrors.expiryDate ? "error" : ""}
                  />
                  {cardErrors.expiryDate && (
                    <span className="error-message">{cardErrors.expiryDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="3"
                    className={cardErrors.cvv ? "error" : ""}
                  />
                  {cardErrors.cvv && (
                    <span className="error-message">{cardErrors.cvv}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel-modal"
                onClick={handleCloseAddCardModal}
                disabled={isLoading}
              >
                취소
              </button>
              <button 
                className="btn-add-card"
                onClick={handleAddCard}
                disabled={isLoading}
              >
                {isLoading ? "추가 중..." : "카드 추가"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
