<template>
  <div v-cloak v-show="user" class="container base">
    <div v-if="$store.state.mobile" id="last_visit">
      <span v-if="onlineStatus" id="online_status">Онлайн</span>
      <span v-else>{{
                        (user.sex === 'male' ? 'Заходил ' : 'Заходила ') + timeName(user.lastVisit)
                      }}</span>
    </div>
    <div class="row">
      <div class="col-4 col-sm-3 col-md-3">
        <img v-if="user.photo" data-larg id="avatar" @click="profileImg" @load="changeImg" :src="photo" :onerror="imageErrorAvatar" alt="profile" class="img-fluid rounded" width="255" ref="avatar" />
        <transition name="modal">
          <div v-if="profileView" @click="profileView = false" class="modal modal-backdrop">
            <div class="modal-content">
              <img id="photo__full" class="pointer" alt="profilePhotoPreview" @click="profileUrl" v-touch="swipe" :onerror="imageErrorAvatar" :src="this.photo" />
              <button v-if="user.userId === myId" id="change-avatar" class="btn btn-secondary" @click="changeAvatar">
                                Заменить фотографию
                              </button>
            </div>
          </div>
        </transition>
        <router-link v-if="user.userId != myId" id="dialog-link" :to="!$store.state.edit ? `/messages/id${user.userId}` : ''">Открыть диалог</router-link>
        <router-link v-if="user.userId != myId" id="dialog-link-mob" :to="!$store.state.edit ? `/messages/id${user.userId}` : ''">
          <MessageButton />
        </router-link>
      </div>
      <div class="col-sm-1 col-md-1 inv"></div>
      <div class="col-8 col-lg-6 col-xl-6 col-xxl-6">
        <div id="name">
          {{ user.firstName }} {{ user.lastName }}
          <span v-if="user.roleId === 1" id="verified" class="verified-sym-green" data-toggle="tooltip" title="Администратор сайта" ref="verified">
                            <span id="check">✓</span>
          <router-link v-if="user.userId === 1" id="love" :to="!$store.state.edit ? '/profile/id3' : ''">❤️</router-link>
          </span>
          <span v-if="user.roleId === 2" id="verified" class="verified-sym-blue" data-toggle="tooltip" title="Настоящий барыбинец">
                            <span id="check">✓</span>
          <router-link v-if="user.userId === 3" id="love" :to="!$store.state.edit ? '/profile/id1' : ''">❤️</router-link>
          </span>
          <span v-if="user.roleId === 3" id="verified" class="verified-sym-yellow" data-toggle="tooltip" title="Настоящий барыбинец">
                            <span id="check">✓</span>
          </span>
        </div>
        <div id="yo">
          {{ age }}
          <span v-if="DaysToDOB === 0" id="bday"> (Завтра ДР)</span>
          <span v-else-if="DaysToDOB === 364" id="bday"> 🎈</span>
          <span v-else-if="DaysToDOB === 1" id="bday">(Послезавтра ДР)</span>
        </div>
        <div id="status_change" v-click-outside="StatusEditModal">
          <div @click="StatusEdit" contenteditable="false" id="status" class="col-10 transition" :class="[user.userId === myId ? 'status_my' : '']" placeholder="Введите статус..." ref="status" v-html="status" @keydown.enter.exact.prevent="StatusUpdate" @keydown.enter.shift.exact.prevent="true"></div>
          <div v-if="user.userId === myId" v-show="statusEdit" id="status_save" @click="StatusUpdate">
            <SendBtn height="30" width="30" />
          </div>
        </div>
      </div>
      <div v-if="!$store.state.mobile" class="col-2" id="last_visit">
        <span v-if="onlineStatus" id="online_status">Онлайн</span>
        <span v-else>{{
                          (user.sex === 'male' ? 'Заходил ' : 'Заходила ') +
                          timeName(user.lastVisit)
                        }}</span>
      </div>
    </div>
    <PostAdd v-cloak :user="user" />
    <Posts v-cloak v-if="user" :user="user" :myId="myId" :key="user.userId"/>
  </div>
</template>

