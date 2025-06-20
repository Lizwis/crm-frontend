import { default as axios } from 'axios'

let BaseApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
})

let Api = function () {
  let token = localStorage.getItem('token')

  BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  BaseApi.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  BaseApi.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

  //BaseApi.defaults.withCredentials = true;

  return BaseApi
}

export default Api
