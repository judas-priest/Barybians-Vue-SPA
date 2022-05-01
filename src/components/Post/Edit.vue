<template>
  <TextEdit v-cloak :text="text" :title="post.title" :attachments="post.attachments" :max="max" @send="PostEditUpdate" v-click-outside="PostEditModal" />
</template>

<script>
  import TextEdit from '@/components/TextEdit.vue'
  export default {
    data() {
      return {
        title: '',
        text: [''], //vue cursor jump fix
        max: {
          title: 50,
          text: 5000,
        },
        mounted: false
      }
    },
    methods: {
      PostEditOk() {
        //this.emitter.emit('modal-cancel-post_edit', false);
        this.emitter.emit(`modal-ok-post_edit__${this.post.id}`, false)
        this.$store.state.modal.toggle = false
        this.$store.state.edit = false
      },
      PostEditCancel() {
        this.$store.state.edit = false
        this.$store.state.modal.toggle = false
        this.$emit('cancel', true)
      },
      PostEditModal() {
        if (!this.mounted) {
          this.mounted = true
          return
        }
        if (event.target.id === 'modal') return
        if (this.$store.state.edit) {
          this.$store.state.edit = false
        }
        if (!this.$store.state.modal.toggle) {
          this.$store.state.edit = true
          const settings = {
            id: `__${this.post.id}`,
            type: 'post_edit',
            title: 'Изменения будут потеряны. Закрыть?',
            ok: 'Нет',
            cancel: 'Да',
          }
          this.modalToggle(settings)
        }
      },
      PostEditUpdate(val = null) {
        if (val === null) return
        const title = val.title ?? ''
        const text = val.text ?? ''
  
        const post = new URLSearchParams({
          title: title,
          text: text,
        })
        this.axios({
            method: 'put',
            url: `/posts/${this.post.id}`,
            data: post,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Parse-mode': 'html',
            },
          })
          .then((res) => {
            this.emitter.emit('post-update', res.data)
            this.PostEditCancel()
          })
          .catch(() => {
            //console.log(res);
            const settings = {
              id: `__${this.post.id}`,
              type: 'post_edit_repeat',
              title: 'Ошибка! Повторить?',
              ok: 'Да',
              cancel: 'Нет',
            }
            this.modalToggle(settings)
          })
      },
    },
    mounted() {
      this.$store.state.edit = true
      this.text[0] = this.post.text
  
      this.emitter.on(`modal-cancel-post_edit__${this.post.id}`, (val) => {
        if (val) this.PostEditCancel()
      })
      this.emitter.on(`modal-ok-post_edit__${this.post.id}`, (val) => {
        if (val) this.PostEditOk()
      })
      this.emitter.on(`modal-cancel-post_edit_repeat__${this.post.id}`, (val) => {
        if (val) this.PostEditCancel()
      })
      this.emitter.on(`modal-ok-post_edit_repeat__${this.post.id}`, (val) => {
        if (val) this.PostEditUpdate()
      })
    },
    beforeUnmount() {
      this.$store.state.edit = false
      this.emitter.off(`modal-cancel-post_edit__${this.post.id}`)
      this.emitter.off(`modal-ok-post_edit__${this.post.id}`)
      this.emitter.off(`modal-cancel-post_edit_repeat__${this.post.id}`)
      this.emitter.off(`modal-ok-post_edit_repeat__${this.post.id}`)
    },
    props: ['post'],
    components: {
      TextEdit,
    },
  }
</script>
