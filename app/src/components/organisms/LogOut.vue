<template>
  <div>
    <button class="btn btn-outline-secondary" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'LogOut',
  methods: {
    logout () {
      return this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch(error => { throw error })
    }
  }
}
</script>

<style scoped>

</style>

