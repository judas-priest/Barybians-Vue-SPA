<template>
  <div>
    <div class="row col-12" id="posts-head">
      <h4 v-if="user.postsCount">Посты ({{ user.postsCount }})</h4>
      <div id="post_add_wrapper">
        <AddBtn
          v-if="user.userId === myId"
          @click="slide"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Добавить пост"
          id="btn_post-add"
          ref="post_add"
        />
      </div>
    </div>
    <collapse-transition>
      <div
        v-if="user.userId === myId && isSlided"
        class="post-add-form"
        v-click-outside="collapse"
      >
        <TextEdit :title="title" :text="text" :max="max" @send="PostAdd" />
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { uuidv4 } from "@/../public/js/func.js"

import AddBtn from "@/components/Buttons/Add.vue"
import TextEdit from "@/components/TextEdit.vue"
export default {
  data() {
    return {
      myId: this.$store.state.myId,
      isSlided: false,
      title: [""], //vue cursor jump fix
      text: [""], //vue cursor jump fix
      max: {
        title: 50,
        text: 5000,
      },
    }
  },
  props: ["user"],
  components: {
    AddBtn,
    TextEdit,
  },
  mounted() {
    this.emitter.on("post-delete", (postId) => {
      if (postId) this.user.postsCount--
    })
    this.emitter.on("modal-cancel-post_add", (val) => {
      if (val && this.isSlided) this.PostAddCancel()
    })
    this.emitter.on("modal-ok-post_add", (val) => {
      if (val && this.isSlided) this.PostAddOk()
    })
    this.emitter.on("modal-ok-post_add-title", (val) => {
      if (val) this.$store.state.modal.toggle = false
    })
    this.emitter.on("modal-ok-post_add-text", (val) => {
      if (val) this.$store.state.modal.toggle = false
    })
  },
  beforeUnmount() {
    this.emitter.off("post-delete")
    this.emitter.off("modal-cancel-post_add")
    this.emitter.off("modal-ok-post_add")
    this.emitter.off("modal-ok-post_add-title")
    this.emitter.off("modal-ok-post_add-text")
  },
  methods: {
    onPaste() {
      const type = event.target.dataset.type
      if (this[type].length > this.max[type]) {
        const settings = {
          type: `post_add-${type}`,
          title: `Текст должен быть не длиннее ${this.max[type]} символов!`,
          ok: "Ок",
        }
        this.modalToggle(settings)
        this[type] = this[type].substring(0, this.max[type])
        return
      }
    },
    PostAdd(val = null) {
      if (val === null) return
      const title = val.title ?? ""
      const text = val.text ?? ""

      const post = new URLSearchParams({
        title: title,
        text: text,
      })
      this.axios({
        method: "post",
        url: "/posts",
        data: post,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Request: this.uuidv4(),
          "Parse-mode": "html",
        },
      })
        .then((res) => {
          this.isSlided = false
          this.$store.state.edit = false
          this.emitter.emit("post-add", res.data)
        })
        .catch(() => {
          //console.log(res);
          const settings = {
            type: "post_add",
            title: "Ошибка! Повторить?",
            ok: "Да",
            cancel: "Нет",
          }
          this.modalToggle(settings)
        })
    },

    PostAddOk() {
      //this.emitter.emit("modal-ok", false);
      this.$store.state.modal.toggle = false
      this.PostAdd()
    },
    PostAddCancel() {
      this.$store.state.edit = false
      //this.emitter.emit("modal-cancel", false);
      this.$store.state.modal.toggle = false
      this.isSlided = false
    },
    slide() {
      if (!this.isSlided && this.$store.state.edit) return
      this.isSlided = !this.isSlided
      this.$store.state.edit = !this.$store.state.edit
    },
    collapse(e) {
      if (event.target.closest("#modal")) return
      if (
        e.target !== document.getElementById("btn_post-add") &&
        !document.getElementById("btn_post-add").contains(e.target) &&
        this.isSlided
      ) {
        this.slide()
      }
    },
    uuidv4: uuidv4,
  },
}
</script>
