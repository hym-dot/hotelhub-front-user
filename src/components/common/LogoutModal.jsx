import React from "react";
import "../../styles/components/common/LogoutModal.scss";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h3>로그아웃</h3>
        <p>정말 로그아웃 하시겠습니까?</p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            취소
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
