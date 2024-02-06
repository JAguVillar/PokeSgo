<template>
  <!-- Your component template goes here -->
  <div class="mx-auto my-auto" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/User'
import Account from '@/components/UserAccount.vue'
import Auth from '@/components/UserAuth.vue'
import { supabase } from '../supabase'
export default {
  // Component data
  components: { Account, Auth },
  data() {
    return {
      countries: [],
      session: null,
      store: null
    }
  },
  methods: {
    // async getCountries() {
    //   const data = await supabase.from('countries').select()
    //   this.countries = data.data
    // }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  async mounted() {
    const userStore = useUserStore()
    await supabase.auth.getSession().then(({ data }) => {
      this.session = data.session
      console.log(this.session)
      userStore.newUserSession(this.session)
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      this.session = _session
      useUserStore().newUserSession(this.session)
    })
    this.store = userStore.getUser
    console.log(userStore.getUser)
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
/* Your component styles go here */
</style>
