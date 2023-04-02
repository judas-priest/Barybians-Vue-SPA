<template>
  <div
    class="message-container"
    :class="{ unread: message.unread }"
    :data-user="message.senderId"
  >
    <div :class="myId === message.senderId ? 'outgoing_msg' : 'incoming_msg'">
      <div class="msg" :data-id="message.messageId">
        <div class="text">
          <span v-if="text" v-html="text"></span>
          <span
            class="attachments"
            contenteditable="false"
            v-html="attachments"
            ref="attachments"
          ></span>
        </div>
        <span class="time_date">{{ time[1] }}<br />{{ time[0] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { parser, Emoji, timeName } from "@/../public/js/func.js"
export default {
  data() {
    return {
      myId: this.$store.state.myId,
      time: [],
    }
  },
  props: ["message"],
  methods: {
    parser: parser,
    Emoji: Emoji,
    timeName: timeName,
  },
  computed: {
    text() {
      if (
        this.message.attachments !== null &&
        this.message.attachments !== undefined
      ) {
        const parsed = this.parser(this.message.text, this.message.attachments)
        return this.Emoji(parsed.text, 1)
      } else return this.Emoji(this.message.text, 1)
    },
    attachments() {
      if (
        this.message.attachments !== null &&
        this.message.attachments !== undefined
      ) {
        const parsed = this.parser(this.message.text, this.message.attachments)
        return this.Emoji(parsed.attachments, 1)
      } else return ""
    },
  },
  mounted() {
    this.time = this.timeName(this.message.time, false)
  },
}
</script>
