<template>
  <div v-cloak v-show="posts" class="container base">
    <div v-if="true === false" id="stories-title">
      <h4>Истории</h4>
    </div>
  
    <div v-if="true === false" class="col-12 posts-body" id="stories">
      <div id="storie-modal" class="modal">
        <div id="storie-loading">
          <h1>Загрузка</h1>
        </div>
        <video autoplay="" loop="" class="modal-content" id="storie"></video>
      </div>
      <div class="storie" style="display: inline-block">
        <p class="post-text post-content" style="margin: 5pt; text-align: center">
          <span class="user-storie" style="display: block; text-align: center">
                <img
                  id="btn_add-storie"
                  class="rounded min-photo"
                  alt="profile-photo"
                />
              </span>
        </p>
      </div>
    </div>
    <div id="posts-title">
      <h4>Новые посты</h4>
    </div>
    <Posts v-cloak :posts="posts" ref="posts" />
  </div>
</template>

<script>
  import Posts from '@/components/Post/Posts.vue'
  
  export default {
    name: 'Feed',
    data() {
      return {
        posts: {},
        postsLoad: false,
        observer: null,
      }
    },
    components: {
      Posts,
    },
    methods: {
      fetchPosts() {
        this.axios.get('/posts?start=0&end=10').then((res) => {
          this.posts = res.data
        })
      },
      async postObserver() {
        console.log('observer started!!!')
        await this.$nextTick()
        this.observer = new IntersectionObserver(async(entries, observer) => {
          entries.forEach(async(entry) => {
            if (entry.isIntersecting) {
              await this.postsPagination()
              observer.unobserve(entry.target)
            }
          })
        })
        if (
          this.posts &&
          this.$refs.posts &&
          this.$refs.posts.$el.lastChild.previousElementSibling
          .previousElementSibling
        ) {
          this.observer.observe(
            this.$refs.posts.$el.lastChild.previousElementSibling
            .previousElementSibling
          )
        }
      },
      postsPagination() {
        this.postsLoad = true
        this.axios.get(`/posts?start=${this.posts.length}&end=10`).then((res) => {
          this.posts.push(...res.data)
          this.postsLoad = false
        })
      },
    },
    beforeRouteEnter(to, from, next) {
      const axios = require('axios')
      axios.get('/posts?start=0&end=10').then((res) => {
        next((vm) => {
          vm.$store.state.edit = false
          vm.posts = res.data
          setTimeout(() => {
            vm.$store.state.loaded.content = true
            vm.emitter.emit('loaded', true)
          }, 0)
        })
      })
    },
    mounted() {
      //this.fetchPosts();
      this.emitter.on('posts-loaded', () => {
        this.postObserver()
      })
      /*
       * Post Actions
       */
  
      this.emitter.on('post-add', (post) => {
        if (!this.posts.includes(post)) {
          this.user.postsCount++
            this.posts.unshift(post)
        }
      })
  
      this.emitter.on('post-update', (post) => {
        for (var obj in this.posts) {
          if (this.posts[obj].id === post.id) this.posts.splice(obj, 1, post)
        }
      })
  
      this.emitter.on('post-delete', (postId) => {
        for (var obj in this.posts) {
          if (this.posts[obj].id === postId) {
            this.posts.splice(obj, 1)
          }
        }
      })
      this.emitter.on('comment-delete', ({
        commentId,
        postId
      }) => {
        for (var post in this.posts) {
          if (this.posts[post].id === postId) {
            for (var obj in this.posts[post].comments) {
              if (this.posts[post].comments[obj].id === commentId) {
                //console.log(this.post.comments[obj]);
                this.posts[post].commentsCount--
                  this.posts[post].comments.splice(obj, 1)
              }
            }
          }
        }
      })
    },
    beforeRouteLeave() {
      this.emitter.emit('loaded', false)
    },
    beforeUnmount() {
      this.emitter.off('post-add')
      this.emitter.off('post-update')
      this.emitter.off('post-delete')
      this.emitter.off('comment-delete')
      this.emitter.off('posts-loaded')
    },
  }
</script>

<style lang="scss" scoped>
  // #stories {
  //   display: inline-block;
  //   overflow-x: auto;
  //   white-space: nowrap;
  // }
  // .storie {
  //   padding: 0;
  // }
  // #storie-modal {
  //   background-color: #000d;
  //   z-index: 5555;
  // }
  // #storie-modal > * {
  //   border: none;
  // }
  // #storie-loading {
  //   color: red;
  //   z-index: 2000;
  //   max-width: 1260px;
  //   max-height: 660px;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-right: -50%;
  //   transform: translate(-50%, -50%);
  // }
  // video.modal-content {
  //   background-color: transparent;
  // }
  // @media screen and (max-width: 768px) {
  //   video.modal-content {
  // max-width: 1260px;
  // max-height: 660px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // margin-right: -50%;
  // transform: translate(-50%, -50%);
  //   }
  //   img.storie-avatar,
  //   img#btn_add-storie {
  //     height: 2em;
  //     width: 2em;
  //   }
  // }
  .storie {
    background: #fff none repeat scroll 0 0;
    border-radius: 6pt;
    font-size: 14pt;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  #posts-title {
    color: var(--profile-text);
  }
</style>
