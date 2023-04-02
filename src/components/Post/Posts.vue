<template>
  <div>
    <span v-if="user && Object.keys(posts).length === 0 && !loading">
      <div v-if="user.userId === myId" class="zero-posts">
        Вы пока ничего не написали...
      </div>
      <div v-else class="zero-posts">
        {{ user.firstName }} пока ничего не написал<span
          v-if="user.sex === 'female'"
          >а</span
        >...
      </div>
    </span>
    <Loader v-if="!posts.length && loading"/>
    <div
      v-show="posts.length && !loading"
      class="col-12"
      id="posts"
      ref="posts"
    >
      <Post
        v-for="post of posts"
        :key="`post${post.postId}`"
        :post="post"
        :userId="post.userId"
      />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue"
import Post from "@/components/Post/Post.vue"

export default {
  name: "Posts",
  props: ["user", "myId"],
  data() {
    return {
      postsPath: "/posts",
      loading: true,
      postsLoad: false,
      posts: [],
      observer: null,
    }
  },
  methods: {
    /*postsWheel() {
        const bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight
        if (
          document.documentElement.offsetHeight - bottomOfWindow <= 700 &&
          !this.postsLoad
        ) {
          this.postsPagination()
        }
      },*/
    postsPagination() {
      this.postsLoad = true
      this.axios
        .get(this.postsPath, {
          params: {
            offset: this.posts.length,
          },
        })
        .then((res) => {
          if (res.data.length) this.posts.push(...res.data)
          this.postsLoad = false
        })
    },
    async postObserver() {
      // console.log('observer started!!!')
      await this.$nextTick()
      this.observer = new IntersectionObserver(async (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await this.postsPagination()
            observer.unobserve(entry.target)
          }
        })
      })
      if (
        this.posts &&
        this.$refs.posts &&
        this.$refs.posts.lastChild.previousElementSibling.previousElementSibling
      ) {
        this.observer.observe(
          this.$refs.posts.lastChild.previousElementSibling
            .previousElementSibling
        )
      }
    },
    OnUnmount() {
      this.emitter.off("post-add")
      this.emitter.off("post-update")
      this.emitter.off("post-delete")
      if (
        this.observer !== null &&
        this.$refs.posts &&
        this.$refs.posts.lastChild.previousElementSibling &&
        this.$refs.posts.lastChild.previousElementSibling.previousElementSibling
      )
        this.observer.unobserve(
          this.$refs.posts.lastChild.previousElementSibling
            .previousElementSibling
        )
    },
  },
  mounted() {
    if (this.user) this.postsPath = `/users/${this.user.userId}/posts`
    else this.postsPath = "/posts"

    this.axios
      .get(this.postsPath, {
        params: {
          offset: 0,
        },
      })
      .then((res) => {
        this.posts = res.data
      })
    this.emitter.on("post-add", (post) => {
      console.log(post.postId)
      if (!this.posts.includes(post)) {
        this.posts.unshift(post)
      }
    })

    this.emitter.on("post-update", (post) => {
      for (var obj in this.posts) {
        if (this.posts[obj].postId === post.postId)
          this.posts.splice(obj, 1, post)
      }
    })
    this.emitter.on("post-delete", (postId) => {
      for (var obj in this.posts) {
        if (this.posts[obj].postId === postId) {
          //this.user.postsCount--
          this.posts.splice(obj, 1)
        }
      }
    })
  },
  updated() {
    if (this.posts.length) {
      this.postObserver()
      //console.log(this.$refs.posts)
      //this.emitter.emit('posts-loaded', this.posts[this.posts.length - 1].id)
    }
    if (
      this.$refs.posts.childElementCount === this.posts.length &&
      this.loading
    )
      this.loading = false
  },
  beforeUnmount() {
    this.OnUnmount()
  },
  components: {
    Loader,
    Post,
  },
}
</script>
