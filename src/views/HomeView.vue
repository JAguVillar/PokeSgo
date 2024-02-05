<template>
  <!-- Your component template goes here -->
  <div class="container" style="padding: 50px 0 100px 0">
    {{ session }}
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

<script>
import Account from '@/components/UserAccount.vue'
import Auth from '@/components/UserAuth.vue'
import { supabase } from '../supabase'
export default {
  // Component data
  components: { Account, Auth },
  data() {
    return {
      countries: [],
      session: null
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
  mounted() {
    supabase.auth.getSession().then(({ data }) => {
      this.session = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      this.session = _session
    })
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
/* Your component styles go here */
</style>
