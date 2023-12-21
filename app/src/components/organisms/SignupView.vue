<template>
    <div class="container">
      <header-view subtitle=" &gt; ユーザー登録"/>
      <form class="form" action="post">
        <label for="username">ユーザ名</label>
        <input class="input" type="text" id="username" placeholder="ユーザ名" v-model="userInfo.username">

        <label for="mail">メールアドレス</label>
        <input class="input" type="text" id="mail" placeholder="メールアドレス" v-model="userInfo.email">

        <label for="passwd">パスワード</label>
        <input class="input" type="password" id="passwd" placeholder="パスワード" v-model="userInfo.password">

        <label for="up"></label>
        <button type="button" id="up" class="btn btn-outline-secondary mt-3" v-on:click="resistor">登録</button>
      </form>
      <div v-show="complete">ユーザー登録完了しました</div>
      <div v-show="invalid" class="text-danger">{{ invalidMsg}}</div>
      <div><router-link to="/login">ログインページへ</router-link></div>
    </div>
  
</template>

<script>
//import axios from 'axios'
import HeaderView from "@/components/organisms/HeaderView.vue";
import auth from '@/api/auth';
//const rootname = "http://ec2-52-194-191-241.ap-northeast-1.compute.amazonaws.com"
//const rootname = "http://localhost"

export default {
  name: 'UserResistration',
  data(){
    return {
      userInfo:{
        email: "",
        password: "",
        username: "",
      },
      complete: false,
      invalid: false,
      invalidMsg: ''
    }
  },
  components: {
    HeaderView
  },
  methods: {
    resistor(){     
      this.init()
      if(!this.checkFormat()){
        console.log('不正な入力があります')
        this.invalid = true
        return
      }

      let _userInfo = this.userInfo;
      console.log(_userInfo)
      auth.resistor(_userInfo).then(() => {
        this.complete= true
      }).finally(() => {
        _userInfo.email = '';
        _userInfo.password = '';
        _userInfo.username = ''
        console.log(_userInfo)
        }
      )
    },
    checkFormat(){
      if(this.userInfo.email === ''
      || this.userInfo.password === ''
      || this.userInfo.username === ''){
        this.invalidMsg = "不正な入力があります"
        return false
      }

      console.log(this.userInfo.email.split('@'))
      if(this.userInfo.email.indexOf('@') === -1
      || this.userInfo.email.split('@')[0].length === 0
      || this.userInfo.email.split('@')[1].length === 0){
        this.invalidMsg = "メールアドレスが不正です"
        return false
      }

      if(this.userInfo.password.length < 8){
        this.invalidMsg = "パスワードは8文字以上です"
        return false
      }

      return true
    },
    init(){
      this.invalid = false,
      this.invalidMsg = ''
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label{
  display: block;
}

.form{
  margin: 2rem;
}

.input{
  margin-bottom: 10px;
  width: 50%;
  padding: .5em;
}
</style>
