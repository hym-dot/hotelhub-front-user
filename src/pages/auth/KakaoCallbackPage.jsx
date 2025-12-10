import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // URL hash에서 토큰 파싱 (예: #token=abc&name=홍길동&email=test@test.com&provider=kakao)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');
    const provider = params.get('provider');

    if (token) {
      localStorage.setItem('accessToken', token);
      setUser({ name, email, provider });
      navigate('/', { replace: true });
    } else {
      alert('카카오 로그인에 실패했습니다.');
      navigate('/login', { replace: true });
    }
  }, [navigate, setUser]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>카카오 로그인 중...</p>
    </div>
  );
};

export default KakaoCallbackPage;