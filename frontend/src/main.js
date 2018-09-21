import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './i18n'

import Datepicker from 'vuejs-datepicker';

import toasted from './components/mixins/toasted'

/* Custom components */
import Input from './components/shared/Input'
import Button from './components/shared/Button'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.mixin(toasted);
Vue.component('datepicker', Datepicker);
Vue.component('v-input', Input);
Vue.component('v-button', Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
