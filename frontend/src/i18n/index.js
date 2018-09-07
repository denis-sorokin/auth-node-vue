import Vue from 'vue'

// add translations directly to the application
Vue.i18n.add('ru', require('./ru.json'));
Vue.i18n.add('en', require('./en.json'));

// set the start locale to use
Vue.i18n.set('ru');

// set fallback for non-translated strings
Vue.i18n.fallback('en');
