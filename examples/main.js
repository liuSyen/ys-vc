import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import demoBlock from './components/demo-block.vue'
import VVUI from '../packages/index'
Vue.config.productionTip = false
Vue.component('demo-block', demoBlock)
Vue.use(VVUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
