<template>
  <div class="post-edit-ops post-mng-btn pointer" @click="CommentDel">
    <DelBtn :type="'btn_comment-del'" title="Удалить комментарий" style="height: 16pt; width: auto" />
  </div>
</template>

<script>
  import DelBtn from '@/components/Buttons/Del2.vue'
  export default {
    data() {
      return {}
    },
    components: {
      DelBtn,
    },
    props: ['commentId', 'postId'],
    methods: {
      CommentDel() {
        if (this.$store.state.edit && event.target.id == 'modal') return
        this.$store.state.edit = true
        const settings = {
          id: `__${this.commentId}`,
          type: `comment_del`,
          title: 'Удалить пост?',
          ok: 'Нет',
          cancel: 'Да',
        }
        this.modalToggle(settings)
      },
      CommentDelCancel() {
        this.axios({
          method: 'delete',
          url: `/comments/${this.commentId}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
          if (res.data) {
            this.emitter.emit('comment-delete', {
              commentId: this.commentId,
              postId: this.postId,
            })
            //this.emitter.emit(`modal-cancel-post_del_${this.postId}`, false);
            this.$store.state.modal.toggle = false
          }
        })
        this.$store.state.edit = false
      },
      CommentDelOk() {
        //this.emitter.emit(`modal-ok-post_del_${this.postId}`, false);
        this.$store.state.modal.toggle = false
        this.$store.state.edit = false
      },
    },
    mounted() {
      this.emitter.on(`modal-cancel-comment_del__${this.commentId}`, (val) => {
        if (val) this.CommentDelCancel()
      })
      this.emitter.on(`modal-ok-comment_del__${this.commentId}`, (val) => {
        if (val) this.CommentDelOk()
      })
    },
    beforeUnmount() {
      this.emitter.off(`modal-cancel-comment_del__${this.commentId}`)
      this.emitter.off(`modal-ok-comment_del__${this.commentId}`)
    },
  }
</script>
