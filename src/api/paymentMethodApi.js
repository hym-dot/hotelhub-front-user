import api from './axios';

const unwrap = (response) => response?.data?.data ?? response?.data;

export const paymentMethodApi = {
  // 저장된 카드 목록 (마스킹 번호, last4, isDefault 등)
  list: async () => unwrap(await api.get('/payment-methods')) || [],

  // 카드 추가
  // body: { cardNumber, cardExpirationYear, cardExpirationMonth, cardHolder?, nickname?, country?, isDefault?, cardBrand? }
  // 서버에서 브랜드 추론/마스킹 후 저장
  create: async (payload) => unwrap(await api.post('/payment-methods', payload)),

  // 카드 삭제
  remove: async (id) => unwrap(await api.delete(`/payment-methods/${id}`)),

  // 기본 결제수단 지정
  setDefault: async (id) => unwrap(await api.patch(`/payment-methods/${id}/default`)),
};

export default paymentMethodApi;
