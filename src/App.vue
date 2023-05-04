<template>
  <div>
    <Header
      v-if="currentRouteName !== 'Index' && currentRouteName !== undefined"
    />
    <div id="preloader" class="visible transition" :style="bdk"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component
          :is="Component"
          :class="{ position__fixed: $store.state.modal.toggle }"
        />
      </transition>
    </router-view>
    <transition name="modal">
      <Modal v-if="$store.state.modal.toggle" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Modal from "@/components/Modal.vue"

import { preloaderStop } from "@/../public/js/func.js"

export default {
  name: "App",
  data() {
    return {
      bdk: `background-image: url('${this.host}/img/preloader.webp');`,
      loaded: false,
    }
  },
  components: {
    Header,
    Modal,
  },
  methods: {
    GetMyId(token) {
      //console.log(token)
      this.axios({
        method: "get",
        url: "/account",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      })
        .then((res) => {
          //console.log(res)
          this.$store.state.myId = res.data.userId
        })
        .catch((res) => {
          this.errorHandler(res.response.status)
        })
    },
    preloaderStop: preloaderStop,
  },
  created() {
    /* Стили */
    if (this.settings.style) this.cssLoad(this.settings.style)
    else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.$cookies.set("style", "black")
        this.cssLoad("black")
      }
    }

    if (this.$cookies.get("token") !== null) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.cipher(this.$cookies.get("token"))
      this.GetMyId(this.axios.defaults.headers.common["Authorization"])
    } else {
      if (location.pathname !== "/") this.$store.state.page = location.pathname
      this.$router.push(`/`)
    }
  },
  mounted() {
    this.emitter.on("loaded", () => {
      if (
        this.$store.state.loaded.avatars &&
        this.$store.state.loaded.content &&
        !this.loaded
      ) {
        this.preloaderStop()
        this.$store.state.loaded.content = false
        this.$store.state.loaded.preloader = true
        this.loaded = true
        console.log("loaded")
        // this.emitter.off('loaded')
      }
    })
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
  },
  watch: {
    "$store.state.modal.toggle": (val) => {
      if (val) document.documentElement.style.overflow = "hidden"
      else document.documentElement.style = "auto"
    },
  },
}
</script>

<style>
::-webkit-scrollbar {
  width: 18px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px var(--scroll);
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slider-enter-to,
.slider-leave {
  max-height: 100px;
  overflow: hidden;
}

.slider-enter,
.slider-leave-to {
  overflow: hidden;
  max-height: 0;
}

.slider-enter-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slider-leave-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s linear;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s linear;
}

a > sup {
  color: #fff;
}

@media screen and (max-width: 768px) {
  .emoji {
    font-size: 40pt;
  }
  img.emoji {
    width: 20pt;
  }
  .emoji-min {
    font-size: 14pt;
  }
  .modal-dialog {
    top: 40%;
  }
  .emoji-min img {
    width: 15pt;
  }
  img.image {
    max-width: 400px;
  }
}

a.morelink {
  color: black;
  text-decoration: none;
}

.link,
.link a:link,
.link hover:link,
.link a {
  color: #3377ff;
}

.link:hover {
  color: #00f;
}

.edit-btn {
  background: transparent;
  border: none;
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
  transition: opacity 400ms;
}

.close {
  background-color: transparent;
  border: 0;
  top: 5px;
  right: 35px;
  color: #f1f1f1;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

img.image {
  margin-top: 5px;
}

button,
button:active,
button:focus {
  border: 0 !important;
  outline: none !important;
}

span[data-type="image"] a > img {
  background-color: var(--card-bg);
  display: block;
  border: 1px solid var(--card-border);
}

span[data-type="link"] {
  background-color: var(--card-bg);
  display: block;
  border: 1px solid var(--card-border);
}

span[data-type="link"] a {
  text-decoration: none;
}

span[data-type="link"] a > div > .img-url-wrapper {
  background-color: #fff;
  display: flex;
}

span[data-type="link"] > a > div {
  text-align: left;
  padding: 10px 12px;
  line-height: 16.8px;
}

span[data-type="link"] div > div:nth-of-type(1) {
  margin: 0;
  color: var(--card-link);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 2px;
}

span[data-type="link"] div > div:nth-of-type(2) {
  font-weight: bold;
  margin: 0 0 0.15em;
  font-size: 12px;
  color: var(--text);
  font-size: 16px;
  line-height: 20px;
  word-break: break-word;
  white-space: pre-wrap;
}

span[data-type="link"] div > div:nth-of-type(3) {
  font-weight: unset;
  font-size: 12pt;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text);
  line-height: 20px;
  word-break: break-word;
  white-space: pre-wrap;
}

