import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth/ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { requestPasswordResetCode } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 이메일 유효성 검사
    if (!email) {
      setError("이메일을 입력해주세요.");
      setLoading(false);
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("유효한 이메일을 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      await requestPasswordResetCode(email);
      setIsSubmitted(true);
      // 3초 후 자동으로 인증 페이지로 이동
      setTimeout(() => {
        navigate("/verify-password-reset", { state: { email } });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="form-section">
          {/* 뒤로가기 버튼 */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> 뒤로가기
          </button>

          {!isSubmitted ? (
            <>
              <div className="form-header">
                <h1 className="title">비밀번호 찾기</h1>
                <p className="subtitle">
                  가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="forgot-form">
                {/* 에러 메시지 */}
                {error && (
                  <div className="error-message">
                    <span>{error}</span>
                  </div>
                )}

                {/* 이메일 입력 */}
                <div className="input-group">
                  <label htmlFor="email">이메일 주소</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* 설명 텍스트 */}
                <div className="info-text">
                  <p>
                    💡 등록된 이메일로 비밀번호 재설정 링크가 전송됩니다.
                    (최대 10분 소요)
                  </p>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? "전송 중..." : "재설정 링크 전송"}
                </button>
              </form>

              {/* 하단 링크 */}
              <div className="form-footer">
                <p>
                  로그인 계정이 있으신가요?{" "}
                  <Link to="/login" className="link">
                    로그인
                  </Link>
                </p>
                <p>
                  계정이 없으신가요?{" "}
                  <Link to="/signup" className="link">
                    회원가입
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* 성공 상태 */
            <div className="success-state">
              <div className="success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h2 className="success-title">이메일이 전송되었습니다!</h2>
              <p className="success-message">
                <strong>{email}</strong>로 비밀번호 재설정 링크를 보내드렸습니다.
              </p>
              <p className="success-hint">
                메일함을 확인하고 링크를 클릭하여 비밀번호를 재설정해주세요.
                <br />
                (스팸 폴더도 확인해주세요)
              </p>
              <p className="auto-redirect">
                잠시 후 다음 단계로 이동합니다...
              </p>
            </div>
          )}
        </div>

        {/* 우측 이미지 영역 */}
        <div className="image-section">
          <div className="image-placeholder">
            <img
              src="https://via.placeholder.com/500x600?text=Password+Reset"
              alt="비밀번호 찾기"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
