import api from './api';

export const roommateService = {
  getMyProfile: () => api.get('/roommates/me').then((r) => r.data),
  createMyProfile: (data) =>
    api.post('/roommates/me', data).then((r) => r.data),
  updateMyProfile: (data) =>
    api.put('/roommates/me', data).then((r) => r.data),
};
