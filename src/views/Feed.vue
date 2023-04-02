<template>
  <div class="container base">
    <div v-if="true === false" id="stories-title">
      <h4>Истории</h4>
    </div>

    <div v-if="true === false" class="col-12 posts-body" id="stories">
      <div id="storie-modal" class="modal">
        <div id="storie-loading">
          <h1>Загрузка</h1>
        </div>
        <video autoplay="" loop="" class="modal-content" id="storie"></video>
      </div>
      <div class="storie" style="display: inline-block">
        <p
          class="post-text post-content"
          style="margin: 5pt; text-align: center"
        >
          <span class="user-storie" style="display: block; text-align: center">
            <img
              id="btn_add-storie"
              class="rounded min-photo"
              alt="profile-photo"
            />
          </span>
        </p>
      </div>
    </div>
    <div id="posts-title">
      <h4>Новые посты</h4>
    </div>
    <Posts v-cloak :myId="myId" ref="posts" />
  </div>
</template>

<script>
import Posts from "@/components/Post/Posts.vue"

export default {
  name: "Feed",
  data() {
    return {
      myId: this.$store.state.myId,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.state.loaded.content = true
      this.emitter.emit("loaded", true)
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.state.loaded.content = true
      vm.emitter.emit("loaded", true)
    })
  },
  beforeRouteLeave() {
    this.emitter.emit("loaded", false)
  },
  components: {
    Posts,
  },
}
</script>

<style lang="scss" scoped>
// #stories {
//   display: inline-block;
//   overflow-x: auto;
//   white-space: nowrap;
// }
// .storie {
//   padding: 0;
// }
// #storie-modal {
//   background-color: #000d;
//   z-index: 5555;
// }
// #storie-modal > * {
//   border: none;
// }
// #storie-loading {
//   color: red;
//   z-index: 2000;
//   max-width: 1260px;
//   max-height: 660px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   margin-right: -50%;
//   transform: translate(-50%, -50%);
// }
// video.modal-content {
//   background-color: transparent;
// }
// @media screen and (max-width: 768px) {
//   video.modal-content {
// max-width: 1260px;
// max-height: 660px;
// position: absolute;
// top: 50%;
// left: 50%;
// margin-right: -50%;
// transform: translate(-50%, -50%);
//   }
//   img.storie-avatar,
//   img#btn_add-storie {
//     height: 2em;
//     width: 2em;
//   }
// }
.storie {
  background: #fff none repeat scroll 0 0;
  border-radius: 6pt;
  font-size: 14pt;
  margin-bottom: 10px;
  padding: 10px;
}

#posts-title {
  color: var(--profile-text);
}
</style>
