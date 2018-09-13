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
              error: 'getError',
              message: 'getMessage'
          })
      },
      watch: {
          'error': function (val) {
              if (val != null) {
                  const detail = val.detail;
                  const msg = typeof val.msg === 'number' ? this.$t(`serverMsg.errors.${val.msg}`, 'serverMsg.errors.0') : null;
                  this.showToast(msg, {
                      icon: 'fa-exclamation-triangle',
                      position: 'top-right',
                      duration: 5000,
                      className: 'error-toastr'
                  });

                  if (detail) {
                      detail.forEach(e => {
                          this.showToast(this.$t(`serverMsg.libErrors.${e}`, e), {
                              icon: 'fa-exclamation-triangle',
                              position: 'top-right',
                              duration: 5000,
                              className: 'error-toastr'
                          });
                      })
                  }
                  this.$store.dispatch('ERROR_CLEAR')
              }
          },
          'message': function (val) {
              if (val != null) {
                  const msg = typeof val.msg === 'number' ? this.$t(`serverMsg.notifications.${val.msg}`, 'serverMsg.notifications.0') : null;
                  if (msg != null) {
                      this.showToast(msg, {
                          icon: 'fa-check-circle',
                          position: 'top-right',
                          duration: 5000,
                          className: 'success-toastr'
                      });
                      this.$store.dispatch('MSG_CLEAR')
                  }
              }
          }
      }

  }
</script>
<style lang="scss">
  @import 'styles/main';
</style>
