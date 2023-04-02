y
<template>
  <div class="wrapper">
    <div
      v-if="typeof title !== 'undefined'"
      @input="title[0] = $event.currentTarget.innerText"
      @paste="onPaste"
      contenteditable="true"
      @keyup="checkLimit"
      @keydown.enter.exact.prevent="$refs.text.focus()"
      @keydown.shift.enter.exact.prevent="$refs.text.focus()"
      class="edit-block input-text"
      placeholder="Введите заголовок поста..."
      ref="title"
      @focus="wysiwygDisable = true"
      data-type="title"
      v-html="title"
    ></div>
    <div
      @input="text[0] = $event.currentTarget.innerHTML"
      @paste="onPaste"
      contenteditable="true"
      @keyup="checkLimit"
      @keydown.enter.shift.exact.prevent="Send"
      class="edit-block input-text"
      placeholder="Введите текст!"
      ref="text"
      @focus="wysiwygDisable = false"
      data-type="text"
      v-html="text"
    ></div>
    <div class="col-12 edit-ops">
      <Wysiwyg
        :disabled="wysiwygDisable"
        @focus="wysiwygDisable = false"
        :text="text[0]"
      />
      <button class="edit-close-btn"></button>
      <button class="send_button" ref="send">
        <transition name="fade" mode="out-in">
          <StickersButton
            v-if="!text[0] || text[0] == '<br>'"
            @click="stickers = !stickers"
            height="30"
            width="30"
          />
          <SendBtn v-else @click="Send" height="30" width="30" />
        </transition>
      </button>
    </div>
    <transition name="stickers">
      <Stickers
        v-if="stickers"
        :class="[type ? 'message_send' : '']"
        @sticker="SendSticker"
        v-click-outside="StickersClose"
      />
    </transition>
    <div
      v-if="typeof attachments !== 'undefined' && attachments"
      v-cloak
      class="edit-block input-text"
      placeholder="Вложения..."
      ref="attachments"
      @focus="wysiwygDisable = true"
      v-html="ParsedAttachments()"
    ></div>
  </div>
</template>

<script>
import Wysiwyg from "@/components/Wysiwyg.vue"
import StickersButton from "@/components/Buttons/Stickers.vue"
import Stickers from "@/components/Stickers.vue"
import SendBtn from "@/components/Buttons/Send.vue"
import { parser } from "@/../public/js/func.js"
export default {
  data() {
    return {
      stickers: false,
      wysiwygDisable: true,
    }
  },
  methods: {
    Send() {
      
      var preparedText = this.$refs.text.innerHTML //this.text[0]
        .trim()
        .replace(/<div>/gi, "\n")
        .replace(/<\/div>/gi, "")
        .replace(/<p[^>]*>/gi, "\n")
        .replace(/<\/p>/gi, "")
        .replace(/<strike>/gi, "<s>")
        .replace(/<\/strike>/gi, "</s>")
        .replace(/\sstyle=".*"/gi, "")
        .trim()

      var preparedTitle
      if (this.title) preparedTitle = this.title[0].trim()
      else preparedTitle = ""

      if(preparedText.length){
      this.$emit("send", {
        text: preparedText,
        title: preparedTitle,
      })
      if (this.title) this.title = ""
      this.text[0] = ""
      this.$refs.text.innerHTML = ""
    }
    },
    SendSticker(sticker) {
      this.$emit("send", {
        text: `<sticker pack="${sticker.pack}">${sticker.sticker}</sticker>`,
      })
      this.stickers = false
      this.text[0] = ""
    },
    StickersClose(e) {
      if (this.stickers && !this.$refs.send.contains(e.target))
        this.stickers = false
    },
    ParsedAttachments() {
      if (
        this.attachments !== null &&
        this.attachments !== undefined &&
        this.text[0]
      ) {
        const parsed = this.parser(this.$refs.text.innerHTML, this.attachments)
        return parsed.attachments
      } else return ""
    },
    textParsed() {
      if (this.attachments !== null && this.attachments !== undefined) {
        const parsed = this.parser(this.text[0].toString(), this.attachments)
        return parsed.text
      } else return this.text[0]
    },
    parser: parser,
  },
  computed: {},
  mounted() {
    if (typeof this.title !== "undefined") this.$refs.title.focus()
    else this.$refs.text.focus()

    this.$nextTick(() => {
      // this.title = this.title.toString()

      // console.log(this.title)
      // console.log(this.text)
      if (this.title) this.$refs.title.innerText = this.title[0] //this.text[0]
      this.$refs.text.innerHTML = this.textParsed() //this.text[0]
      //this.text[0] = this.text[0].toString()
    })
  },
  beforeUnmount() {
    this.stickers = false
  },
  updated(){
    console.log(this.text[0])
    
  },
  props: ["text", "max", "title", "attachments", "type"],
  components: {
    SendBtn,
    Wysiwyg,
    StickersButton,
    Stickers,
  },
}
</script>

<style scoped>
.stickers-enter-active {
  animation: bounce-in 0.5s;
  transition: opacity 0.3s;
}

.stickers-leave-active {
  animation: bounce-in 0.5s reverse;
  transition: opacity 0.3s;
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(0px);
  }
}

.wrapper {
  /* background-color: var(--primary); */
  border-radius: 6pt;
  padding: 10px;
}

.input-text {
  min-height: 2em;
  max-height: 8em;
  margin: 0px auto;
  flex: 1;
  border-radius: 3pt !important;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--background);
  overflow: auto;
}

[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}

.edit-block {
  border: 1px solid;
  border-radius: 4pt;
  padding-left: 5px;
  padding-right: 5px;
}

.edit-block > a {
  color: #3377ff !important;
}

.edit-ops {
  display: flex;
}

.edit-ops > button {
  background-color: transparent;
  border: none;
  fill: var(--block-time);
}

.edit-close-btn {
  margin: auto;
  margin-right: 0;
}

.edit-send-btn {
  margin: auto;
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 2rem;
  margin-right: 0;
  display: inline;
  padding-bottom: 0;
  padding-top: 0;
}

/* [placeholder]:empty:focus::before {
                                                                                      content: "";
                                                                                  } */
</style>
