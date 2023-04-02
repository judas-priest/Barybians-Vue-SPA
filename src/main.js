import { createApp } from "vue"
import "@/../public/css/__white.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { cssLoad, rot13 } from "@/../public/js/func.js"
import VueCookies from "vue3-cookies"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import Websocket from "./plugins/websocket/Main.js" //"vue-simple-websocket";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue"
import mitt from "mitt"
import Modal from "./mixins/modal.js"

const emitter = mitt()
const Vue = createApp(App)

Vue.use(VueCookies)
Vue.use(router)
Vue.use(store)
Vue.use(
  Websocket,
  `${process.env.VUE_APP_WSPORT}://${location.hostname}:3000`,
  {
    reconnectEnabled: true,
    reconnectInterval: 5000,
  }
)
Vue.mixin(Modal)
// directives.js
Vue.directive("outside", {
  beforeMount(element, binding, vnode) {
    element.OutsideEvent = function (event) {
      //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event, element)
        //binding.value();
      }
    }
    document.body.addEventListener("click", element.OutsideEvent)
  },
  unmounted(element) {
    document.body.removeEventListener("click", element.OutsideEvent)
  },
})
Vue.directive("click-outside", {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (
        !(el === event.target || el.contains(event.target)) &&
        !event.target.dataset.modal
      ) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener("click", el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent)
  },
})
Vue.directive("visibility", {
  update(el, binding) {
    if (binding.value) el.style.visibility = ""
    else el.style.visibility = "hidden"
  },
})
Vue.directive("touch", {
  beforeMount(el, binding) {
    el.touch = {}
    el.touchStart = (event) => {
      el.touch.startX = event.changedTouches[0].screenX
      el.touch.startY = event.changedTouches[0].screenY
    }
    el.touchEnd = (event) => {
      el.touch.endX = event.changedTouches[0].screenX
      el.touch.endY = event.changedTouches[0].screenY
      binding.value(el.touch, el)
    }
    el.addEventListener("touchstart", el.touchStart)
    el.addEventListener("touchend", el.touchEnd)
  },
  unmounted(el) {
    el.removeEventListener("touchstart", el.touchStart)
    el.removeEventListener("touchend", el.touchEnd)
  },
})
//
//

Vue.directive("focus", {
  inserted(el) {
    el.focus()
  },
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        // Вернуть 401, очистить информацию о токене и перейти на страницу входа
        case 401:
          localStorage.removeItem("token")
          router.replace({
            path: "/",
            // Перейти на текущую страницу после успешного входа
            // query: {redirect: router.currentRoute.fullPath}
          })
      }
      // Возвращаем сообщение об ошибке, возвращаемое интерфейсом
      return Promise.reject(error.response.data)
    }
  }
)
Vue.component("CollapseTransition", CollapseTransition)
Vue.config.globalProperties.settings = []
Vue.config.globalProperties.settings.style =
  Vue.config.globalProperties.$cookies.get("style")

Vue.config.globalProperties.emitter = emitter
Vue.config.globalProperties.cssLoad = cssLoad
Vue.config.globalProperties.cipher = rot13

Vue.config.globalProperties.host = `${location.protocol}//${location.hostname}` //host
Vue.config.globalProperties.content = process.env.VUE_APP_CONTENT //content
Vue.config.globalProperties.avatarPath = `${process.env.VUE_APP_CONTENT}/avatars/`
Vue.config.globalProperties.imageError = `this.src="${require("@/../public/img/404.jpg")}"`
Vue.config.globalProperties.imageErrorAvatar = `this.src="${Vue.config.globalProperties.avatarPath}404.webp"`
Vue.config.globalProperties.axios = axios
Vue.config.globalProperties.axios.defaults.baseURL = process.env.VUE_APP_API //api
Vue.config.globalProperties.axios.defaults.timeout = 10000

Vue.config.globalProperties.axios.defaults.headers.common["Authorization"] =
  null

Vue.mount("#base")
