import Vue from 'vue';
import axios from 'axios';
import iView from 'iview';
import Print from 'vue-print-nb';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(Print);
Vue.use(iView);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
