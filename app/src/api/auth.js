import axios from 'axios'

const headers = {}
headers['Content-type'] = 'application/json'

const config = {
  method: null,
  baseURL: 'http://localhost:8000',
  //url: 'http://localhost:8000/token', // APIサーバー
  url: null,
  headers,
  data: null
}

const token = function(){
  return localStorage.getItem('token')
}

export default {
  
  login: (authInfo) => {

    console.log("login:: username=", authInfo.username, " passowrd=", authInfo.password)
    const params = new URLSearchParams();
    params.append('username', authInfo.username);
    params.append('password', authInfo.password);

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      baseURL: 'http://localhost:8000'
    };

    return axios.post('/token', params, config)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
  },
  logout: () => {
    config.method = 'delete'
    config.url = '/token'
    return axios.request(config)
      .then(res => res)
      .catch(error => { throw error })
    
  },
  upload:(data) => {
    config.method = 'post'
    config.url = '/upload/try'
    config.headers.Authorization = `Bearer ${token()}`
    config.data = data
    console.log(config)
    return axios.request(config)
      .then((res) => {
        return res
      })
      .catch((error) => { throw error })
  },
  resistor:(data) => {
    config.method = 'post'
    config.url = '/signup'
    config.data = data
    return axios.request(config)
      .then((res) => {
        return res
      })
      .catch(error => { throw error })
  },
  getFile:() => {
    config.method = 'get'
    config.url = '/users/me/file'
    config.headers.Authorization = `Bearer ${token()}`
    return axios.request(config)
      .then((res) => {
        return res
      })
      .catch(error => { throw error })
  },
  getuser: () => {
    config.method = 'get'
    config.url = '/users/me'
    config.headers.Authorization = `Bearer ${token()}`
    console.log(config)
    return axios.request(config)
      .then((res) => {
        return res
      })
      .catch(error => { throw error })
  }  
}
