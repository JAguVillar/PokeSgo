<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { supabase } from '../supabase'
export default {
  data() {
    return {
      loading: false,
      email: ''
    }
  },

  methods: {
    async handleLogin() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signInWithOtp({
          email: this.email
        })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    }
  },

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},

  computed: {},

  watch: {}
}
</script>

<style scoped>
/* Your component styles go here */
</style>
