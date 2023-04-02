<template>
  <div class="comments">
    <hr class="comments-line" />
    <Loader v-if="!comments.length && loading" />
    <div v-show="comments.length && !loading" class="comments-wrapper" ref="comments">
      <Comment v-for="comment of comments" :key="`comment${comment.commentId}`" :comment="comment" :postId="postId" />
    </div>
  </div>
</template>

<script>
  import Loader from '@/components/Loader.vue'
  import Comment from '@/components/Post/Comment.vue'
  export default {
    data() {
      return {
        commentsLoad: false,
        loading: true,
        comments: [],
      }
    },
    props: ['postId'],
    methods: {
      commentsPagination() {
        if (!this.commentsLoad) {
          this.commentsLoad = true
          this.axios
            .get(`/posts/${this.postId}/comments`, {
              params: {
                offset: this.comments.length,
                desc: false,
              },
            })
            .then((res) => {
              if (res.data.length) this.comments.push(...res.data)
              this.commentsLoad = false
            })
        }
      },
      async commentsObserver() {
        await this.$nextTick()
        this.observer = new IntersectionObserver(async(entries, observer) => {
          entries.forEach(async(entry) => {
            if (entry.isIntersecting) {
              await this.commentsPagination()
              observer.unobserve(entry.target)
            }
          })
        })
        if (
          this.comments &&
          this.$refs.comments &&
          this.$refs.comments.children.length !== 0
        ) {
          this.observer.observe(
            this.$refs.comments.children[this.$refs.comments.children.length - 1]
          )
        }
      },
    },
    mounted() {
      this.axios
        .get(`/posts/${this.postId}/comments`, {
          params: {
            offset: 0,
            desc: false,
          },
        })
        .then((res) => {
          this.comments = res.data
        })
      this.emitter.on('comment-add', (comment) => {
        if (!this.comments.includes(comment)) {
          this.comments.push(comment)
          this.emitter.emit('post-update', comment.postId)
          this.$nextTick(() => {
            this.goto(comment.commentId)
          })
        }
      })
      this.emitter.on(`comment-update__${this.postId}`, (comment) => {
        for (var obj in this.comments) {
          if (this.comments[obj].commentId === comment.commentId) {
            this.comments.splice(obj, 1, comment)
          }
        }
      })
  
      this.emitter.on(`comment-delete__${this.postId}`, (commentId) => {
        for (var obj in this.comments) {
          if (this.comments[obj].commentId === commentId)
            this.comments.splice(obj, 1)
        }
      })
    },
    updated() {
      if (this.comments.length) {
        this.commentsObserver()
        //console.log(this.$refs.posts)
        //this.emitter.emit('posts-loaded', this.posts[this.posts.length - 1].id)
      }
      if (this.$refs.comments.childElementCount === this.comments.length && this.loading) this.loading = false
    },
    beforeUnmount() {
      this.observer.unobserve(
        this.$refs.comments.children[this.$refs.comments.children.length - 1]
      )
    },
    components: {
      Loader,
      Comment,
    },
  }
</script>
