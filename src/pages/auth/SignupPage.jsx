import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth/AuthPages.scss";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const newUser = {
      name: `${formData.firstName}${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    const ok = await signup(newUser);
    if (ok) navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image-section">
          <img src="/images/login-bg-2.jpg" alt="Hotel" />
        </div>

        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <h1 className="auth-title">Sign up</h1>
            <p className="auth-subtitle">회원가입</p>

            <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Hong"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Gil-dong"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john.doe@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+82 010-0000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder=".................."
                    value={formData.password}
                    onChange={handleChange}
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

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder=".................."
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>약관에 동의합니다</span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                계정 생성
              </button>

              <div className="signup-prompt">
                <span>이미 계정이 있으신가요? </span>
                <Link to="/login">로그인</Link>
              </div>

              <div className="divider">
                <span>Or Sign up with</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-btn naver" aria-label="Sign up with Naver">
                  N
                </button>
                <button type="button" className="social-btn google" aria-label="Sign up with Google">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button type="button" className="social-btn kakao" aria-label="Sign up with Kakao">
                  K
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
