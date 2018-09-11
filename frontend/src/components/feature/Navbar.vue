<template>
    <div id="nav" class="fixed-top">
        <language-dropdown class="ml-5"/>
        <div class="toggles ml-5">
            <nav class="nav float-right">
                <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
                <router-link to="/about" class="nav-link">{{ $t('nav.about') }}</router-link>
            </nav>
            <profile-dropdown>
                <img src="@/assets/logo.png"/>
            </profile-dropdown>
        </div>
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
