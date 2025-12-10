import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth/AuthPages.scss";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isSuccess = await login(email, password);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">로그인해주세요</p>

            <form className="auth-form" onSubmit={handleLogin}>
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

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder=".................."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>비밀번호 기억하기</span>
                </label>
                <Link to="/reset-password" className="forgot-link">
                  Forgot Password
                </Link>
              </div>

              <button type="submit" className="btn-submit">
                Login
              </button>

              <div className="signup-prompt">
                <span>계정이 없으신가요? </span>
                <Link to="/signup">회원가입</Link>
              </div>

              <div className="divider">
                <span>Or login with</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-btn naver" aria-label="Login with Naver">
                  N
                </button>
                <button type="button" className="social-btn google" aria-label="Login with Google">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button type="button" className="social-btn kakao" aria-label="Login with Kakao">
                  K
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="auth-image-section">
          <img src="/images/login-bg-1.jpg" alt="Hotel" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
