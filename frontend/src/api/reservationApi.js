import api from './axios';

const unwrap = (response) => response?.data?.data ?? response?.data;

export const reservationApi = {
    createReservation: async (reservationData) => unwrap(await api.post('/reservations', reservationData)),
    getMyReservations: async () => unwrap(await api.get('/reservations/my')) || [],
    getReservationDetail: async (reservationId) => unwrap(await api.get(`/reservations/${reservationId}`)),
    cancelReservation: async (reservationId, payload = {}) => {
        // Prefer PATCH but fallback to POST for backward compatibility
        try {
            return unwrap(await api.patch(`/reservations/${reservationId}/cancel`, payload));
        } catch (error) {
            return unwrap(await api.post(`/reservations/${reservationId}/cancel`, payload));
        }
    },
};
