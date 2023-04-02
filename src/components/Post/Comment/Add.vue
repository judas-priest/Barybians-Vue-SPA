<template>
  <div class="comment-add-form">
    <TextEdit :text="text" :max="max" @send="CommentAddSend" />
  </div>
</template>

<script>
import TextEdit from '@/components/TextEdit.vue'
import {
  uuidv4
} from '@/../public/js/func.js'
export default {
  data() {
    return {
      myId: this.$store.state.myId,
      text: [''],
      max: {
        text: 5000,
      },
    }
  },
  props: ['postId'],
  methods: {
    CommentAddSend(val = null) {
      if (val === null) return
      const text = val.text ?? ''
      const comment = new URLSearchParams({
        text: text
      })
      this.axios({
          method: 'post',
          url: `/posts/${this.postId}/comments`,
          data: comment,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Request: this.uuidv4(),
            'Parse-mode': 'html',
          },
        })
        .then((res) => {
          if (res) this.emitter.emit(`comment-add__${this.postId}`, res.data)
          
        })
        .catch(() => {
          //console.log(res);
        })
    },
    uuidv4: uuidv4,
  },
  components: {
    TextEdit,
  },
}
</script>

<style>
.comment-add-form>*>.input-text{
  background-color: var(--block-bg) 
}
</style>