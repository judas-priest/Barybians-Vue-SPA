<template>
  <div v-cloak v-show="user">
    <div class="reciever-name msg-top fixed-top" id="msg-top" ref="navbar">
      <router-link :to="!$store.state.edit ? `/profile/id${user.id}` : ''">
        <AvatarMin :userId="user.userId" :lastVisit="user.ulastVisit" :photo="user.photo" style="vertical-align: unset" />
        <span id="interlocutor">{{ user.firstName }} {{ user.lastName }}</span>
      </router-link>
      <span id="scroll" class="pointer" @click="scrollBottom">▼</span>
    </div>
    <div class="container" id="wrapper">
      <br />
      <Messages v-cloak :messages="messages" ref="messages" />
      <div id="user_status">
        <div v-if="typing" id="typing">{{ user.firstName }} тыкает...</div>
        <div v-if="onlineStatus"></div>
        <div v-else id="online_status_msg">
          <div class="online_status_msg">
            {{ (user.sex === 0 ? 'Заходил ' : 'Заходила ') + timeName(user.ulastVisit) }}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Send :userId="userId" @sended="sended" />
    </div>
  </div>
</template>

<script>
  import {
    timeName,
    online
  } from '@/../public/js/func.js'
  import AvatarMin from '@/components/AvatarMin.vue'
  import Messages from '@/components/Messages/Messages.vue'
  import Send from '@/components/Messages/Send.vue'
  export default {
    data() {
      return {
        userId: this.id,
        user: {},
        onlineStatus: false,
        messages: {},
        messagesLoad: false,
        typing: false,
        observer: null,
        observerFirstMessage: null,
      }
    },
    methods: {
      fetchMessages(id) {
        this.axios
          .get(`/messages/${id}`, {
            params: {
              start: 0,
              end: 15,
              sum: true,
              desc: true,
            },
          })
          .then((res) => {
            this.photo = `${this.avatarPath}mid/${res.data.photo}`
            this.user = res.data.secondUser
            document.title = `Сообщения — ${this.user.firstName} ${this.user.lastName} — Барыбинцы`
            this.messages = res.data.messages
            this.userId = id
          })
      },
      async firstMessageObserver() {
        await this.$nextTick()
        this.observerFirstMessage = new IntersectionObserver(async(entries) => {
          entries.forEach(async(entry) => {
            if (entry.isIntersecting) this.NavbarSticky(true)
            else this.NavbarSticky(false)
          })
        })
        if (this.messages && this.$refs.messages) {
          this.observerFirstMessage.observe(
            this.$refs.messages.$el.firstChild.nextElementSibling
          )
        }
      },
      async messagesObserver() {
        await this.$nextTick()
        //console.log(this.$refs.messages.$el.children[7])
        this.observer = new IntersectionObserver(async(entries, observer) => {
          entries.forEach(async(entry) => {
            if (entry.isIntersecting) {
              await this.fetchMessagesHistory()
              observer.unobserve(entry.target)
            }
          })
        })
        if (this.messages && this.$refs.messages) {
          this.observer.observe(
            this.$refs.messages.$el.firstChild.nextElementSibling
            .nextElementSibling.nextElementSibling.nextElementSibling
          )
        }
      },
      // async messagesObserver() {
      //   //console.log(this.$refs.messages)
      //   await this.$nextTick();
      //   this.observer = new IntersectionObserver(async(entries, observer) => {
      //     entries.forEach(async entry => {
      //       if (entry.isIntersecting) {
      //         //console.log(entry.target);
      //         await this.fetchMessagesHistory();
      //         await this.$nextTick();
      //         if (this.$refs.messages.firstChild.nextElementSibling.nextElementSibling && this.$refs.messages.firstChild.nextElementSibling.nextElementSibling != entry.target) {
      //           //console.log('myau');
      //           observer.unobserve(entry.target);
      //           observer.observe(this.$refs.messages.firstChild.nextElementSibling.nextElementSibling);
      //         }
      //       }
      //     })
      //   });
      //   this.observer.observe(this.$refs.messages.firstChild.nextElementSibling.nextElementSibling);
      //  },
      fetchMessagesHistory() {
        if (!this.messagesLoad &&
          //e.deltaY === -100 &&
          document.documentElement.scrollTop <= 500
        ) {
          this.messagesLoad = true
          this.axios
            .get(`/messages/${this.id}`, {
              params: {
                start: this.messages.length,
                end: 15,
                sum: true,
                desc: true,
              },
            })
            .then((res) => {
              if (res && res.data) {
                for (var obj in res.data.messages.reverse()) {
                  this.messages.unshift(res.data.messages[obj])
                }
                this.messagesLoad = false
              } else {
                this.firstMessageObserver()
              }
            })
        }
      },
      scrollBottom() {
        //window.scrollTo(0,document.body.scrollHeight || document.documentElement.scrollHeight);
        setTimeout(() => {
          window.scrollTo({
            top: this.$refs.messages.$el.scrollHeight,
            behavior: 'instant',
          })
        }, 300)
      },
      sended(msg) {
        //console.log(msg)
        this.messages.push(msg)
        this.$nextTick(() => {
          this.$refs.messages.scrollIntoView(false)
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          )
        })
      },
      // NavbarSticky() {
      //   if (this.$refs.navbar) {
      //     const navbar = this.$refs.navbar
      //     const sticky = navbar.offsetTop
  
      //     if (window.pageYOffset >= sticky) {
      //       navbar.classList.add('fixed-top')
      //       navbar.classList.remove('msg-top')
      //     } else {
      //       navbar.classList.add('msg-top')
      //       navbar.classList.remove('fixed-top')
      //     }
      //     return window.pageYOffset >= sticky
      //   }
      // },
      NavbarSticky(val) {
        if (this.$refs.navbar) {
          if (val) {
            this.$refs.navbar.classList.remove('fixed-top')
          } else {
            this.$refs.navbar.classList.add('fixed-top')
          }
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      const axios = require('axios')
      axios
        .get(`/messages/${to.params.id}`, {
          params: {
            start: 0,
            end: 15,
            sum: true,
            desc: true,
          },
        })
        .then((res) => {
          next((vm) => {
            vm.$store.state.edit = false
            vm.photo = `${vm.avatarPath}mid/${res.data.photo}`
            vm.user = res.data.secondUser
            vm.messages = res.data.messages
            vm.userId = to.params.id
            document.title = `Сообщения — ${vm.user.firstName} ${vm.user.lastName} — Барыбинцы`
            vm.$nextTick(() => {
              vm.scrollBottom()
              vm.$store.state.loaded.content = true
              vm.emitter.emit('loaded', true)
              vm.scrollBottom()
            })
          })
        })
        .catch((res) => {
          if (res.error === 404) {
            axios.get(`/users/${to.params.id}`).then((res) => {
              next((vm) => {
                vm.$store.state.edit = false
                vm.photo = `${vm.avatarPath}mid/${res.data.photo}`
                vm.user = res.data
                vm.messages = []
                vm.userId = to.params.id
                document.title = `Сообщения — ${res.data.firstName} ${res.data.lastName} — Барыбинцы`
                vm.$nextTick(() => {
                  vm.scrollBottom()
                  vm.$store.state.loaded.content = true
                  vm.emitter.emit('loaded', true)
                  vm.scrollBottom()
                })
              })
            })
          }
        })
    },
    computed: {
      timeName() {
        return timeName
      },
      online() {
        //console.log("online");
        return online
      },
    },
    mounted() {
      this.emitter.on('messages-loaded', () => {
        console.log('messages-loaded')
        this.messagesObserver()
      })
      //this.fetchMessages(this.id);
      //this.$nextTick(() => this.scrollBottom()) ;
      this.emitter.on('message_sended', (data) => {
        if (data.senderId == this.userId || data.receiverId == this.userId) {
          this.messages.push(data)
          this.scrollBottom()
          this.$nextTick(() => {
            //this.$refs.messages.scrollIntoView(false)
            window.scrollTo(
              0,
              document.body.scrollHeight || document.documentElement.scrollHeight
            )
          })
          this.typing = false
        }
      })
      this.emitter.on('message_readed', (data) => {
        console.log('readed')
        for (var obj in this.messages) {
          if (this.messages[obj].id === data.id)
            this.messages.splice(obj, 1, data)
        }
      })
      this.emitter.on('message_typing', (data) => {
        this.typing = data.status
      })
    },
    updated() {
      this.onlineStatus = this.online(this.user.ulastVisit)
    },
    beforeRouteLeave() {
      this.emitter.emit('loaded', false)
    },
    beforeUnmount() {
      this.emitter.off('message_sended')
      this.emitter.off('message_readed')
      this.emitter.off('message_typing')
      if (this.observer !== null)
        this.observer.unobserve(
          this.$refs.messages.$el.firstChild.nextElementSibling.nextElementSibling
          .nextElementSibling.nextElementSibling
        )
      if (this.observerFirstMessage !== null)
        this.observerFirstMessage.unobserve(
          this.$refs.messages.$el.firstChild.nextElementSibling
        )
    },
    // watch: {
    //   messages: function() {
    //     this.emitter.emit("messages-loaded", this.messages[this.messages.length - 1].id);
    //   },
    // },
    components: {
      AvatarMin,
      Messages,
      Send,
    },
    props: ['id'],
  }
</script>

<style lang="scss">
  #interlocutor {
    vertical-align: bottom;
    margin-left: 5px;
    color: var(--placeholder);
    font-size: 20pt;
  }
  
  #scroll {
    margin-left: 10pt;
    color: var(--placeholder);
  }
  
  #msg_history {
    padding-bottom: 30px;
  }
  
  .reciever-name {
    text-align: center;
    background-color: var(--primary);
    margin-top: 43.49px;
    padding-top: 8px;
  }
  
  @media (max-width: 767.98px) {
    #wrapper {
      margin-top: 43px;
      padding-bottom: 20px;
    }
    .reciever-name {
      margin-bottom: -44.59px;
      margin-top: 1px;
    }
    .msg-top {
      margin-top: 0;
    }
  }
  
  #preview {
    transition: 0.3s;
  }
  
  #image_demo {
    text-align: center;
  }
  
  .attachment-preview {
    max-width: 100%;
  }
  
  .x {
    position: absolute;
    top: unset;
    right: 2px;
    z-index: 100;
    color: #fff;
    -webkit-text-stroke: 1px var(--foreground);
    cursor: pointer;
  }
  
  #attachment-counter {
    right: 3px;
    top: -10px;
  }
  
  .preview-wrapper {
    position: relative;
  }
  
  #user_status {
    min-height: 16px;
    max-height: 16px;
  }
  
  #typing,
  #online_status_msg {
    text-align: center;
    color: var(--foreground);
  }
  
  
  /* msg */
  
  .message-container>div {
    overflow: hidden;
    padding: 5pt;
  }
  
  .incoming_msg:hover span.text,
  .outgoing_msg:hover span.text {
    background: var(--hover);
  }
  
  .msg {
    max-width: 90%;
    width: fit-content;
    margin: auto;
  }
  
  .msg span.text {
    background: var(--msg-bg) none repeat scroll 0 0;
    border-radius: 0 7pt 7pt 7pt;
    color: var(--msg-text);
    font-size: 14pt;
    margin: 0;
    padding: 2pt 5pt;
  }
  
  .incoming_msg>.msg {
    margin-left: 0;
  }
  
  .outgoing_msg>.msg {
    margin-right: 0;
  }
  
  .outgoing_msg>.msg span.text {
    border-radius: 7pt 0 7pt 7pt;
  }
  
  .unread>.incoming_msg>.msg span.text {
    background-color: var(--msg-text);
    color: var(--msg-bg);
  }
  
  .unread>.outgoing_msg {
    background-color: var(--foreground);
  }
  
  .time_date {
    color: var(--msg-time);
    display: block;
    font-size: 8pt;
    margin-top: 2pt;
    text-align: left;
  }
  
  .outgoing_msg .time_date {
    text-align: right;
  }
  
  span.text {
    display: block;
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, начиная с 1999 года */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
    overflow: unset;
  }
  
  span.text.unread {
    background-color: #fff;
  }
  
  img.image {
    max-width: 300px;
    background-color: #fff;
  }
  
  span.text .emoji {
    height: 26px;
    width: 26px;
    /*margin-top: -5px;*/
  }
  
  #attachment-preview {
    width: 100%;
  }
  
  #image_demo {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  #attach {
    background: transparent;
    border: none;
  }
  
  @media (max-width: 360px) {
    img.sticker {
      width: 150px;
    }
  }
</style>
