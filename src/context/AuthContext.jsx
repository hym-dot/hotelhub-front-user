import React, { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

const persistToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthed = !!user;

  const hydrateUser = async () => {
    try {
      const me = await authApi.getMe();
      setUser(me);
      return me;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      const token = response?.token || response?.accessToken;
      if (!token) throw new Error("토큰을 찾을 수 없습니다.");
      persistToken(token);
      setUser(response?.user || response);
      // Ensure we have the latest user profile
      await hydrateUser().catch(() => {});
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "이메일 또는 비밀번호를 확인해 주세요.";
      alert(`로그인 실패: ${errorMsg}`);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const registerResponse = await authApi.register(userData);
      const token = registerResponse?.token || registerResponse?.accessToken;
      if (token) {
        persistToken(token);
        setUser(registerResponse?.user || registerResponse);
        await hydrateUser().catch(() => {});
        return true;
      }

      // Fallback: auto login if token not returned
      const loginOk = await login(userData.email, userData.password);
      return loginOk;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "회원가입 중 오류가 발생했습니다.";
      alert(`회원가입 실패: ${errorMsg}`);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const updateProfile = async (profileData) => {
    const updatedUser = await authApi.updateProfile(profileData);
    setUser(updatedUser);
    return updatedUser;
  };

  const changePassword = async (payload) => authApi.changePassword(payload);
  const requestEmailChange = async (newEmail) => authApi.requestEmailChange(newEmail);
  const confirmEmailChange = async (code) => authApi.confirmEmailChange(code);
  const requestPasswordResetCode = async (email) => authApi.requestPasswordResetCode(email);
  const verifyPasswordResetCode = async (payload) => authApi.verifyPasswordResetCode(payload);
  const resetPassword = async (payload) => authApi.resetPassword(payload);
  const sendEmailCode = async (email) => authApi.sendEmailCode(email);
  const verifyEmailCode = async (payload) => authApi.verifyEmailCode(payload);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await hydrateUser();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthed,
        isAuthed,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        changePassword,
        requestEmailChange,
        confirmEmailChange,
        requestPasswordResetCode,
        verifyPasswordResetCode,
        resetPassword,
        sendEmailCode,
        verifyEmailCode,
        setUser,
        refreshUser: hydrateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
