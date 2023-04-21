<template>
  <div v-cloak v-if="$store.state.myId">
    <nav
      class="navbar navbar-expand-sm navbar-expand-lg fixed-top snowflakes"
      id="nav-top"
      v-if="!$store.state.mobile"
    >
      <div class="container" :class="{ page__loading: loading }">
        <router-link
          class="navbar-brand logo"
          :to="!$store.state.edit ? `/profile/id${myId}` : ''"
          >Барыбинцы</router-link
        >

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ 'nav-link-active': $route.name == 'Dialogs' }"
              :to="!$store.state.edit ? '/dialogs' : ''"
              >Сообщения
              <sup class="nav-msg-not" v-show="messagesCount > 0">{{
                messagesCount
              }}</sup></router-link
            >
          </li>
          <li class="nav-item" id="nav-users">
            <span
              class="nav-link pointer"
              :class="{ 'nav-link-active': isSlided }"
              @click="isSlided = !isSlided && !$store.state.edit"
              id="btn_all-users"
              ref="user"
              >Обитатели</span
            >
          </li>
          <li class="nav-item" id="nav-feed">
            <router-link
              class="nav-link"
              :class="{ 'nav-link-active': $route.name === 'Feed' }"
              id="btn_feed"
              :to="!$store.state.edit ? '/feed' : ''"
              >Новости</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav pull-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ 'nav-link-active': $route.name === 'Settings' }"
              :to="!$store.state.edit ? '/settings' : ''"
            >
              <SettingsBtn />
            </router-link>
          </li>
          <li class="nav-item">
            <span
              class="nav-link pointer"
              @click="!$store.state.edit ? Logout() : ''"
              >Выйти
              <LogoutBtn />
            </span>
          </li>
        </ul>
      </div>

      <Friends :slided="isSlided" @outside="outside" v-if="$store.state.myId" />
      <!-- <Garland /> -->
    </nav>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom snowflakes"
      id="nav-bottom"
      :class="{ page__loading: loading }"
      v-else
    >
      <div class="container" id="nav-container">
        <span
          class="nav-btn"
          :class="{ 'nav-btn-prsd': $route.name === 'Profile' }"
        >
          <router-link :to="!$store.state.edit ? `/profile/id${myId}` : ''">
            <img class="nav-btn-img" src="/img/nav/budka.svg" alt="profile" />
          </router-link>
        </span>
        <span
          class="nav-btn"
          :class="{ 'nav-btn-prsd': $route.name === 'Dialogs' }"
        >
          <router-link :to="!$store.state.edit ? '/dialogs' : ''">
            <img class="nav-btn-img" src="/img/nav/mes.svg" alt="dialogs" /><sup
              class="nav-msg-not"
              v-show="messagesCount > 0"
              >{{ messagesCount }}</sup
            >
          </router-link>
        </span>
        <span
          id="nav-friends"
          class="nav-btn"
          :class="{ 'nav-btn-prsd': isSlided }"
        >
          <img
            @click="isSlided = !isSlided && !$store.state.edit"
            id="btn_all-users"
            ref="user"
            class="nav-btn-img pointer"
            src="/img/nav/friends.svg"
            alt="friends"
          />
        </span>
        <span
          id="nav-feed"
          class="nav-btn"
          :class="{ 'nav-btn-prsd': $route.name === 'Feed' }"
        >
          <router-link :to="!$store.state.edit ? '/feed' : ''">
            <img class="nav-btn-img" src="/img/nav/feed.svg" alt="feed" />
          </router-link>
        </span>
        <span
          id="nav-settings"
          class="nav-btn"
          :class="{ 'nav-btn-prsd': $route.name === 'Settings' }"
        >
          <router-link :to="!$store.state.edit ? '/settings' : ''">
            <img
              class="nav-btn-img"
              src="/img/nav/settings.svg"
              alt="settings"
            />
          </router-link>
        </span>
      </div>
      <Friends :slided="isSlided" @outside="outside" v-if="$store.state.myId" />
      <!-- <Garland /> -->
    </nav>
    <!-- <Snowflakes />  -->
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  padding: 0.4em 1em;
  display: block;
}

div#nav-container {
  padding: 0;
}

.navbar-brand {
  padding-bottom: 0;
  padding-top: 0;
}

.page__loading:after {
  content: "";
  // position: absolute;
  // width: 100%;
  // height: 2px;
  // bottom: 0;
  // left: 0;
  //
  // display: block;
  // margin: auto;
  // height: 2px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 20%;
  background-color: var(--nav-link);
  animation: underline 2s infinite;
}

