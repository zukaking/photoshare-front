import * as types from './mutation-types'

export default {
  [types.LOGIN] (state, payload) {
    console.log(payload)
    state.auth.token = payload.token
  },
  [types.LOGOUT] (state, payload) {
    state.auth.token = payload.token
    state.auth.userId = payload.user_id
  },
  [types.GETUSER] (state, payload){
    console.log(payload)
    state.user = payload
  }
}
