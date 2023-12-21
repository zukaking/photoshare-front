<template>
  <div class="login">
    <h1>ログイン</h1>
    <div class="form-item">
      <label for="email">ユーザ名（Email）</label>
      <input
        id="email"
        autocomplete="off"
        type="text"
        v-model="email"
      >
    </div>
    <div class="form-item">
      <label for="password">Password</label>
      <input
        id="password"
        autocomplete="off"
        type="password"
        v-model="password"
      >
    </div>
    <div class="form-item">
      <button type="button" class="btn btn-outline-secondary mt-3" @click="handle()">Login</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    login: {
      type: Function,
      required: true
    }
  },
  methods: {
    handle () {
      this.login({
        'username': this.email,
        'password': this.password
      })
      .catch(err => { throw err })
    },
  }
});
</script>

<style scoped>

.login{
  border: 1px solid #d1d1d1;
  padding: 20px;
}
.form-item {
  margin: 10px auto;
}

label {
  display: block;
}

input {
  width: 50%;
  padding: .5em;
  font: inherit;
}


</style>
