<template>
  <div class="wysiwig">
    <button
      :disabled="disabled || !selection"
      title="Жирный"
      class="wysiwig__button"
      @click="wysiwig('b')"
    >
      <b>B</b>
    </button>
    <button
      :disabled="disabled || !selection"
      title="Курсив"
      class="wysiwig__button"
      @click="wysiwig('i')"
    >
      <i>I</i>
    </button>
    <button
      :disabled="disabled || !selection"
      title="Подчёркнутый"
      class="wysiwig__button"
      @click="wysiwig('u')"
    >
      <u>U</u>
    </button>
    <button
      :disabled="disabled || !selection"
      title="Зачёркнутый"
      class="wysiwig__button"
      @click="wysiwig('s')"
    >
      <s>S</s>
    </button>
    <button
      :disabled="disabled || !selection"
      title="Создать ссылку"
      class="wysiwig__button"
      @click="wysiwig('a')"
      ref="link"
    >
      🔗
    </button>
    <button
      :disabled="disabled || !selection"
      title="Убрать всё форматирование"
      class="wysiwig__button"
      @click="removeFormat()"
    >
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
      currentRange: "",
    }
  },
  props: ["disabled", "text"],
  methods: {
    wysiwig(e) {
      console.log(e, this.href)
      /*  var start = window.getSelection().getRangeAt(0).startOffset 
        var stop = window.getSelection().getRangeAt(0).endOffset  */

      const styledElement = document.createElement(e)
      const userSelection = window.getSelection()
      const selectedTextRange = userSelection.getRangeAt(0)
      selectedTextRange.surroundContents(styledElement)
    },

    createLink() {
      this.currentRange = window.getSelection().getRangeAt(0)
      const settings = {
        type: "create_link",
        title: "Введите адрес ссылки",
        ok: "Ок",
        cancel: "Убрать",
      }
      this.modalToggle(settings)
    },
    removeFormat() {
      const userSelection = window.getSelection()
      const selectedTextRange = userSelection.getRangeAt(0)
      selectedTextRange.startContainer.innerHTML = selectedTextRange.startContainer.textContent
    },
    SelectionHandler() {
      this.selection = Boolean(document.getSelection().toString())
    },
  },
  mounted() {
    // console.log('wis mnt')
    document.addEventListener("selectionchange", this.SelectionHandler)
    this.emitter.on("modal-ok-create_link", (val) => {
      console.log(val)
      if (val && val !== true && this.currentRange) {
        this.href = val
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(this.currentRange)
        this.wysiwig("a")
      }
      this.$store.state.modal.toggle = false
    })
    this.emitter.on("modal-cancel-create_link", (val) => {
      if (val && this.currentRange) {
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(this.currentRange)
        this.wysiwig("unlink")
      }
      this.$store.state.modal.toggle = false
    })
  },
  beforeUnmount() {
    //console.log('wis unm')
    document.removeEventListener("selectionchange", this.SelectionHandler)
    this.emitter.off("modal-ok-create_link")
    this.emitter.off("modal-cancel-create_link")
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
