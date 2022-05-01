<template>
    <div class="auth">
      <button @click="$emit('close')" class="close-btn" tabindex="1">×</button>
      <br />
      <div class="form-group">
        <label for="auth-login-input">Логин</label>
        <input type="text" class="form-control auth-item" pattern="[a-zA-Z0-9-]{4,20}" v-model="username" @keyup.enter="$refs.password.focus()" ref="login" />
        <small id="auth-login-small" class="form-text"></small>
      </div>
      <div class="form-group">
        <label for="auth-password-input">Пароль</label>
        <input type="password" class="form-control auth-item" pattern="[a-zA-Z0-9-]{4,20}" v-model="password" @keyup.enter="Login" ref="password" />
        <small id="auth-password-small" class="form-text"></small>
      </div>
      <button id="auth-btn" type="submit" class="form-control btn btn-secondary btns auth-item" @click="Login" :disabled="username.length < 4 || password.length < 4">
          Войти
        </button>
    </div>
</template>

<script>
  import {
    errorHandler
  } from "@/../public/js/func.js";
  export default {
    data() {
      return {
        username: "",
        password: "",
        status: "",
      };
    },
    methods: {
      Login() {
        if (this.username.length > 3 && this.password.length > 3) {
          const login = new URLSearchParams({
            username: this.username.trim(),
            password: this.password.trim(),
          });
          this.axios({
              method: "post",
              url: "/auth",
              data: login,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              validateStatus: (status) => {
                this.status = status;
                return true;
              },
            })
            .then((res) => {
              //console.log(this.rot13(res.data.token));
              this.$cookies.set("token", this.cipher(res.data.token), "90d");
              this.axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.token}`;
              this.$store.state.myId = res.data.user.userId;
              this.$nextTick(() => {
                this.$router.push({
                  path: this.$store.state.page ?? `/profile/id${this.$store.state.myId}`
                  //path: `/profile/id${this.$store.state.myId}`,
                });
                this.$store.state.page = null
              });
              //this.GetMyId(res.data.token);
            })
            .catch(() => {
              this.errorHandler(this.status);
            });
        }
      },
      errorHandler: errorHandler,
      LoginCancel() {
        this.$store.state.modal.toggle = false;
      },
      escapeHandler(e) {
        if (e.key === "Escape" && !this.$store.state.modal.toggle)
          this.$emit("close");
      },
    },
    mounted() {
      document.addEventListener("keydown", this.escapeHandler);
    },
    beforeUnmount() {
      document.removeEventListener("keydown", this.escapeHandler);
    },
  };
</script>

<style>
  #auth-btn {
    margin-top: 17px;
  }
</style>