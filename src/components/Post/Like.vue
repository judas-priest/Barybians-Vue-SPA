<template>
  <div :class="like" class="likepost post-mng-btn">
    <span @click="likeToggle">
            <LikeBtn />
            <span v-text="count" class="likeCount"></span>
    </span>
  </div>
</template>

<script>
  import LikeBtn from '@/components/Buttons/Like.vue'
    import {
    uuidv4
  } from '@/../public/js/func.js'
  export default {
    data() {
      return {
        like: 'like',
        likeCountVar: ''
      }
    },
    computed: {
      count() {
        let counter
        if (this.likeCountVar === '') counter = this.likesCount
        else counter = this.likeCountVar

        if (counter) return counter === 0 ? '' : counter
        else return ''
      },
    },
    mounted() {
      this.whoLiked()
    },
    methods: {
      async whoLiked() {
        if (this.likesCount !== 0) {
          this.GetLikes(this.postId).then((usersWhoLiked) => {
            if (usersWhoLiked) {
              for (let liker of usersWhoLiked) {
                return liker.userId === this.$store.state.myId ?
                  (this.like = 'unlike') :
                  (this.like = 'like')
              }
            }
          })
        }
        this.like = 'like'
      },
  
      async GetLikes(postId, offset = 0, usersWhoLiked = [], limit = 25) {
        await this.axios
          .get(`/posts/${postId}/likes`, {
            params: {
              offset: offset,
            },
          })
          .then((res) => {
            if (res.data.length) {
              usersWhoLiked = [...usersWhoLiked, ...res.data]
              if (res.data.length >= limit) {
                offset++
                this.GetLikes(postId, offset, usersWhoLiked).then((response) => {
                  usersWhoLiked = [...usersWhoLiked, response]
                })
              }
            }
          })
        return usersWhoLiked
      },
      likeToggle() {
        if (this.$store.state.edit) return
        //let l = this.$refs.like //event.currentTarget;
        //let c = this.$refs.likeCount //event.currentTarget.querySelector(".likeCount");
        if (this.like === 'like') {
          this.axios({
            method: 'post',
            url: `/posts/${this.postId}/likes`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Request: this.uuidv4(),
              'Parse-mode': 'html',
            },
          })
          .then((res) => {
            this.likeCountVar = res.data.length
            this.like = 'unlike'
          })
        } else if (this.like === 'unlike') {
          this.axios.delete(`/posts/${this.postId}/likes`).then((res) => {
            this.likeCountVar = res.data.length
            this.like = 'like'
          })
        }
      },
      uuidv4: uuidv4,
    },
    props: ['postId', 'userId', 'likesCount'],
    components: {
      LikeBtn,
    },
  }
</script>

<style scoped>
  .likepost {
    user-select: none;
  }
  
  .likeCount {
    vertical-align: -1px;
  }
  
  .like,
  .unlike {
    height: 1.5em;
    display: inline-block;
  }
  
  .like {
    stroke: var(--block-time);
    fill: none;
  }
  
  .unlike {
    fill: var(--danger);
  }
</style>
