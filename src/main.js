import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import {store} from "./store/index"
import './registerServiceWorker'
import vSelect from '../node_modules/vue-select'
import Notifications from 'vue-notification'

Vue.component('v-select',vSelect)
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
    created(){
    firebase.initializeApp({
        apiKey: "AIzaSyDL-6yALdbQlnUJ6fYxMjBr_ZdnOzZKxgk",
        authDomain: "crud-services-solera.firebaseapp.com",
        databaseURL: "https://crud-services-solera.firebaseio.com",
        projectId: "crud-services-solera",
        storageBucket: "crud-services-solera.appspot.com",
    })}
}).$mount('#app')
