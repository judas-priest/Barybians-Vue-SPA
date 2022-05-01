<template>
  <TextEdit v-cloak :text="text" :attachments="comment.attachments" :max="max" @send="CommentEditUpdate" v-click-outside="CommentEditModal" />
</template>

<script>
  import TextEdit from '@/components/TextEdit.vue'
  export default {
    data() {
      return {
        text: [''], //vue cursor jump fix
        max: {
          text: 5000,
        },
        mounted: false
      }
    },
    methods: {
      CommentEditUpdate(val = null) {
        if (val === null) return
        const text = val.text ?? ''
        const comment = new URLSearchParams({
          text: text,
        })
        this.axios({
            method: 'put',
            url: `/comments/${this.comment.id}`,
            data: comment,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Parse-mode': 'html',
            },
          })
          .then((res) => {
            if (this.comment !== res.comment) {
              this.emitter.emit(`comment-update__${this.postId}`, res.data)
              this.CommentEditCancel()
            }
            
          })
          .catch(() => {
            //console.log(res);
            const settings = {
              id: `__${this.postId}`,
              type: 'post_edit_repeat',
              title: 'Ошибка! Повторить?',
              ok: 'Да',
              cancel: 'Нет',
            }
            this.modalToggle(settings)
          })
      },
      CommentEditModal() {
        if (!this.mounted) {
          this.mounted = true
          return
        }
        if (event.target.id == 'modal') return
        if (this.$store.state.edit) {
          this.$store.state.edit = false
        }
        if (!this.$store.state.modal.toggle) {
          this.$store.state.edit = true
          const settings = {
            id: `__${this.comment.id}`,
            type: 'comment_edit',
            title: 'Изменения будут потеряны. Закрыть?',
            ok: 'Нет',
            cancel: 'Да',
          }
          this.modalToggle(settings)
        }
      },
      CommentEditCancel() {
        this.$store.state.edit = false
        this.$store.state.modal.toggle = false
        this.$emit('cancel', true)
      },
      CommentEditOk() {
        //this.emitter.emit('modal-cancel-post_edit', false);
        this.emitter.emit('modal-ok-comment_edit', false)
        this.$store.state.modal.toggle = false
        this.$store.state.edit = false
      },
    },
    mounted() {
      this.$store.state.edit = true
      this.text[0] = this.comment.text
      this.emitter.on(`modal-cancel-comment_edit__${this.comment.id}`, (val) => {
        if (val) this.CommentEditCancel()
      })
      this.emitter.on(`modal-ok-comment_edit__${this.comment.id}`, (val) => {
        if (val) this.CommentEditOk()
      })
    },
    beforeUnmount() {
      this.$store.state.edit = false
      this.emitter.off(`modal-cancel-comment_edit__${this.comment.id}`)
      this.emitter.off(`modal-ok-comment_edit__${this.comment.id}`)
    },
    components: {
      TextEdit,
    },
    props: ['comment', 'postId'],
  }
</script>
