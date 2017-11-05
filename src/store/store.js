import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
  bottomTabBarStatus: { // 底部导航状态栏
    index: '0',
    release: '0',
    mine: '1'
  },
  userId: '1', // 用户 Id
  userName: null, // 用户名
  popularityValue: null, // 用户人气值
  creditValue: null, // 用户信用值

  posts: null,  // 大厅帖子
  releasePostInfo: null,  // 填写的发布信息
  releaseStatus: null, // 帖子发布操作状态

  myReleases: null,  // 用户发布的帖子

  myViews: null,  // 用户浏览过的帖子

  myUncovers: null,  // 用户揭榜的帖子

  myWins: null, // 用户中标的帖子

  forwards: null, // 用户转发图

  shareStatus: null, // 分享转发状态

  shareUrl: null, // 分享转发后链接

}

const mutations = {
  // 更新大厅帖子信息
  updatePosts: function (state, posts) {
    state.posts = posts
  },
  // 更新用户相关信息
  updateUserInfo: function (state, userInfo) {
    state.userName = userInfo.identifyId;
    state.popularityValue = userInfo.popularityValue;
    state.creditValue = userInfo.creditValue;
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
  },
  // 更新发布相关信息
  updateReleasePostInfo: function (state, payload) {
    state.releasePostInfo = payload.releasePostInfo
  },
  // 更新发布相关状态和信息
  updateRelease: function (state, result) {
    result
    // if (result.... === success) 如果返回添加成功
    state.releasePostInfo = null  // 重置填写的发布信息
    state.releaseStatus = 'success' // 设置发布状态为成功

    // if (result === error) 如果返回添加操作失败
    // state.releaseStatus = 'error' 设置发布状态为失败
  },
  // 更新分享状态
  updateShare: function (state, result) {
    state.forwards = result.forwards  // 更新用户转发图
    state.shareUrl = result.shareUrl  // 更新转发链接
  }
}

const actions = {
  /**
   * TODO 从微信平台获取用户 ID
   * getUserId
   */



  /**
   * 获取大厅帖子信息
   */
  getPosts: function ({commit}) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:8080/postrelease?status=1"
      })
        .then(function(response) {
          let posts = response.data.result
          commit('updatePosts', posts)
          resolve(posts)
        })
        .catch(function(error) {
          reject(error)
        });
    })
  },

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
   * 用户发布帖子
   */
  addPost: function ({commit, state}) {
    return new Promise((resolve, reject) => {
      if (state.releasePostInfo === null) {
        return;
      }
      axios({
        method: "post",
        url: "http://localhost:8080/postrelease",
        data: state.releasePostInfo
      })
        .then(function(response) {
          let result = response.data.result
          commit('updateRelease', result)
          resolve(result)
        })
        .catch(function(error) {
          reject(error)
        });
    })
  },

  /**
   * 分享转发帖子
   */
  sharePost: function({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      // TODO 调用微信 JSSDK 进行转发分享
      
      axios({
        method: "post",
        url: "http://localhost:8080/postforward/forward",
        data: {
          postId: userInfo.postId,
          startUserId: userInfo.startUserId,
          endUserId: userInfo.endUserId
        }
      })
        .then(function(response) {
          let result = {}
          console.log('分享后路径')
          var shareUrl = 'http://localhost:8080/postforward/forward?postId=' + userInfo.postId
          shareUrl += ' && startUserId = ' + userInfo.startUserId
          shareUrl += ' && endUserId = ' + userInfo.endUserId
          result.shareUrl = shareUrl
          result.forwards = []
          console.log(shareUrl)
    
          // .then 
          commit('updateShare', result)
          resolve(response);
        })
        .catch(function(error) {
          reject(error)
        });
    })
  },

  /**
   * 获取用户转发路径
   */
  getSharePath: function ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:8080/postforward/" + userInfo.postId + "/" + userInfo.startUserId + "/" + userInfo.endUserId
      })
        .then(function(response) {
          let userInfo = response.data;
          // commit('updateUserInfo', userInfo);
          resolve(userInfo)
        })
        .catch(function(error) {
          reject(error)
        });
    })
  }

}

export default new Vuex.Store({
  state, mutations, actions
})