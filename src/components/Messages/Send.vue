<template>
  <div class="send-message fixed-bottom">
    <div id="send-message-container">
      <div class="container">
        <TextEdit :text="text" :max="max" :type="'message_send'" @send="SendMessage" />
        <button v-if="true === false" id="btn_attach">
                      😀<sup id="attachment-counter"></sup>
                    </button>
      </div>
    </div>
  </div>
</template>

<script>
  //@input="[(textValue = $event.target.value), Type()]"
  import {
    uuidv4
  } from '@/../public/js/func.js'
  import TextEdit from '@/components/TextEdit.vue'
  export default {
    data() {
      return {
        text: [''],
        typing: false,
        max: {
          text: 5000,
        },
        loaded: false,
      }
    },
    props: ['userId'],
    methods: {
      SendMessage(text = this.text) {
        if (
          this.$socketClient.instance &&
          this.$socketClient.instance.readyState === 1
        )
          this.SendMessageWS(text)
        else this.SendMessageRest(text)
      },
      SendMessageWS(val = null) {
        if (val === null) return
        const text = val.text ?? ''
  
        if (text.length !== undefined && text.length !== 0) {
          let msg = {
            type: 'message_send',
            user: this.userId,
            text: text,
            request: this.uuidv4(),
          }
          this.$socketClient.sendObj(msg)
          //this.$emit('sended')
          this.$store.state.edit = false
          this.text = ''
        }
      },
      SendMessageRest(text = this.text) {
        if (this.text) text = this.text
        if (text.length !== undefined && text.length !== 0) {
          console.log(text)
          const msg = new URLSearchParams({
            text: text.trim(),
          })
          this.axios({
              method: 'post',
              url: `/messages/${this.userId}`,
              data: msg,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Request: this.uuidv4(),
                'Parse-mode': 'html',
              },
            })
            .then((res) => {
              this.$store.state.edit = false
              this.$emit('sended', res.data)
              this.text = ''
            })
            .catch(() => {
              //console.log(res);
              const settings = {
                type: 'message_send',
                title: 'Ошибка! Повторить?',
                ok: 'Да',
                cancel: 'Нет',
              }
              this.modalToggle(settings)
            })
        }
      },
      onPaste() {
        const type = event.target.dataset.type
        if (this[type].length > this.max[type]) {
          const settings = {
            type: `message_send-${type}`,
            title: `Текст должен быть не длиннее ${this.max[type]} символов!`,
            ok: 'Ок',
          }
          this.modalToggle(settings)
          this[type] = this[type].substring(0, this.max[type])
          return
        }
      },
      // StickersClose(e) {
      //   if (this.stickers && !this.$refs.send_button.contains(e.target))
      //     this.stickers = false
      // },
      Size() {
        this.$refs.input.rows++
      },
      Type() {
        this.autosize(this.$refs.input)
        //console.log(this.$refs.input.scrollHeight);
        //this.$refs.input.style.overflow = 'hidden';
        //this.$refs.input.style.height = 0;
        //this.$refs.input.style.height = this.$refs.input.scrollHeight + 5 + 'px';
  
  
        if (
          this.$socketClient.instance &&
          this.$socketClient.instance.readyState === 1
        ) {
          if (this.text.length === 1) {
            let msg = {
              type: 'message_type',
              status: true,
              user: this.userId,
            }
            this.$socketClient.send(JSON.stringify(msg))
          } else if (this.text.length === 0) {
            let msg = {
              type: 'message_type',
              status: false,
              user: this.userId,
            }
            this.$socketClient.send(JSON.stringify(msg))
          }
        }
      },
      uuidv4: uuidv4,
    },
    computed: {
      textValue: {
        get() {
          return this.text
        },
        set(v) {
          this.text = v
        },
      },
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.loaded = true
        }, 1000)
      })
    },
    components: {
      TextEdit,
    },
  }
</script>

<style>
  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  #send-message-container {
    background: var(--primary);
    border-radius: 0;
  }
  
  .send-message>div {
    /*background: #f0f0f0;*/
    padding: 3pt 3pt;
    border-radius: 3pt 3pt 0 0;
  }
  
  #message-input {
    border-radius: 3pt;
    height: 25pt;
    /*min-height: 2em;*/
    max-height: 8em;
    line-height: 1em;
    display: block;
    margin: 0px auto;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    height: 44px;
  }
  
  #message-input-hidden {
    display: none;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
  }
  
  .stickers.message_send {
    top: 0;
    margin-top: -10em;
  }
  
  @media (max-width: 767.98px) {
    .send-message {
      margin-bottom: 40px!important;
    }
  }
</style>
