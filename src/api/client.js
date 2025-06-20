import BaseApi from './baseApi'

export default {
  list() {
    return BaseApi().get('/clients')
  },

  create(form) {
    return BaseApi().post('/clients', form)
  },

  show(id) {
    return BaseApi().get(`clients/${id}`)
  },

  update(id, form) {
    return BaseApi().put(`clients/${id}`, form)
  },

  delete(id) {
    return BaseApi().delete(`clients/${id}`)
  },
}
