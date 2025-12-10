import api from './axios';

const unwrap = (response) => response?.data?.data ?? response?.data;

export const couponApi = {
  // 사용 가능 쿠폰 목록
  getAvailable: async () => unwrap(await api.get('/coupons/available')) || [],

  // 쿠폰 적용
  // body: { code, amount }
  // 응답: { coupon, discountAmount, finalAmount } (amount에 대한 할인 결과)
  apply: async (payload) => unwrap(await api.post('/coupons/apply', payload)),
};

export default couponApi;
