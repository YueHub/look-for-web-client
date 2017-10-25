import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  platform: 1, // 平台
  bottomTabBarItems: [
    {
      link: '/index',
      imgName: 'logo.png',
      content: '主页'
    },
    {
      link: '/release',
      imgName: 'logo.png',
      content: '发布'
    },
    {
      link: '/mine',
      imgName: 'logo.png',
      content: '我'
    }
  ]
}

const mutations = {

}

export default new Vuex.Store({
  state, mutations
})