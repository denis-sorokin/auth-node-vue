<template>
  <div id="app">
    <navbar></navbar>
    <div id="nav">
      <router-link to="/">{{ $t('nav.home') }}</router-link> |
      <router-link to="/login">{{ $t('nav.login') }}</router-link> |
      <router-link to="/about">{{ $t('nav.about') }}</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import Navbar from './components/feature/Navbar'
  export default {
      name: 'Root',
      components: { Navbar }
  }
</script>
<style lang="scss">
  @import 'styles/main';
</style>
