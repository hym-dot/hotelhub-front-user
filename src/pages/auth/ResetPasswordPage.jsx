import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/auth/AuthPages.scss";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 재설정 이메일 전송 로직
    setIsSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-container single-panel">
        <div className="auth-form-section centered">
          <div className="auth-form-wrapper narrow">
            <Link to="/login" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>로그인으로 돌아가기</span>
            </Link>

            <h1 className="auth-title">비밀번호 찾기</h1>
            <p className="auth-subtitle">
              가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다
            </p>

            {!isSubmitted ? (
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john.doe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit">
                  재설정 링크 전송
                </button>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>이메일을 확인해주세요</h3>
                <p>
                  <strong>{email}</strong>로 비밀번호 재설정 링크를 전송했습니다.
                  <br />
                  이메일을 확인하시고 링크를 클릭하여 비밀번호를 재설정해주세요.
                </p>
                <Link to="/login" className="btn-back-login">
                  로그인으로 돌아가기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