span[data-type="link"] img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

.less {
  height: 285px;
}

/*
                    input[type="password"]:hover,
                    input[type="datetime"]:hover,
                    input[type="datetime-local"]:hover,
                    input[type="date"]:hover,
                    input[type="month"]:hover,
                    input[type="time"]:hover,
                    input[type="week"]:hover,
                    input[type="number"]:hover,
                    input[type="email"]:hover,
                    input[type="url"]:hover,
                    input[type="search"]:hover,
                    input[type="tel"]:hover,
                    input[type="color"]:hover {   
                      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(165, 221, 0, 0.4)!important;
                      outline: 0 none!important;
                    }*/

textarea,
input[type="text"],
[contenteditable="true"],
input[type="date"],
input[type="password"],
select {
  box-shadow: none !important;
  outline: none !important;
  border: 1px solid !important;
  border-color: var(--placeholder) !important;
  border-radius: 4pt;
  color: var(--msg-text) !important;
}

textarea:focus,
input[type="text"]:focus,
[contenteditable="true"]:focus,
input[type="password"]:focus,
select:focus {
  box-shadow: none !important;
  outline: none !important;
  border: 1px solid !important;
  border-color: var(--link) !important;
  border-radius: 4pt;
}

/*
                    input[type="password"]:focus,
                    input[type="datetime"]:focus,
                    input[type="datetime-local"]:focus,
                    input[type="date"]:focus,
                    input[type="month"]:focus,
                    input[type="time"]:focus,
                    input[type="week"]:focus,
                    input[type="number"]:focus,
                    input[type="email"]:focus,
                    input[type="url"]:focus,
                    input[type="search"]:focus,
                    input[type="tel"]:focus,
                    input[type="text"]:focus,
                    input[type="color"]:focus {   
                      border-color: #a5dd00!important;
                      box-shadow: 0 1px 1px rgba(255, 255, 255, 0.075) inset, 0 0 8px rgba(165, 221, 0, 0.6)!important;
                      outline: green solid 3px!important;
                    }
                    input[type=text]:focus, textarea:focus {
                      border: 51px solid!important;
                      border-color: #a5dd00!important;
                      outline: green solid 3px!important;
                    }*/

/*костыль для бутстраповского модального окна
                    .modal-open {
                      padding-right: 0 !important;
                    }*/

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

[v-cloak] {
  display: none;
}

body {
  background: var(--background);
  font-family: "Open Sans", "Arial";
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.position__fixed {
  overflow-y: hidden;
  filter: blur(3px);
  overflow: hidden;
}

#preloader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  overflow: visible;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--background);
}

.base {
  margin-top: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
}

input,
textarea,
select {
  background-color: var(--background) !important;
}

a:hover,
a:not(.link) {
  color: var(--link);
  text-decoration: none;
}

.btn-outline-danger,
.btn-success {
  border: 1px solid !important;
}

.btn-outline-danger {
  border-color: var(--danger) !important;
}

.btn-success {
  border-color: #198754 !important;
}

.modal-backdrop {
  transition: opacity 0.15s linear;
  background-color: #000000bb;
  z-index: 3333;
}

.modal {
  display: block;
}

.modal-header {
  align-items: unset;
  border-bottom: 1px solid var(--block-time);
}

.modal-close {
  fill: var(--block-time);
  cursor: pointer;
}

.modal-close:hover {
  fill: var(--hover);
}

.modal-dialog {
  position: unset;
  color: var(--text);
}

.modal-content {
  position: unset;
  background-color: var(--block-bg);
}

.modal-footer {
  border-top: 0;
}

.send_button {
  background-color: transparent;
  width: auto;
  fill: var(--msg-send);
}

.userOnline {
  border: 2pt outset #0f0;
}

.pointer {
  cursor: pointer;
}

.transition {
  transition: 0.3s;
}

h4 {
  margin-top: 15px;
}

span.attachment {
  display: flex;
  overflow: hidden;
}

span.attachment[data-type="sticker"] > img {
  max-width: 10em;
}

span.attachment[data-type="link"] {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: nowrap;
}

span.attachment > a > div {
  overflow: auto;
}

span.attachment,
span.attachment > a > img {
  max-width: 100%;
}

@media screen and (max-width: 576px) {
  .base {
    margin-top: 0;
    margin-bottom: 22px;
  }
}

@media (min-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 1600px;
  }
}

@media (min-width: 1200px) {
  span.attachment,
  span.attachment > a > img {
    max-width: 30vh;
  }
}
</style>
