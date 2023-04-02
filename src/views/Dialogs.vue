<template>
  <div v-cloak class="container base">
    <ul class="dialogs-list col-12">
      <Dialog v-for="dialog of dialogs" :key="`dialog${dialog.secondUser.userId}`" :dialog="dialog" :userId="dialog.secondUser.userId" />
      <div v-if="dialogs.length === 0 || dialogs.length === undefined">
        Вы ещё ни с кем не переписывались...
      </div>
    </ul>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'
  
  export default {
    data() {
      return {
        myId: this.$store.state.myId,
        dialogs: [],
      }
    },
    components: {
      Dialog,
    },
    beforeRouteEnter(to, from, next) {
      const axios = require('axios')
      axios
        .get('/dialogs/')
        .then((res) => {
          next((vm) => {
            vm.$store.state.edit = false
            vm.dialogs = res.data
            setTimeout(() => {
              vm.$store.state.loaded.content = true
              vm.emitter.emit('loaded', true)
            }, 0)
          })
        })
        .catch((res) => {
          if (res.error === 404) {
            next((vm) => {
              vm.$store.state.edit = false
              vm.dialogs = {}
              setTimeout(() => {
                vm.$store.state.loaded.content = true
                vm.emitter.emit('loaded', true)
              }, 0)
            })
          }
        })
    },
    mounted() {
      this.emitter.on('message_sended', (data) => {
        for (var obj in this.dialogs) {
          var d = this.dialogs[obj].lastMessage
          if (
            (d.senderId === data.senderId && d.receiverId === data.receiverId) ||
            (d.senderId === data.receiverId && d.receiverId === data.senderId)
          ) {
            //var secondUser = data.senderId != this.myId ? data.senderId : data.receiverId;
  
            //console.log(data.senderId)
            //console.log(data.receiverId)
  
            const temp = this.dialogs[obj]
            temp.lastMessage = data
            //temp.secondUser.id = secondUser;
            temp.unreadCount++
              //console.log(temp);
              this.dialogs.splice(obj, 1)
            this.dialogs.unshift(temp)
          }
        }
        //this.messages.push(data);
      })
      this.emitter.on('message_readed', (data) => {
        //console.log(data);
        for (var obj in this.dialogs) {
          if (this.dialogs[obj].lastMessage.messageId === data.id) {
            this.dialogs[obj].lastMessage.unread = 0
          }
        }
      })
    },
    beforeRouteLeave() {
      this.emitter.emit('loaded', false)
    },
    beforeUnmount() {
      this.emitter.off('message_sended')
      this.emitter.off('message_readed')
    },
  }
</script>

<style scoped>
  .base {
    padding-left: 0;
    padding-right: 0;
  }
  
  .dialogs-list {
    margin-bottom: 0;
    list-style-type: none;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
