import api from './axios';

const unwrap = (response) => response?.data?.data ?? response?.data;

export const authApi = {
  register: async (userData) => unwrap(await api.post('/auth/register', userData)),
  login: async (credentials) => unwrap(await api.post('/auth/login', credentials)),
  getMe: async () => unwrap(await api.get('/auth/me')),

  // Email verification & password reset flows
  sendEmailCode: async (email) => unwrap(await api.post('/auth/email/send-code', { email })),
  verifyEmailCode: async (payload) => unwrap(await api.post('/auth/email/verify', payload)),
  requestPasswordResetCode: async (email) => unwrap(await api.post('/auth/password/forgot', { email })),
  verifyPasswordResetCode: async (payload) => unwrap(await api.post('/auth/password/verify', payload)),
  resetPassword: async (payload) => unwrap(await api.post('/auth/password/reset', payload)),

  // Email change
  requestEmailChange: async (newEmail) => unwrap(await api.post('/auth/email/change/request', { newEmail })),
  confirmEmailChange: async (code) => unwrap(await api.post('/auth/email/change/confirm', { code })),

  // Profile and password
  updateProfile: async (profileData) => unwrap(await api.patch('/users/profile', profileData)),
  changePassword: async (payload) => unwrap(await api.patch('/users/password', payload)),
  updateProfileImage: async (payload) => unwrap(await api.patch('/users/profile/image', payload)),
  createProfileImageUploadUrl: async (payload) => unwrap(await api.post('/users/profile/image/upload-url', payload)),
};
