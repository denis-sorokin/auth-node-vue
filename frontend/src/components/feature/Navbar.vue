<template>
    <div id="nav">
        <language-dropdown class="ml-5"/>
        <profile-dropdown>
            <img id="logoProfile" src="@/assets/logo.png"/>
        </profile-dropdown>
    </div>
</template>
<script>
    import LanguageDropdown from '../shared/LanguageDropdown'
    import ProfileDropdown from '../shared/ProfileDropdown'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Navbar',
        components: { LanguageDropdown, ProfileDropdown },
        computed: {
            ...mapGetters({
                token: 'getToken',
                user: 'getUser'
            })
        }
    }
</script>
