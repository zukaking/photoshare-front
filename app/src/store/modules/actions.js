import auth from '@/api/auth'
import * as types from './mutation-types'

export default {
  login({ commit }, data) {
    console.log(data)
    return auth.login(data)
      .then((res) => {
        console.log(res)
        if (res.status === 200){
          localStorage.setItem('token', res.data.token)
          commit(types.LOGIN, res.data)
        }else{
          console.log('ログイン失敗')
          localStorage.removeItem('token')
          commit(types.LOGOUT, { token: null, userId: null }) 
        }
      })
      .catch(error => { throw error })
  },
  logout({ commit }) {
    return auth.logout()
      .then(() => {
        localStorage.removeItem('token')
        commit(types.LOGOUT, { token: null, userId: null }) 
      })
      .catch(error => { throw error })
  },
  getuser({commit},payload) {
    console.log(payload)
    return auth.getuser(payload)
    .then((res) => {
        if (res.status === 200){
          commit(types.GETUSER, res.data)
        }
    })
  }
}