<script>
  import Posts from '@/components/Post/Posts.vue'
  import {
    online,
    uuidv4,
    timeName,
    Emoji
  } from '@/../public/js/func.js'
  import PostAdd from '@/components/Post/Add.vue'
  import SendBtn from '@/components/Buttons/Send.vue'
  import MessageButton from '@/components/Buttons/Message.vue'
  export default {
    data() {
      return {
        myId: this.$store.state.myId,
        user: '',
        photo: '',
        userId: this.id,
        posts: '',
        onlineStatus: false,
        active: true,
        statusEdit: false,
        profileView: false,
      }
    },
    components: {
      Posts,
      SendBtn,
      PostAdd,
      MessageButton,
    },
    methods: {
      Emoji: Emoji,
      uuidv4: uuidv4,
      profileImg() {
        if (this.$store.state.edit) return
        this.profileView = true
      },
      swipe(t) {
        if (t.startY - t.endY > 40) this.profileView = false
      },
      changeImg() {
        //console.log("changeImg");
        this.photo = this.user.photo 
      },
      changeAvatar() {
        const settings = {
          type: 'cropper',
          title: 'Аватара',
          ok: 'Изменить',
          cancel: 'Отмена',
        }
        this.modalToggle(settings)
      },
      profileUrl() {
        //console.log("profileUrl");
        window.open(this.photo, '_blank')
      },
      StatusEdit() {
        if (this.$store.state.myId === this.user.userId && !this.$store.state.edit) {
          this.$store.state.edit = true
          this.statusEdit = true
          this.$refs.status.contentEditable = true
          this.$refs.status.classList.add('edit-block')
          this.$refs.status.focus()
        }
      },
      StatusUpdate() {
        const status = new URLSearchParams({
          text: this.$refs.status.textContent,
        })
        this.axios({
            method: 'post',
            url: '/account/status',
            data: status,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Request: this.uuidv4(),
            },
          })
          .then((res) => {
            this.user.status = res.data.status
            this.$refs.status.contentEditable = false
            this.StatusEditCancel()
          })
          .catch(() => {
            //console.log(res);
          })
      },
      StatusEditOk() {
        //this.emitter.emit("modal-ok-status_edit", false);
        this.$store.state.modal.toggle = false
        this.$refs.status.focus()
      },
      StatusEditCancel() {
        this.$refs.status.contentEditable = false
        this.$refs.status.textContent = this.user.status
        this.$refs.status.classList.remove('edit-block')
        this.$store.state.modal.toggle = false
        this.statusEdit = false
        this.$store.state.edit = false
      },
      StatusEditModal() {
        if (
          (event.target.classList == 'emoji' &&
            event.target.parentNode == null) ||
          event.target.id == 'modal'
        )
          return
        if (this.statusEdit) {
          const settings = {
            type: 'status_edit',
            title: 'Изменения будут потеряны. Закрыть?',
            ok: 'Нет',
            cancel: 'Да',
          }
          this.modalToggle(settings)
        }
      },
      fetchUser(id) {
        this.emitter.emit('loaded', false)
        this.axios.get(`/users/${id}`).then((res) => {
          this.photo = res.data.photo256
          document.title = `${res.data.firstName} ${res.data.lastName} — Барыбинцы`
          this.user = res.data
          this.userId = id
          this.$nextTick(() => {
            this.$store.state.loaded.content = true
            this.emitter.emit('loaded', true)
          })
        })
      },
      // async postsObserver() {
      //   await this.$nextTick();
      //   const observer = new IntersectionObserver((entries) => {
      //     entries.forEach(async(entry) => {
      //       if (entry.isIntersecting) this.postsPagination();
      //     });
      //   });
      //   observer.observe(this.$refs.posts__loading);
      // },
      // async postObserver() {
      //   console.log('observer started!!!')
      //   var postId = 0;
      //   await this.$nextTick()
      //   this.observer = new IntersectionObserver(async(entries, observer) => {
      //     entries.forEach(async(entry) => {
      //       if (entry.isIntersecting && entry.target.dataset.post > postId) {
      //         postId = entry.target.dataset.post
      //         await this.postsPagination()
      //         if (
      //           this.$refs.posts.$el.lastChild.previousElementSibling !=
      //           entry.target
      //         ) {
      //           console.log(this.$refs.posts.$el.lastChild.previousElementSibling)
      //           observer.unobserve(entry.target)
      //           observer.observe(
      //             this.$refs.posts.$el.lastChild.previousElementSibling
      //           )
      //         }
      //       }
      //     })
      //   })
      //   if (this.$refs.posts) {
      //     this.observer.observe(
      //       this.$refs.posts.$el.lastChild.previousElementSibling.previousElementSibling
      //     )
      //   }
      // },

      escapeHandler(e) {
        if (e.key === 'Escape' && !this.$store.state.modal.toggle)
          this.profileView = false
      },
      OnMount() {
        // console.log('mounted')
        document.addEventListener('keydown', this.escapeHandler)
        this.emitter.on('modal-cancel-cropper', () => {
          this.$store.state.modal.toggle = false
        })
  
        this.emitter.on('photo-update', (photo) => {
          console.log(photo);
          if (photo && this.userId == this.myId){
            this.photo = photo
            this.user.photo = photo
          }
            
        })
  
        //
        //this.fetchUser(this.id);
        this.emitter.on('modal-cancel-status_edit', (val) => {
          if (val && this.statusEdit) this.StatusEditCancel()
        })
        this.emitter.on('modal-ok-status_edit', (val) => {
          if (val && this.statusEdit) this.StatusEditOk()
        })
  
      },
      OnUnmount() {
        // console.log('unmounted')
        document.removeEventListener('keydown', this.escapeHandler)
        this.emitter.off('modal-cancel-cropper')
        this.emitter.off('photo-update')

        this.emitter.off('comment-delete')
        this.emitter.off('modal-cancel-status_edit')
        this.emitter.off('modal-ok-status_edit')
        this.emitter.off('posts-loaded')

      }
    },
    computed: {
      status() {
        if (this.user) {
          if (!this.statusEdit) return this.Emoji(this.user.status)
          else return this.user.status
        }
        return ''
      },
      timeName() {
        return timeName
      },
      online() {
        //console.log("online");
        return online
      },
      age() {
        if (this.user.birthDate) {
          // let today = new Date()
          // today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
          // let dob = new Date(this.user.birthDate * 1000)
          // let year = today.getFullYear() - dob.getFullYear()
          // let yo = year % 10
  
          var today = new Date()
          var birthDate = new Date(this.user.birthDate * 1000)
          var age = today.getFullYear() - birthDate.getFullYear()
          var m = today.getMonth() - birthDate.getMonth()
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
            let yo = age % 10
  
          switch (yo) {
            case 1:
              return age === 11 ? `${age} лет` : `${age} год`
            case 2:
              return age === 12 ? `${age} лет` : `${age} года`
            case 3:
              return age === 13 ? `${age} лет` : `${age} года`
            case 4:
              return age === 14 ? `${age} лет` : `${age} года`
            default:
              return `${age} лет`
          }
        } else return null
      },
      DaysToDOB() {
        if (this.user.birthDate) {
          var today, bday, diff, days
          today = new Date()
          bday = new Date(this.user.birthDate * 1000)
          bday.setFullYear(today.getFullYear())
          if (today.getTime() > bday.getTime())
            bday.setFullYear(bday.getFullYear() + 1)
          diff = bday.getTime() - today.getTime()
          days = Math.floor(diff / (1000 * 60 * 60 * 24))
          return days
        } else return null
      },
    },
    name: 'Profile',
    props: ['id'],
    beforeRouteUpdate(to, from, next) {
      if (to.name === 'Profile') {
        this.OnUnmount()
        this.fetchUser(to.params.id)
        this.$nextTick(() => {
          this.OnMount()
        })
      }
      this.$store.state.edit = false
      next()
    },
  
    beforeRouteEnter(to, from, next) {
      const axios = require('axios')
      axios
        .get(`/users/${to.params.id}`)
        .then((res) => {
          //if(!res) throw new Error("new error")
          next((vm) => {
            vm.$store.state.edit = false
            //vm.photo
            var full = res.data.photo //
            var mid = res.data.photo256
            document.title = `${res.data.firstName} ${res.data.lastName} — Барыбинцы`
            let img = new Image() //document.createElement('img');
            img.src = full
  
            if (img.complete) vm.photo = full
            else vm.photo = mid
  
            img = null
            vm.user = res.data
            vm.posts = res.data.posts
            vm.userId = to.params.id
            setTimeout(() => {
              vm.$store.state.loaded.content = true
              vm.emitter.emit('loaded', true)
            }, 0)
          })
        })
        .catch((res) => {
          next((vm) => {
            if (res.error && res.error === 404) vm.$router.push(`/404`)
          })
        })
    },
  
    beforeRouteLeave() {
      this.emitter.emit('loaded', false)
    },
    beforeUnmount() {
      this.OnUnmount()
    },
    mounted() {
      this.OnMount()
      /*var modal = document.getElementById("myModal");
                            
                              // var img = document.getElementById("avatar");
                              //var modalImg = document.getElementById("img01");
                            
                              modal.addEventListener(
                                "mousedown",
                                function(e) {
                                  if (this.contains(e.target) && e.target.id === this.id) {
                                    document.body.style.overflow = "";
                                    modal.style.display = "none";
                                  }
                                },
                                false
                              );*/
    },
    updated() {
      this.onlineStatus = this.online(this.user.lastVisit)
    },
  }
