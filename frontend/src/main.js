import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './i18n'
import toasted from './components/mixins/toasted'
import Input from './components/shared/Input'

Vue.config.productionTip = false;

Vue.mixin(toasted);
Vue.component('v-input', Input);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
