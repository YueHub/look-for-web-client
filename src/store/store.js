import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  platform: 1, // 平台
  userId: 'iwkkdsikls', // 用户 Id
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
  bottomTabBarStatus: { // 底部导航状态栏
    index: '0',
    release: '0',
    mine: '1'
  },
  releaseInfo: {  // 填写的发布信息
    
  },
  myReleases: null,  // 用户发布的帖子

  myViews: null,  // 用户浏览过的帖子

  myUncovers: null,  // 用户揭榜的帖子

  myWins: null // 用户中标的帖子

}

const mutations = {
  // 更新用户相关信息
  updateUserInfo: function (state, userInfo) {
    // this.userName = result.identifyId;
    // this.popularityValue = result.popularityValue;
    // this.creditValue = result.creditValue;

    state.myReleases = userInfo.postReleases
    state.myViews = userInfo.postViews
    state.myUncovers = userInfo.postUncovers
  },
  // 更新用户发布的帖子
  updateMyReleases: function (state, payload) {
    state.myReleases = payload.myReleases
  },
  // 更新用户浏览的帖子
  updateMyViews: function (state, payload) {
    state.myViews = payload.myViews
  },
  // 更新用户揭榜的帖子
  updateMyUncovers: function (state, payload) {
    state.myUncovers = payload.myUncovers
  },
  // 更新用户中标的帖子
  updateMyWins: function (state, payload) {
    state.myWins = payload.myWins
  }
}

const actions = {
  /**
   * TODO 从微信平台获取用户 ID
   * getUserId
   */

  /**
   * 获取用户信息
   */
  getUserInfo: function ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:8080/user/" + state.userId
      })
        .then(function(response) {
          let userInfo = response.data.result;
          commit('updateUserInfo', userInfo);
          resolve(userInfo)
        })
        .catch(function(error) {
          reject(error)
        });
    })
  },

  /**
   * 获取大厅帖子信息
   */
  getPosts: function ({commit, state}) {
    commit
    state
  }
}

export default new Vuex.Store({
  state, mutations, actions
})