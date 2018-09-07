import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import auth from './modules/auth'
import errors from './modules/errors'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production',
    modules: {
        auth,
        errors
    },
});

const config = {
    translateFilterName: 't'
};

Vue.use(VuexI18n.plugin, store, config);

export default store;
