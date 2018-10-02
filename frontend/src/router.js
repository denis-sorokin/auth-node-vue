import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import auth from './utils/tokenLocal'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/sign-up',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('./views/Logout.vue')
        },
        {
            path: '/football',
            name: 'football',
	        component: () => import('./views/Football.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '*',
            name: 'notFound',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
	if(to.path === '/football') {
		const token = auth.getToken();
		if(token) {
			next();
		} else {
			next('login');
		}
	} else {
		next();
	}
});

export default router;
