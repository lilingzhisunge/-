// ie polyfill
import '@babel/polyfill'
import VueAMap from 'vue-amap'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import { VueAxios } from './utils/request'
// mock
import './mock'
import moment from 'moment'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter'
// 导入文件
import HappyScroll from 'vue-happy-scroll'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
import CnRegionPicker from 'cn-region-picker'
Vue.use(HappyScroll)
Vue.prototype.$moment = moment// 赋值使用
Vue.use(VueAMap)
moment.locale('zh-cn') // global filter

// use
Vue.use(CnRegionPicker)
Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.prototype.playAudio = () => {
  if (document.getElementById('audio') != null) {
    const buttonAudio = document.getElementById('audio')
    buttonAudio.play()
  } else {}
}
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '07176057703ba0dd848eaa114cb21275',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'Geocoder'],
  v: '1.4.4'

})
Vue.prototype.pauseAudio = () => {
  if (document.getElementById('audio') != null) {
    const buttonAudio = document.getElementById('audio')
    buttonAudio.pause()
    buttonAudio.currentTime = 0
  } else {}
}
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
