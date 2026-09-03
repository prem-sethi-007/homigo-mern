import api from './api';

export const propertyService = {
  list: (params) => api.get('/properties', { params }).then((r) => r.data),
  getById: (id) => api.get(`/properties/${id}`).then((r) => r.data),
  mine: () => api.get('/properties/mine/list').then((r) => r.data),
  create: (data) => api.post('/properties', data).then((r) => r.data),
  update: (id, data) => api.put(`/properties/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/properties/${id}`).then((r) => r.data),

  getFavorites: () => api.get('/favorites').then((r) => r.data),
  addFavorite: (id) => api.post(`/favorites/${id}`).then((r) => r.data),
  removeFavorite: (id) => api.delete(`/favorites/${id}`).then((r) => r.data),
};
