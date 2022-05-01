export default {
  methods: {
    modalToggle(settings) {
      this.$store.state.modal.settings = settings
      this.$store.state.modal.toggle = true
    },
    goto(refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop
      window.scrollTo(0, top)
    },
    checkLimit(evt) {
      const type = evt.target.dataset.type
      if (this[type].length >= this.max[type]) {
        if (evt.keyCode >= 48 && evt.keyCode <= 90) {
          evt.preventDefault()
          const settings = {
            type: `post_add-${type}`,
            title: `Текст должен быть не длиннее ${this.max[type]} символов!`,
            ok: 'Ок',
          }
          this.modalToggle(settings)
          return
        }
      }
    },
  },
}
