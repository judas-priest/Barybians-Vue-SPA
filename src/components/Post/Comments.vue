<template>
  <div class="comments">
    <hr class="comments-line" />
    <div v-if="comments != 0" class="comments-wrapper">
        <Comment v-for="comment of comments" :key="`comment${comment.id}`" :comment="comment" :postId="postId" />
    </div>
  </div>
</template>

<script>
  import Comment from '@/components/Post/Comment.vue'
  export default {
    components: {
      Comment,
    },
    props: ['comments', 'postId'],
  }
</script>
