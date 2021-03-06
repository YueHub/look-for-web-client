import Vue from 'vue'
import VueRouter from 'vue-router'

import Preview from '@/components/Preview'
import InfoBoard from '@/pages/info-board'
import Index from '@/pages/index/index'
import Release from '@/pages/release/release'
import ReleaseResult from '@/pages/release/release-result'
import Mine from '@/pages/mine/mine'
import MyInfo from '@/pages/mine/my-info'
import MyRelease from '@/pages/mine/my-release'
import MyView from '@/pages/mine/my-view'
import MyUncover from '@/pages/mine/my-uncover'
import Help from '@/pages/mine/help'
import AboutUs from '@/pages/mine/about-us'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '/infoboard',
      name: 'infoboard',
      component: InfoBoard
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/release',
      name: 'release',
      component: Release
    },
    {
      path: '/release/result',
      name: 'release-result',
      component: ReleaseResult
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: MyInfo
    },
    {
      path: '/myrelease',
      name: 'myrelease',
      component: MyRelease
    },
    {
      path: '/myview',
      name: 'myview',
      component: MyView
    },
    {
      path: '/myuncover',
      name: 'myuncover',
      component: MyUncover
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    }
  ]
})
