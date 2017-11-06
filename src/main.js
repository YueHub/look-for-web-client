// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import axios from 'axios'    // axios

import { Upload, Button, Dialog } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import { WechatPlugin } from 'vux'


Vue.use(axios)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(WechatPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
