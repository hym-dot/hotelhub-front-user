import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

/* 로그인/회원가입 페이지를 감싸는 레이아웃 */
const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* 상단에 간단한 로고만 배치하거나, 
         디자인상 로고가 필요 없다면 이 header 부분을 지워도 됩니다.
         로그인 페이지 디자인(사진)에는 로고가 없으므로 깔끔하게 Outlet만 둡니다.
      */}
      
      {/* 자식 페이지(LoginPage, SignupPage)가 렌더링되는 위치 */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;