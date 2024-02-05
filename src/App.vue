<script setup></script>
<template>
  <vs-navbar center-collapsed v-model="active" class="nav">
    <template #left> </template>
    <vs-navbar-item id="guide"> Guide </vs-navbar-item>
    <vs-navbar-item id="docs"> Documents </vs-navbar-item>
    <vs-navbar-item id="components"> Components </vs-navbar-item>
    <vs-navbar-item id="license"> license </vs-navbar-item>
    <template #right>
      <vs-button flat>Login</vs-button>
      <vs-button>Get Started</vs-button>
    </template>
  </vs-navbar>

  <RouterView />
</template>

<style scoped>
.nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
