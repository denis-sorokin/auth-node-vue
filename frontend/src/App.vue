<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>
  import Navbar from './components/feature/Navbar'
  import { mapGetters } from 'vuex'
  // import '../node_modules/bootstrap/js/dist'
  import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'

  export default {
      name: 'Root',
      components: { Navbar },
      computed: {
          ...mapGetters({
              error: 'getError'
          })
      },
      watch: {
          'error': function (val) {
              const msg = typeof val.msg === 'number' ? this.$t(`serverMsg.errors.${val.msg}`, 'serverMsg.errors.0') : val;
              this.showToast(msg, {
                  icon: 'warning',
                  position: 'top-right',
                  duration: 5000,
                  className: 'error-toastr'
              });
              this.$store.dispatch('ERROR_CLEAR')
          }
      }

  }
</script>
<style lang="scss">
  @import 'styles/main';
</style>
