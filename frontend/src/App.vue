<template>
  <div id="app">
    <navbar></navbar>
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
