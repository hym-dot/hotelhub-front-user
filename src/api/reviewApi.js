import api from './axios';

const unwrap = (response) => response?.data?.data ?? response?.data;

export const reviewApi = {
  create: async (payload) => unwrap(await api.post('/reviews', payload)),
  list: async (params) => unwrap(await api.get('/reviews', { params })) || [],
  update: async (id, payload) => unwrap(await api.patch(`/reviews/${id}`, payload)),
  remove: async (id) => unwrap(await api.delete(`/reviews/${id}`)),
  report: async (id, payload) => unwrap(await api.post(`/reviews/${id}/report`, payload)),
};
