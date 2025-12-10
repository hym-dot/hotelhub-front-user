import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLock, faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth/ResetPasswordConfirmPage.scss";

const ResetPasswordConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  React.useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  // 비밀번호 강도 체크
  const checkPasswordStrength = (password) => {
    if (!password) return "";

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength =
      [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough].filter(Boolean).length;

    if (strength <= 2) return "weak";
    if (strength <= 3) return "medium";
    return "strong";
  };

  React.useEffect(() => {
    setPasswordStrength(checkPasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 유효성 검사
    if (!newPassword) {
      setError("새로운 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    if (passwordStrength === "weak") {
      setError("더 강한 비밀번호를 설정해주세요. (대문자, 소문자, 숫자, 특수문자 포함)");
      setLoading(false);
      return;
    }

    try {
      await resetPassword({
        email,
        newPassword,
        code: location.state?.verificationCode
      });
      setIsSuccess(true);
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "weak";
      case "medium":
        return "medium";
      case "strong":
        return "strong";
      default:
        return "";
    }
  };

  return (
    <div className="reset-password-confirm-page">
      <div className="reset-container">
        <div className="form-section">
          {/* 뒤로가기 버튼 */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> 뒤로가기
          </button>

          {!isSuccess ? (
            <>
              <div className="form-header">
                <h1 className="title">새 비밀번호 설정</h1>
                <p className="subtitle">
                  안전한 새 비밀번호를 설정해주세요.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="reset-form">
                {/* 에러 메시지 */}
                {error && (
                  <div className="error-message">
                    <span>{error}</span>
                  </div>
                )}

                {/* 이메일 표시 */}
                <div className="email-info">
                  <small>계정: {email}</small>
                </div>

                {/* 새 비밀번호 입력 */}
                <div className="input-group">
                  <label htmlFor="newPassword">새 비밀번호</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="최소 8자 이상"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                  </div>

                  {/* 비밀번호 강도 표시 */}
                  {newPassword && (
                    <div className={`password-strength ${getStrengthColor()}`}>
                      <div className="strength-bar">
                        <div className="strength-fill"></div>
                      </div>
                      <span className="strength-text">
                        {passwordStrength === "weak" && "약함"}
                        {passwordStrength === "medium" && "중간"}
                        {passwordStrength === "strong" && "강함"}
                      </span>
                    </div>
                  )}

                  {/* 비밀번호 요구사항 */}
                  <div className="password-requirements">
                    <p className="requirement-title">비밀번호 요구사항:</p>
                    <ul>
                      <li className={newPassword.length >= 8 ? "met" : ""}>
                        <FontAwesomeIcon icon={faCheck} /> 최소 8자 이상
                      </li>
                      <li className={/[A-Z]/.test(newPassword) ? "met" : ""}>
                        <FontAwesomeIcon icon={faCheck} /> 대문자 포함
                      </li>
                      <li className={/[a-z]/.test(newPassword) ? "met" : ""}>
                        <FontAwesomeIcon icon={faCheck} /> 소문자 포함
                      </li>
                      <li className={/\d/.test(newPassword) ? "met" : ""}>
                        <FontAwesomeIcon icon={faCheck} /> 숫자 포함
                      </li>
                      <li className={/[!@#$%^&*]/.test(newPassword) ? "met" : ""}>
                        <FontAwesomeIcon icon={faCheck} /> 특수문자 (!@#$%^&*) 포함
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className="input-group">
                  <label htmlFor="confirmPassword">비밀번호 확인</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="비밀번호를 다시 입력해주세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                    </button>
                  </div>

                  {/* 일치 여부 표시 */}
                  {confirmPassword && (
                    <div className={`match-status ${newPassword === confirmPassword ? "match" : "mismatch"}`}>
                      {newPassword === confirmPassword ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} />
                          <span>비밀번호가 일치합니다</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCheck} style={{ opacity: 0.3 }} />
                          <span>비밀번호가 일치하지 않습니다</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={
                    loading ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword ||
                    passwordStrength === "weak"
                  }
                >
                  {loading ? "변경 중..." : "비밀번호 변경"}
                </button>
              </form>

              {/* 안내 텍스트 */}
              <div className="info-text">
                <p>🔒 비밀번호는 안전하게 암호화되어 저장됩니다.</p>
              </div>
            </>
          ) : (
            /* 성공 상태 */
            <div className="success-state">
              <div className="success-icon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <h2 className="success-title">비밀번호가 변경되었습니다!</h2>
              <p className="success-message">
                새로운 비밀번호로 로그인해주세요.
              </p>
              <p className="auto-redirect">
                잠시 후 로그인 페이지로 이동합니다...
              </p>
            </div>
          )}
        </div>

        {/* 우측 이미지 영역 */}
        <div className="image-section">
          <div className="image-placeholder">
            <img
              src="https://via.placeholder.com/500x600?text=New+Password"
              alt="새 비밀번호"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