</script>

<style lang="scss">
  #last_visit {
    text-align: right;
    font-size: 10pt;
    color: var(--profile-text);
  }
  
  #online_status {
    font-weight: bold;
    color: green;
  }
  
  #avatar {
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    transition: 0.3s;
  }
  
  #avatar:hover {
    opacity: 0.8;
    z-index: 0;
  }
  
  #change-avatar {
    border-radius: 0;
  }
  
  #name {
    font-size: 25pt;
    color: var(--profile-text);
  }
  
  #yo {
    font-size: 15pt;
    color: var(--foreground);
  }
  
  #status {
    display: inline-block;
    font-size: 17pt;
    min-width: 10px;
    min-height: 10px;
    width: auto;
    border-radius: 6pt;
    color: var(--profile-text);
  }
  
  #status:hover {
    background: var(--hover);
  }
  
  .status_my[placeholder]:empty::after {
    content: attr(placeholder);
    color: #999;
  }
  
  #status_change {
    margin-top: 10pt;
    overflow: hidden;
    display: flex;
  }
  
  #status_change:hover {
    overflow: auto;
  }
  
  #status_change .emoji {
    height: 26px;
  }
  
  #status_save {
    display: inline;
    margin-right: 0;
    margin-left: auto;
    margin-bottom: auto;
    margin-top: auto;
    color: var(--profile-text);
    fill: var(--profile-text);
  }
  
  #dialog-link-mob {
    display: none;
  }
  
  #dialog-link {
    text-align: center;
    color: var(--profile-text);
    padding: 5pt;
    display: block;
    border: solid var(--foreground) 1px;
    border-radius: 3pt;
    margin: 10pt auto 0 auto;
    width: 100%;
  }
  
  #dialog-link:hover {
    text-decoration: none;
    border: solid var(--hover) 1px;
    border-radius: 3pt;
  }
  
  #posts-head {
    padding-right: 0;
    margin-top: 20pt;
    width: auto;
    color: var(--profile-text);
    fill: var(--profile-text);
  }
  
  #posts-head>h4 {
    flex: 1;
  }
  
  #btn_post-add {
    height: 1.4rem;
    width: auto;
    margin-left: 0.2em;
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
  }
  
  #post_add_wrapper {
    width: auto;
    margin: auto;
    margin-right: 0;
  }
  
  

  
  .zero-posts,
  #bday {
    color: var(--foreground);
    margin: auto;
    font-size: 12pt;
  }
  
  @media screen and (max-width: 576px) {
    .inv {
      display: none;
    }
    #name {
      font-size: 18pt;
    }
    #yo {
      font-size: 14pt;
    }
    #bday {
      font-size: 10pt;
    }
    #status {
      font-size: 12pt;
    }
    #status_change {
      overflow: auto;
    }
    #dialog-link {
      display: none;
    }
    #dialog-link-mob {
      display: inline;
    }
  }
  
  #photo__full {
    max-width: 100%;
    max-height: 100%;
  }
  
  .modal-content {
    margin: auto;
    max-width: 50vw;
  }
  
  @media only screen and (max-width: 700px) {
    .modal-content {
      max-width: 100%;
    }
  }
  
  #love {
    display: none;
  }
  
  .verified-sym-green a,
  .verified-sym-blue a,
  .verified-sym-yellow a {
    text-decoration: none;
    color: #f00;
  }
  
  .verified-sym-green a:link,
  .verified-sym-blue a:link,
  .verified-sym-yellow a:link {
    color: #f00;
  }
  
  .verified-sym-green a:hover,
  .verified-sym-blue a:hover,
  .verified-sym-yellow a:hover {
    color: #f00;
  }
  
  .verified-sym-green {
    color: #090;
  }
  
  .verified-sym-blue {
    color: #07f;
  }
  
  .verified-sym-yellow {
    color: #b3ad0b;
  }
  
  #verified:hover>#love {
    display: inline;
  }
  
  #verified:hover>#check {
    display: none;
  }
</style>
