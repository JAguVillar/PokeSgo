import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null
  }),
  getters: {
    getUser() {
      return this.user
    }
  },
  actions: {
    newUserSession(user) {
      this.user = user

      console.log(this.user)
    }
  }
})
