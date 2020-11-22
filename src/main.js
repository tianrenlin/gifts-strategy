import Vue from 'vue'
import App from './App'

// 全局引入REQUEST，并添加到vue示例上
import request from './utils/request'
Vue.prototype.REQUEST=request
// 引入common.js
import {toast} from './utils/common'
Vue.prototype.TOAST=toast
// Vuex
import store from './store/store'
Vue.prototype.$store=store
// 提示更新的数据量
// Vue.config._mpTrace = true

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
