<template>
  <div>
    <header-view v-bind:menue="false"/>
    <login-form :login="handleLogin" />
    <div v-show="invalid" class="text-danger">ログインに失敗しました</div>
    <p class="ms-3 mt-2">ユーザー登録は<router-link to="/signup">こちら</router-link></p>
  </div>
</template>

<script>
import LoginForm from '@/components/molecules/LoginForm.vue'
import HeaderView from '@/components/organisms/HeaderView.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    HeaderView
  },
  data() {
    return {
      invalid: false
    }
  },
  methods: {
    handleLogin (authInfo) {
      return this.$store.dispatch('login', authInfo)
        .then( () => {
          this.$router.push({ path: '/' })          
        })
        .catch((err) => {
          this.invalid = true;
          throw err 
        })
    }
  }
};
</script>

<style scoped>

</style>
