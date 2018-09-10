<template>
    <div id="nav" class="fixed-top">
        <div class="toggles ml-5">
            <language-dropdown/>
            <profile-dropdown>
                <img src="@/assets/logo.png"/>
            </profile-dropdown>
        </div>
        <nav class="nav float-right">
            <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
            <router-link to="/login" v-if="!token" class="nav-link">{{ $t('nav.login') }}</router-link>
            <router-link to="/logout" v-if="token" class="nav-link">{{ $t('nav.logout') }}</router-link>
            <router-link to="/about" class="nav-link">{{ $t('nav.about') }}</router-link>
        </nav>
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
