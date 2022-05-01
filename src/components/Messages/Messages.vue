<template>
  <div id="msg_history">
    <Message v-for="message of messages" :key="`message${message.id}`" :message="message" />
  </div>
</template>

<script>
  import Message from '@/components/Messages/Message.vue'
  export default {
    name: 'Messages',
    props: ['messages'],
    components: {
      Message,
    },
    updated() {
      this.emitter.emit("messages-loaded", this.messages[5].id);
    },
  }
</script>