<template>
  <div class="post-edit-ops post-mng-btn pointer" @click="PostDel">
    <DelBtn :type="'btn_post-del'" title="Удалить пост" style="height: 16pt; width: auto" />
  </div>
</template>

<script>
  import DelBtn from '@/components/Buttons/Del2.vue'
  export default {
    components: {
      DelBtn,
    },
    props: ['postId'],
    methods: {
      PostDel() {
        if (this.$store.state.edit && event.target.id == 'modal') return
        this.$store.state.edit = true
        const settings = {
          id: `__${this.postId}`,
          type: `post_del`,
          title: 'Удалить пост?',
          ok: 'Нет',
          cancel: 'Да',
        }
        this.modalToggle(settings)
      },
      PostDelCancel() {
        this.axios({
          method: 'delete',
          url: `/posts/${this.postId}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
          if (res.data) {
            this.emitter.emit('post-delete', this.postId)
            //this.emitter.emit(`modal-cancel-post_del_${this.postId}`, false);
            this.$store.state.modal.toggle = false
          }
        })
        this.$store.state.edit = false
      },
      PostDelOk() {
        //this.emitter.emit(`modal-ok-post_del_${this.postId}`, false);
        this.$store.state.modal.toggle = false
        this.$store.state.edit = false
      },
    },
    mounted() {
      this.emitter.on(`modal-cancel-post_del__${this.postId}`, (val) => {
        if (val) this.PostDelCancel()
      })
      this.emitter.on(`modal-ok-post_del__${this.postId}`, (val) => {
        if (val) this.PostDelOk()
      })
    },
    beforeUnmount() {
      this.emitter.off(`modal-cancel-post_del__${this.postId}`)
      this.emitter.off(`modal-ok-post_del__${this.postId}`)
    },
  }
</script>
