import BaseApi from './baseApi'

export default {
  login(form) {
    return BaseApi().post('/login', form)
  },

  logout() {
    return BaseApi().post('/logout')
  },

  auth() {
    return BaseApi().get('/user')
  },
}
