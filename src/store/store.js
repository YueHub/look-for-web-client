import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  platform: 1, // 平台
  bottomTabBarItems: [  // 底部导航栏
    {
      name: 'index',
      link: '/index',
      icon: 'icon-zhuye4',
      content: '主页'
    },
    {
      name: 'release',
      link: '/release',
      icon: 'icon-fabu1',
      content: '发布'
    },
    {
      name: 'mine',
      link: '/mine',
      icon: 'icon-personal-select',
      content: '我'
    }
  ],
  bottomTabBarStatus: {
    index: '0',
    release: '0',
    mine: '1'
  },
  releaseInfo: {  // 发布信息
    
  }
}

const mutations = {

}

export default new Vuex.Store({
  state, mutations
})