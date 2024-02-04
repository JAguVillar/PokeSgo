<template>
  <!-- Your component template goes here -->
  <div>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient'
export default {
  // Component data
  data() {
    return {
      countries: []
    }
  },
  methods: {
    async getCountries() {
      const data = await supabase.from('countries').select()
      this.countries = data.data
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getCountries()
  },
  computed: {},
  watch: {}
}
</script>

<style scoped>
/* Your component styles go here */
</style>
