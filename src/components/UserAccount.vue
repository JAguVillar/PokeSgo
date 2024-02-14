<template>
  <div>
    <div class="h-12 bg-slate-600 w-full">
      <div class="w-full flex justify-between items-center h-full">
        <div>PokéSgo</div>
        <Avatar :path="'hlka'" :size="'12'"></Avatar>
        <a href="#" class="relative block">
          <img
            alt="profil"
            src="https://www.clipartmax.com/png/middle/26-262322_pixel-pokemon-sprites-by-clipart-pixel-art-pokemon-mew.png"
            class="mx-auto object-contain rounded-full w-8"
          />
        </a>
      </div>
    </div>
  </div>
  {{ session }}
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full items-center"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Supabase + Vue 3
      </h1>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in via magic link with your email below
      </h2>
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="updateProfile">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-2">
              <input
                id="email"
                type="text"
                :value="session.user.email"
                disabled
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <input
                id="username"
                type="text"
                v-model="username"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label for="website" class="block text-sm font-medium leading-6 text-gray-900"
              >Website</label
            >
            <div class="mt-2">
              <input
                id="website"
                type="url"
                v-model="website"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />

          <div>
            <input
              type="submit"
              class="button primary block"
              :value="loading ? 'Loading ...' : 'Update'"
              :disabled="loading"
            />
          </div>

          <div>
            <vs-button flat> Active </vs-button>
            <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/UserAvatar.vue'
import { supabase } from '../supabase'

export default {
  components: { Avatar },
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
    async signout() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
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
