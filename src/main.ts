import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import './assets/scss/app.scss'
import './shared/filters'
import Toasted from 'vue-toasted'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false                                                                                                                    
let app: any
Vue.use(Toasted)
Vue.use(Vuelidate);

auth.onAuthStateChanged(user => {
  if (!app) {
    if (auth.currentUser) {
      store.dispatch('fetchUserProfile', [auth.currentUser, false])
    }
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
