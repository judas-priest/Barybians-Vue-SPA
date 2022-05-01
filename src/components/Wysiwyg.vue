<template>
  <div class="wysiwig">
    <button :disabled="disabled || !selection" title="Жирный" class="wysiwig__button" @click="wysiwig('bold')">
                        <b>B</b>
                      </button>
    <button :disabled="disabled || !selection" title="Курсив" class="wysiwig__button" @click="wysiwig('italic')">
                        <i>I</i>
                      </button>
    <button :disabled="disabled || !selection" title="Подчёркнутый" class="wysiwig__button" @click="wysiwig('underline')">
                        <u>U</u>
                      </button>
    <button :disabled="disabled || !selection" title="Зачёркнутый" class="wysiwig__button" @click="wysiwig('strikeThrough')">
                        <s>S</s>
                      </button>
    <button :disabled="disabled || !selection" title="Создать ссылку" class="wysiwig__button" @click="createLink" ref="link">
                        🔗
                      </button>
    <button :disabled="disabled || !selection" title="Убрать всё форматирование" class="wysiwig__button" @click="wysiwig('unlink');wysiwig('removeFormat')">
                        &lt;&gt;
                      </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selection: false,
        href: null,
        currentRange: ''
      }
    },
    props: ['disabled'],
    methods: {
      wysiwig(e) {
        console.log(e, this.href);
        document.execCommand(e, true, this.href)
      },
      createLink() {
        this.currentRange = window.getSelection().getRangeAt(0);
        const settings = {
          type: 'create_link',
          title: 'Введите адрес ссылки',
          ok: 'Ок',
          cancel: 'Убрать',
        }
        this.modalToggle(settings)
      },
      SelectionHandler() {
        this.selection = Boolean(document.getSelection().toString())
      },
    },
    mounted() {
      // console.log('wis mnt')
      document.addEventListener('selectionchange', this.SelectionHandler)
      this.emitter.on('modal-ok-create_link', (val) => {
        console.log(val);
        if (val && val !== true && this.currentRange) {
          this.href = val
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(this.currentRange);
          this.wysiwig('createLink')
        }
        this.$store.state.modal.toggle = false
      })
      this.emitter.on('modal-cancel-create_link', (val) => {
        if (val && this.currentRange) {
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(this.currentRange);
          this.wysiwig('unlink')
  
        }
        this.$store.state.modal.toggle = false
      })
    },
    beforeUnmount() {
      //console.log('wis unm')
      document.removeEventListener('selectionchange', this.SelectionHandler)
      this.emitter.off('modal-ok-create_link')
      this.emitter.off('modal-cancel-create_link')
    },
  }
</script>

<style scoped>
  .wysiwig__button {
    background-color: #efefef;
    color: #000;
    border: 1px solid var(--primary) !important;
    width: 2.4rem;
    border-radius: 2pt;
  }
  
  .wysiwig__button:active {
    color: #f00;
  }
  
  button:disabled,
  button[disabled] {
    pointer-events: none;
    opacity: 0.3;
  }
</style>
