<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<script>
import { supabase } from '../supabase'

export default {
  props: ['session'],
  data() {
    return {
      loading: true,
      username: '',
      website: '',
      avatar_url: ''
    }
  },

  methods: {
    async getProfile() {
      try {
        this.loading = true
        const { user } = this.session

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single()

        if (error && status != 406) throw error

        if (data) {
          this.username = data.username
          this.website = data.website
          this.avatar_url = data.avatar_url
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
    async updateProfile() {
      try {
        this.loading = true
        const { user } = this.session

        const updates = {
          id: user.id,
          username: this.username,
          website: this.website,
          avatar_url: this.avatar_url,
          updated_at: new Date()
        }

        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
    async signOut() {
      console.log('hola')
      try {
        this.loading = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        console.log(this.session)
        this.loading = false
      }
    }
  },

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getProfile()
  },

  computed: {},

  watch: {}
}
</script>

<style scoped>
/* Your component styles go here */
</style>
