<template>
    <div class="profile-dropdown mr-5">
        <span class="profile-section-avatar-container point" @click="toggleSidebar">
            <slot></slot>
        </span>
        <transition name="toggleSidebar">
            <div v-if="sidebar" class="profile-menu" id="menuProfile">
                <h1 class="m-3" v-if="user && user.username">{{ user.username }}</h1>
                <router-link v-for="(option, id) in defaultRoutes" :to="{name: option.redirectTo}"
                             :key="id" class="profile-menu__item">
                    {{ $t(`nav.${option.name}`) }}
                </router-link>
            </div>
        </transition>
    </div>
</template>
<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'ProfileDropdown',
		computed: {
			...mapGetters({
				user: 'getUser',
                sidebar: 'getSidebarStatus'
			}),
			defaultRoutes() {
				const routes = this.user && this.user.username ? () => {
                        const permission = 74;
                        const binary = ((permission >>> 0).toString(2));
                        const countIter = (binary[0] == 1? '0' + binary : binary).length % 3;
                        for (let i = 0; i < countIter; i++) {
                        	console.log((i+1) * 3)
                        }
                    }
					// {
					// 	name: 'home',
					// 	redirectTo: 'home'
					// },
					// {
					// 	name: 'about',
					// 	redirectTo: 'about'
					// },
					// {
					// 	name: 'football',
					// 	redirectTo: 'football'
					// },
					// {
					// 	name: 'logout',
					// 	redirectTo: 'logout'
					// }
				: [
					{
						name: 'login',
						redirectTo: 'login'
					},
					{
						name: 'signUp',
						redirectTo: 'signUp'
					}
				]
			}
		},
        methods: {
	        toggleSidebar() {
	        	this.$store.dispatch('SET_SIDEBAR_STATUS', !this.sidebar);
            }
        }
	}
</script>
