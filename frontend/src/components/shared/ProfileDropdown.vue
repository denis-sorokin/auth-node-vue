<template>
    <div class="profile-dropdown dropdown navbar-dropdown">
        <a class="dropdown-toggle" href="#" id="dropdownMenuProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="profile-section-avatar-container">
                  <slot></slot>
              </span>
        </a>
        <div class="dropdown-menu last" aria-labelledby="dropdownMenuProfile">
            <div class="dropdown-menu-content text-center">
                <h1 class="m-0" v-if="user && user.username">{{ user.username }}</h1>
                <div v-for="(option, id) in (options || defaultRoutes)" :key="id"
                     class="dropdown-item">
                    <router-link :to="{name: option.redirectTo}">
                        {{ $t(`nav.${option.name}`) }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'ProfileDropdown',
        props: {
            options: {
                type: Array
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
            defaultRoutes() {
                return this.user && this.user.username? [
                    {
                        name: 'logout',
                        redirectTo: 'logout'
                    }
                ] : [
                    {
                        name: 'login',
                        redirectTo: 'login'
                    }
                ]
            }
        }
    }
</script>
