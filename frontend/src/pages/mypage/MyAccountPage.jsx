import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faBell } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyAccountPage.scss";

const MyAccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "김철수",
    email: "kim@example.com",
    phone: "010-1234-5678",
  });

  const [editingInfo, setEditingInfo] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    setEditingInfo(false);
    alert("개인정보가 저장되었습니다.");
  };

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="my-account-page">
      {/* 개인정보 수정 */}
      <section className="account-section">
        <div className="section-header">
          <h3>
            <FontAwesomeIcon icon={faUser} />
            개인정보
          </h3>
          <button
            className={`btn-toggle ${editingInfo ? "cancel" : "edit"}`}
            onClick={() => setEditingInfo(!editingInfo)}
          >
            {editingInfo ? "취소" : "수정"}
          </button>
        </div>

        <div className="form-group">
          <label>이름</label>
          {editingInfo ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="input-field"
            />
          ) : (
            <p className="value">{userInfo.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>이메일</label>
          {editingInfo ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="input-field"
            />
          ) : (
            <p className="value">{userInfo.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>전화번호</label>
          {editingInfo ? (
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="input-field"
            />
          ) : (
            <p className="value">{userInfo.phone}</p>
          )}
        </div>

        {editingInfo && (
          <button className="btn-save" onClick={handleSaveInfo}>
            저장
          </button>
        )}
      </section>

      {/* 비밀번호 변경 */}
      <section className="account-section">
        <h3>
          <FontAwesomeIcon icon={faLock} />
          비밀번호 변경
        </h3>

        <div className="form-group">
          <label>현재 비밀번호</label>
          <input
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호 (8자 이상)"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            className="input-field"
          />
        </div>

        <button className="btn-change-password">비밀번호 변경</button>
      </section>

      {/* 알림 설정 */}
      <section className="account-section">
        <h3>
          <FontAwesomeIcon icon={faBell} />
          알림 설정
        </h3>

        <div className="notification-item">
          <div>
            <h4>이메일 알림</h4>
            <p>예약 정보, 이벤트, 할인 정보를 이메일로 받습니다</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange("email")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>SMS 알림</h4>
            <p>예약 확인, 체크인 알림을 SMS로 받습니다</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange("sms")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>푸시 알림</h4>
            <p>실시간 예약 알림을 푸시로 받습니다</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange("push")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <button className="btn-save-notifications">알림 설정 저장</button>
      </section>
    </div>
  );
};

export default MyAccountPage;