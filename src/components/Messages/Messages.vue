<template>
  <div>
    <Loader v-if="!messages.length || loading" />
    <div v-show="!loading" id="msg_history" ref="msgs">
      <Message
        v-for="message of messages"
        :key="`message${message.messageId}`"
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue"
import Message from "@/components/Messages/Message.vue"
export default {
  name: "Messages",
  props: ["messages"],
  data() {
    return {
      loading: true,
    }
  },
  components: {
    Loader,
    Message,
  },
  mounted() {},
  updated() {
    this.emitter.emit(
      "messages-loaded",
      this.messages[this.messages.length - 1].id
    )
    if (
      this.$refs.msgs.childElementCount === this.messages.length &&
      this.loading
    ) {
      this.loading = false
      this.$refs.msgs.lastElementChild.scrollIntoView(false)
    }
  },
}
</script>
