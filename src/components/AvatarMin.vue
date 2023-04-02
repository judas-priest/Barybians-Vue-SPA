<template>
  <img class="min-photo" v-bind:class="{
        userOnline: online(lastVisit),
      }" :src="photo" :data-id="userId" :onerror="imageErrorAvatar" alt="user_avatar" />
</template>

<script>
  import {
    online
  } from '@/../public/js/func.js'
  
  export default {
    props: ['userId', 'lastVisit', 'photo'],
    computed: {
      online() {
        return online
      },
    },
  }
</script>

<style scoped>
  .min-photo {
    height: 50px !important;
    width: 50px !important;
    border-radius: 6px;
  }
</style>
