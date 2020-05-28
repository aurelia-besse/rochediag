import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HeaderHomepage from "./components/HeaderHomepage";
import HeaderSmall from "./components/HeaderSmall";

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.component("home", HeaderHomepage);
Vue.component("headerSmall", HeaderSmall);
const router = new VueRouter({
  mode: 'history',
  base: "/assets/apps/com.S100B.roche/0.0.1/",
  routes: [
    {
      path: "/",
      name: "home",
      meta: { headerApp: "home", headerTitle : "S100B"},
      component: require("./components/Homepage.vue").default
    },
    {
      path: "/interpretation",
      name: "interpretation",
      meta: { headerApp: "headerSmall", headerTitle : "Interpréter"},
      component: require("./components/Interpretation.vue").default
    },
    {
      path: "/prescription",
      name: "prescription",
      meta: { headerApp: "headerSmall", headerTitle : "Prescrire"},
      component: require("./components/Prescription.vue").default
    },
    {
      path: "/sources",
      name: "sources",
      meta: { headerApp: "headerSmall", headerTitle : "Sources / CGU"},
      component: require("./components/Sources.vue").default
    }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
