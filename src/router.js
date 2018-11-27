import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import index from './views/index'
import admin_list from './components/admin_list'
import operationList from './components/operationList'
import operation from './views/operation'
import Contioiner from './public/Contioiner'
import fanslist from './views/fanslist'
import wxSet from './views/wxSet'
import ctilist from './activity/CtiList'
import Redenvelope from './activity/Redenvelope'
import audit from './activity/audit'
import Envelopeissue from './activity/Envelopeissue'
import hello from './components/HelloWorld'
import inedxPage from './public/index'


Vue.use(Router)

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
            path: '/HelloWord',
            name: 'Hellow',
            component: hello
        },

        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // },

        {
            path: '/operation',
            name: 'operation',
            component: operation
        },
        {
            path: '/Contioiner',
            name: 'Contioiner',
            component: Contioiner,
            redirect: '/inedxPage',
            children: [{
                path: '/admin_list',
                name: 'admin_list',
                component: admin_list
            },
                {
                    path: '/operationList',
                    name: 'operationList',
                    component: operationList
                },
                {
                    path: '/fanslist',
                    name: 'fanslist',
                    component: fanslist
                },
                {
                    path: '/wxSet',
                    name: 'wxSet',
                    component: wxSet
                }, {
                    path: '/CtiList',
                    name: 'CtiList',
                    component: ctilist
                },
                {
                    path: '/Redenvelope',
                    name: 'Redenvelope',
                    component: Redenvelope
                }, {
                    path: '/audit',
                    name: 'audit',
                    component: audit
                }, {
                    path: '/Envelopeissue',
                    name: 'Envelopeissue',
                    component: Envelopeissue
                }, {
                    path: '/inedxPage',
                    name: 'inedxPage',
                    component: inedxPage
                }
            ]
        }

    ]
})