@keyframes underline {
  0% {
    margin-left: 0%;
  }
  50% {
    margin-left: 80%;
  }
  100% {
    margin-left: 0%;
  }
}

.logo:hover,
.nav-item:hover {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.55));
}

.nav-link {
  padding: 0;
  color: var(--nav-link);
  fill: var(--nav-link);
}

.nav-link:hover {
  color: var(--nav-link-hover);
  fill: var(--nav-link-hover);
}

.nav-link:active,
.logo:active {
  color: var(--nav-link-active);
  fill: var(--nav-link-active);
}

.nav-link-active {
  color: var(--nav-link-active);
  fill: var(--nav-link-active);
}

#nav-top {
  z-index: 1111;
}

#nav-bottom {
  margin-bottom: -1px;
  margin-right: -1px;
  z-index: 3000;
}

#nav-top,
#nav-bottom {
  background-color: var(--primary) !important;
}

.navbar-nav {
  margin-bottom: -1px;
}

.nav-btn-prsd .nav-btn-img {
  padding: 3px;
  background-color: var(--foreground);
  border-radius: 25px;
}

.nav-btn-img {
  filter: invert(100%);
  width: 30px;
  height: 30px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--primary);
}

#nav a.router-link-exact-active {
  color: rgba(255, 255, 255, 0.75);
}

.selected {
  color: rgba(255, 255, 255, 0.75) !important;
}

.logo {
  color: var(--logo) !important;
}

.container {
  display: flex;
}

ul.pull-right {
  margin-left: auto;
}

.router-link-exact-active > img:not(.nav-btn-img) {
  filter: drop-shadow(0 0 2px rgba(255, 255, 255));
}
</style>

<script>
import Friends from "@/components/Friends"
import SettingsBtn from "@/components/Buttons/Settings.vue"
import LogoutBtn from "@/components/Buttons/Logout.vue"
/*
import Garland from "@/components/Garland"
import Snowflakes from "@/components/Snowflakes"
*/
import { errorHandler } from "/public/js/func.js"
export default {
  name: "Header",
  components: {
    Friends,
    SettingsBtn,
    LogoutBtn,
  },
  data() {
    return {
      myId: this.$store.state.myId,
      isSlided: false,
      loading: false,
      loadingMessages: false,
      lastMsgId: null,
      senders: null,
      messagesCount: 0,
    }
  },
  methods: {
    outside(e) {
      if (e.target !== this.$refs.user) this.isSlided = false
    },
    Notify() {
      this.axios
        .get("/notifications/")
        .then((res) => {
          this.messagesCount = res.data.unreadedMessages
        })
        .catch(() => {})
    },
    NotifyWS(json) {
      if (
        json.event === "message_sended" &&
        json.data.receiverId === this.$store.state.myId
      ) {
        this.messagesCount++
        this.NotifySound()
      }
      if (
        json.event === "message_readed" &&
        json.data.receiverId === this.$store.state.myId
      ) {
        this.messagesCount--
      }
    },
    NotifySound() {
      const audio = new Audio(`${this.content}/sound.wav`)
      audio.play()
    },
    Logout() {
      const settings = {
        type: "logout",
        title: "Вы действительно хотите выйти?",
        ok: "Нет",
        cancel: "Да",
      }
      this.modalToggle(settings)
    },
    errorHandler: errorHandler,
  },
  mounted() {
    this.$socketClient.connect()
    this.$store.state.mobile = !window.matchMedia(
      "only screen and (min-width: 926px)"
    ).matches
    this.Notify()
    this.emitter.on("modal-cancel-logout", (val) => {
      if (val) {
        this.$store.state.myId = null
        this.axios.defaults.headers.common["Authorization"] = null
        this.$cookies.remove("token")
        this.$router.push("/")
        this.$store.state.modal.toggle = false
      }
    })
    this.emitter.on("modal-ok-logout", (val) => {
      if (val) this.$store.state.modal.toggle = false
    })
    this.$socketClient.onMessage = (e) => {
      let json = JSON.parse(e.data)
      console.log(json)
      this.NotifyWS(json)
      this.emitter.emit(json.event, json.data)
    }

    this.$socketClient.onError = () => {
      this.errorHandler(1006)
    }
    this.emitter.on("loaded", (val) => {
      this.loading = !val
    })
  },
  beforeUnmount() {
    this.$socketClient.stop()
    this.$socketClient.onMessage = null
    this.$socketClient.onError = null
    this.emitter.off("loaded")
  },
}
</script>
