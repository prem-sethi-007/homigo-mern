import api from './api';

export const roommateService = {
  list: () => api.get('/roommates').then((r) => r.data),
  getById: (id) => api.get(`/roommates/${id}`).then((r) => r.data),

  getMyProfile: () => api.get('/roommates/me').then((r) => r.data),
  createMyProfile: (data) =>
    api.post('/roommates/me', data).then((r) => r.data),
  updateMyProfile: (data) =>
    api.put('/roommates/me', data).then((r) => r.data),
};
