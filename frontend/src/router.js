import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

// router.beforeEach((to, from, next) => {
// 	if(to.path != '/football') {
// 		if(checkToken()) {
// 			logger('There is a token, resume. (' + to.path + ')');
// 			next();
// 		} else {
// 			logger('There is no token, redirect to login. (' + to.path + ')');
// 			next('login');
// 		}
// 	} else {
// 		logger('You\'re on the login page');
// 		next(); // This is where it should have been
// 	}
// 	// next(); - This is in the wrong place
// });

export default new Router({
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
})
