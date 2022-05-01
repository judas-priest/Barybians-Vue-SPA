<template>
  <collapse-transition>
    <div v-show="slided" class="users" id="users" v-click-outside="outside">
      <input type="text" id="user-search" class="form-control" placeholder="Поиск по имени" v-model="filter"/>
      <div class="users-wrapper">
        <div v-for="user in filteredUser" :key="user.id" :data-user="user.id" class="user-wrapper">
          <div class="user pointer" :class="{ 'this-page': $route.params.id == user.id }" v-if="user.id !== this.$store.state.myId" :data-user="user.id" @click="outside">
            <router-link class="userLink" :to="!$store.state.edit ? `/profile/id${user.id}` : ''">
              <div>
                <AvatarMin :userId="user.id" :lastVisit="user.ulastVisit" :photo="user.photo" /> {{ user.firstName }} {{ user.lastName }}
                <span class="dialog-user">
                    <router-link :to="`/messages/id${user.id}`">
                      <MessageButton />
                    </router-link>
                  </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </collapse-transition>
</template>

<script>
  import MessageButton from '@/components/Buttons/Message.vue'
  import AvatarMin from '@/components/AvatarMin.vue'
  import {
    errorHandler
  } from '@/../public/js/func.js'
  export default {
    data() {
      return {
        myId: this.$store.state.myId,
        users: '',
        filter: '',
      }
    },
    name: 'Friends',
    components: {
      MessageButton,
      AvatarMin,
    },
    props: ['slided'],
    methods: {
      errorHandler: errorHandler,
      outside(event) {
        this.$emit('outside', event)
      },
    },
    computed: {
      filteredUser() {
        return this.filter ?
          this.users.filter((user) => [`${user.firstName} ${user.lastName}`].some((v) =>
            v.toLowerCase().includes(this.filter.toLowerCase())
          )) :
          this.users
      },
    },
    mounted() {
      var img = new Image() //document.createElement('img');
      img.src = require('@/../public/img/404.jpg')
      this.axios
        .get('/users/')
        .then((res) => {
          const amountImg = res.data.length
          var loadedImg = 0
          res.data.forEach((usr) => {
            let img = new Image() //document.createElement('img');
            img.id = usr.id
            img.src = `${this.avatarPath}mid/${usr.photo}`
            img.onload =
              img.onerror =
              img.onabort =
              () => {
                ++loadedImg
                if (loadedImg === amountImg) {
                  this.$store.state.loaded.avatars = true
                  this.emitter.emit('loaded', true)
                }
              }
            img = null
          })
          this.users = res.data
        })
        .catch((res) => {
          console.log(this.$store.state.myId)
          console.log(res.response)
          this.errorHandler(res.response.status)
        })
    },
  }
</script>

<style lang="scss" scoped>
  .drop-down-enter-active {
    animation: drop-down 0.3s;
  }
  
  .drop-down-leave-active {
    animation: drop-down 0.3s reverse;
  }
  
  @keyframes drop-down {
    from {
      transform: scaley(0);
      height: 0;
    }
    to {
      transform: scaley(1);
    }
  }
  
  .users::-webkit-scrollbar {
    display: none;
  }
  
  .users {
    width: 25%;
    min-width: 250px;
    top: 55px;
    height: 60%;
    left: 25%;
    z-index: 2222;
    position: fixed;
    border: solid var(--primary) 1px;
    border-radius: 0.25rem;
    background: var(--background);
    overflow: auto;
    scrollbar-width: none;
    padding: 2px;
    transform-origin: top;
  }
  
  .user>* {
    fill: var(--block-time) !important;
    color: var(--block-time) !important;
  }
  
  #user-search {
    position: sticky;
    top: 0;
    z-index: 199;
  }
  
  .user {
    margin: 3px 0;
  }
  
  .userLink {
    color: var(--profile-text) !important;
    fill: var(--profile-text) !important;
  }
  
  .user:hover {
    background-color: var(--hover);
  }
  
  .dialog-user {
    float: right;
    margin: 10px 5px 8px 8px;
  }
  
  .this-page {
    background: var(--foreground);
  }
  
  .this-page>* {
    color: var(--background) !important;
    fill: var(--background) !important;
  }
  
  .users-wrapper {
    height: 60%;
    display: inline;
    overflow: auto;
  }
  
  @media (max-width: 768px) {
    .users {
      top: 0;
      left: 0;
      width: 100%;
      min-width: 0;
      bottom: 0;
      height: 93%;
    }
  }
</style>
