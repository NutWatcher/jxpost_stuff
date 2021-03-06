import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */'./views/About.vue'),
    },
    {
        path: '/addstuff',
        name: 'addstuff',
        component: () => import('./views/AddStuff.vue'),
    },
    {
        path: '/removestuff',
        name: 'removestuff',
        component: () => import('./views/RemoveStuff.vue'),
    },
    {
        path: '/records',
        name: 'records',
        component: () => import('./views/Records.vue'),
    },
    {
        path: '/reports',
        name: 'reports',
        component: () => import('./views/Reports.vue'),
    },
    ],
});
