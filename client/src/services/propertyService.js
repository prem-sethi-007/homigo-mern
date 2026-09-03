import api from './api';

export const propertyService = {
  list: () => api.get('/properties').then((r) => r.data),
  getById: (id) => api.get(`/properties/${id}`).then((r) => r.data),
};
