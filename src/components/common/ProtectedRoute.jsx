import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // 로그인이 안 되어 있으면 로그인 페이지로 리다이렉트
    // state={{ from: location }}을 통해 로그인 후 원래 가려던 페이지로 돌아올 수 있음
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인이 되어 있으면 자식 컴포넌트(요청한 페이지) 렌더링
  return children;
};

export default ProtectedRoute;