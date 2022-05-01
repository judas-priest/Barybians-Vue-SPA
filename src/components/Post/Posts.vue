<template>
  <div class="col-12" id="posts">
    <Post
      v-for="post of posts"
      :key="`post${post.id}`"
      :post="post"
      :userId="post.userId"
    />
  </div>
</template>

<script>
import Post from '@/components/Post/Post.vue'

export default {
  name: 'Posts',
  props: ['posts'],
  components: {
    Post,
  },
  updated() {
    if (this.posts.length) {
      this.emitter.emit('posts-loaded', this.posts[this.posts.length - 1].id)
    }
  },
}
</script>
