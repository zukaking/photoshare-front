import { createStore } from 'vuex'
import actions from '@/store/modules/actions'
import mutations from '@/store/modules/mutations'

const state = {
  auth: {
    token: localStorage.getItem('token')
  },
  isLogin: false,
  user: {
    username:'',
    email:'',
    user_id: ''
  }
}



export default createStore({
  state,
  actions,
  mutations,
  getters: {
    isLoggedIn(state) {
      return state.isLogin;
    },
    getToken(state){
      return state.auth.token;
    },
    getUser(state){
      return state.user;
    }

  },
})
