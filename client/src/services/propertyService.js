import api from './api';

export const propertyService = {
  list: (params) => api.get('/properties', { params }).then((r) => r.data),
  getById: (id) => api.get(`/properties/${id}`).then((r) => r.data),
};
