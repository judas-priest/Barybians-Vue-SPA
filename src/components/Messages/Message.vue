<template>
  <div class="message-container" :class="{ 'unread': message.unread }" :data-user="message.senderId">
    <div :class="myId == message.senderId ? 'outgoing_msg' : 'incoming_msg'">
      <div class="msg" :data-id="message.id">
        <span class="text" v-html="parseText(message)"></span>
        <span class="time_date">{{ time[1] }}<br />{{ time[0] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    parser,
    Emoji,
    timeName
  } from '@/../public/js/func.js'
  export default {
    data() {
      return {
        myId: this.$store.state.myId,
        time: [],
      }
    },
    props: ['message'],
    methods: {
      parser: parser,
      Emoji: Emoji,
      timeName: timeName,
      parseText(post) {
        //console.log(this.showMoreLess.less);
        var text = post.text
        if (post.attachments !== null && post.attachments !== undefined) {
          text = this.parser(text, post.attachments)
        }
        return this.Emoji(text, 1)
      },
    },
    mounted() {
      this.time = this.timeName(this.message.utime, false)
    },
  }
</script>
