<template>
    <div class="profile-dropdown dropdown navbar-dropdown">
        <a class="dropdown-toggle" href="#" id="dropdownMenuProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="profile-section-avatar-container">
                  <slot></slot>
              </span>
        </a>
        <div class="dropdown-menu last" aria-labelledby="dropdownMenuProfile">
            <div class="dropdown-menu-content text-center">
                <h1 class="m-3" v-if="user && user.username">{{ user.username }}</h1>
                <router-link v-for="(option, id) in defaultRoutes" :to="{name: option.redirectTo}" :key="id" class="dropdown-item">
                    {{ $t(`nav.${option.name}`) }}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'ProfileDropdown',
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
            defaultRoutes() {
                return this.user && this.user.username? [
	                {
		                name: 'football',
		                redirectTo: 'football'
	                },
                    {
                        name: 'logout',
                        redirectTo: 'logout'
                    }
                ] : [
                    {
                        name: 'login',
                        redirectTo: 'login'
                    },
                    {
                        name: 'signUp',
                        redirectTo: 'register'
                    }
                ]
            }
        }
    }
</script>
