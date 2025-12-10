import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth/VerifyPasswordResetPage.scss";

const VerifyPasswordResetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyPasswordResetCode, requestPasswordResetCode } = useAuth();
  
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10분 (600초)
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // location.state에서 이메일 받기
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  // 타이머 카운트다운
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 인증코드 검증
    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.");
      setLoading(false);
      return;
    }

    if (verificationCode.length !== 6) {
      setError("인증 코드는 6자리입니다.");
      setLoading(false);
      return;
    }

    try {
      await verifyPasswordResetCode({ email, code: verificationCode });
      setIsVerified(true);
      // 2초 후 자동으로 비밀번호 설정 페이지로 이동
      setTimeout(() => {
        navigate("/reset-password-confirm", {
          state: { email, verificationCode },
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "인증 코드가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await requestPasswordResetCode(email);
      setTimeLeft(600);
      setCanResend(false);
      setVerificationCode("");
      setError("");
      alert("인증 코드가 재전송되었습니다.");
    } catch (err) {
      setError("코드 재전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-password-reset-page">
      <div className="verify-container">
        <div className="form-section">
          {/* 뒤로가기 버튼 */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> 뒤로가기
          </button>

          {!isVerified ? (
            <>
              <div className="form-header">
                <h1 className="title">인증 코드 확인</h1>
                <p className="subtitle">
                  {email}로 전송된 인증 코드를 입력해주세요.
                </p>
              </div>

              <form onSubmit={handleVerify} className="verify-form">
                {/* 에러 메시지 */}
                {error && (
                  <div className="error-message">
                    <span>{error}</span>
                  </div>
                )}

                {/* 이메일 표시 */}
                <div className="email-display">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>{email}</span>
                </div>

                {/* 인증 코드 입력 */}
                <div className="input-group">
                  <label htmlFor="code">인증 코드 (6자리)</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type="text"
                      id="code"
                      placeholder="000000"
                      maxLength="6"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* 타이머 */}
                <div className="timer-section">
                  <span className={`timer ${timeLeft < 60 ? "warning" : ""}`}>
                    ⏱️ {formatTime(timeLeft)}
                  </span>
                  {canResend ? (
                    <button
                      type="button"
                      className="btn-resend"
                      onClick={handleResendCode}
                      disabled={loading}
                    >
                      코드 재전송
                    </button>
                  ) : (
                    <span className="resend-hint">코드 재전송 가능 {formatTime(timeLeft)}</span>
                  )}
                </div>

                {/* 정보 메시지 */}
                <div className="info-text">
                  <p>💡 이메일의 스팸 폴더도 확인해주세요.</p>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !verificationCode}
                >
                  {loading ? "확인 중..." : "인증 확인"}
                </button>
              </form>
            </>
          ) : (
            /* 인증 성공 상태 */
            <div className="success-state">
              <div className="success-icon">
                ✓
              </div>
              <h2 className="success-title">인증이 완료되었습니다!</h2>
              <p className="success-message">
                이제 새로운 비밀번호를 설정해주세요.
              </p>
            </div>
          )}
        </div>

        {/* 우측 이미지 영역 */}
        <div className="image-section">
          <div className="image-placeholder">
            <img
              src="https://via.placeholder.com/500x600?text=Verification"
              alt="인증"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPasswordResetPage;
