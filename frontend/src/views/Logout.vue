<template></template>
<script>
    export default {
        name: 'Logout',
        created () {
            this.$store.dispatch('AUTH_LOGOUT')
                .then(() => this.$router.push('/'))
        }
    }
</script>
