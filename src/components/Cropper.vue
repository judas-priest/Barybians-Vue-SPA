<template>
  <cropper class="cropper2" ref="cropper" :src="src" minWidth="376" minHeight="376" :stencil-props="{ aspectRatio: 12 / 12 }" />
</template>

<script>
  import {
    Cropper
  } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'
  import {
    uuidv4
  } from '@/../public/js/func.js'
  
  export default {
    components: {
      Cropper,
    },
    props: ['src', 'type', 'name'],
    methods: {
      PhotoUpdate(val) {
        if (val && this.$refs.cropper) {
          const {
            canvas
          } = this.$refs.cropper.getResult()
          if (canvas) {
            canvas.toBlob((blob) => {
              const body = new FormData()
              body.append('photo', blob)
              this.axios({
                  method: 'post',
                  url: '/account/photo',
                  data: body,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Request: this.uuidv4(),
                  },
                  timeout: 120000,
                })
                .then((res) => {
                  this.$nextTick(() => {
                    if (res.data.photo) {
                      this.emitter.emit('photo-update', res.data.photo)
                    }
                    this.$store.state.modal.toggle = false
                  })
                })
                .catch((res) => {
                  console.log(res)
                  this.$store.state.modal.toggle = false
                })
            }, this.type)
          }
          this.$refs.cropper.refresh()
        }
      },
      PhotoUpdateRegister(val) {
        if (val && this.$refs.cropper) {
          const {
            canvas
          } = this.$refs.cropper.getResult()
          if (canvas) {
            canvas.toBlob((blob) => {
              this.emitter.emit('photo-update-reg', {
                image: blob,
                name: this.name,
              })
              this.$store.state.modal.toggle = false
            }, this.type)
          }
          this.$refs.cropper.refresh()
        }
      },
      uuidv4: uuidv4,
    },
    mounted() {
      this.emitter.on('modal-ok-cropper', (val) => this.PhotoUpdate(val))
      this.emitter.on('modal-ok-cropper_register', (val) =>
        this.PhotoUpdateRegister(val)
      )
    },
    beforeUnmount() {
      this.emitter.off('modal-ok-cropper')
      this.emitter.off('modal-ok-cropper_register')
    },
  }
</script>

<style>
  .cropper2 {
    max-height: 60vh;
  }
</style>
