import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import index from './views/index'
// import admin_list from './components/admin_list'
// import operationList from './components/operationList'
// import operation from './views/operation'
// import Contioiner from './public/Contioiner'
// import fanslist from './views/fanslist'
// import wxSet from './views/wxSet'
// import ctilist from './activity/CtiList'
// import Redenvelope from './activity/Redenvelope'
// import audit from './activity/audit'
// import Envelopeissue from './activity/Envelopeissue'
// import hello from './components/HelloWorld'
// import inedxPage from './public/index'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('./views/Home.vue').default
        },
        {
            path: '/HelloWord',
            name: 'Hellow',
            component: require('./components/HelloWorld').default
        },
        {
            path: '/operation',
            name: 'operation',
            component: require('./views/operation').default

        },
        {
            path: '/Contioiner',
            name: 'Contioiner',
            component: require('./public/Contioiner').default,
            redirect: '/inedxPage',
            children: [{
                path: '/admin_list',
                name: 'admin_list',
                component: require('./components/admin_list').default,
            },
                {
                    path: '/operationList',
                    name: 'operationList',
                    component: require('./components/operationList').default,

                },
                {
                    path: '/fanslist',
                    name: 'fanslist',
                    component: require('./views/fanslist').default,

                },
                {
                    path: '/wxSet',
                    name: 'wxSet',
                    component: require('./views/wxSet').default,
                }, {
                    path: '/CtiList',
                    name: 'CtiList',
                    component: require('./activity/CtiList').default,
                },
                {
                    path: '/Redenvelope',
                    name: 'Redenvelope',
                    component: require('./activity/Redenvelope').default,
                }, {
                    path: '/audit',
                    name: 'audit',
                    component: require('./activity/audit').default,

                }, {
                    path: '/Envelopeissue',
                    name: 'Envelopeissue',
                    component: require('./activity/Envelopeissue').default,
                }, {
                    path: '/inedxPage',
                    name: 'inedxPage',
                    component: require('./public/index').default,

                }
            ]
        }

    ]
})
