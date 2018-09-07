<template>
    <div class="fixed-top">
        <language-dropdown/>
        <profile-dropdown>
            <img src="@/assets/logo.png"/>
        </profile-dropdown>
    </div>
</template>
<script>
    import LanguageDropdown from '../shared/LanguageDropdown'
    import ProfileDropdown from '../shared/ProfileDropdown'

    export default {
        name: 'Navbar',
        components: { LanguageDropdown, ProfileDropdown }
    }
</script>
