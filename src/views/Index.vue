<template>
  <div class="container base">
    <h1 style="display: none">Социальная сеть "Барыбинцы"</h1>
    <h2 style="display: none">Маленькая соцсеть с огромным потенциалом</h2>
    <div v-cloak class="row" v-if="!$store.state.myId" >
      <div class="col-sm-12 col-md-3 order-2 order-md-1 forms-container">
        <div class="content">
          <div v-if="!auth && !register" class="menu">
            <button @click="auth = true" class="btn btn-secondary menu-btn auth-btn2">
                  Вход
                </button>
            <button @click="register = true" class="btn btn-secondary menu-btn register-btn">
                  Регистрация
                </button>
          </div>
          <Auth v-if="auth && !register" @close="auth = false" />
          <Register v-if="!auth && register" @close="register = false" />
        </div>
      </div>
      <div class="col-sm-12 col-md-9 order-1 order-md-2">
        <picture v-cloak>
          <source srcset="@/../public/img/jopa0000.webp" type="image/webp" media="(min-width: 768px)" class="w-100" />
          <img src="@/../public/img/jopa0001.png" alt="budka" class="w-100" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
//row v-show="!axios.defaults.headers.common['Authorization']"
  import Auth from '@/components/Index/Login.vue'
  import Register from '@/components/Index/Register.vue'
  import {
    preloaderStop
  } from '@/../public/js/func.js'
  export default {
    data() {
      return {
        show: false,
        auth: false,
        register: false,
      }
    },
    methods: {
      preloaderStop: preloaderStop,
    },
    created() {
      document.title = 'Вход — Барыбинцы'
      if (this.$store.state.myId) {
        this.$router.push(`/profile/id${this.$store.state.myId}`)
      }
    },
    updated() {
      if (this.$store.state.myId) {
        this.$router.push(`/profile/id${this.$store.state.myId}`)
      }
    },
    mounted() {
      this.$nextTick(() => this.preloaderStop())
    },
    beforeRouteLeave() {
      this.emitter.emit('loaded', false)
    },
    components: {
      Auth,
      Register,
    },
  }
</script>

<style lang="scss">
  .btns {
    margin-top: 10pt;
  }
  
  .auth,
  .register {
    text-align: left;
  }
  
  .auth-btn2,
  .register-btn {
    width: 70%;
  }
  
  .menu-btn,
  .register-item,
  .auth-item {
    background-color: var(--primary);
  }
  
  .menu-btn:hover,
  .register-item:hover,
  .auth-item:hover {
    background-color: var(--foreground);
  }
  
  .auth>*,
  .register>* {
    color: var(--profile-text);
  }
  
  .forms-container {
    text-align: center;
  }
  
  .menu {
    margin-top: 50%;
    text-align: center;
    vertical-align: middle;
  }
  
  .auth-btn2 {
    margin-top: 15%;
    margin-bottom: 15pt;
  }
  
  .form-text {
    display: none;
    color: red;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    font-size: 15pt;
    float: right;
    margin-top: 5pt;
    color: var(--link);
  }
  
  .close-btn:hover {
    color: red;
    outline: none;
  }
  
  label {
    margin-bottom: -0.4rem;
  }
  
  @media (max-width: 767.98px) {
    .row {
      margin-top: 0;
    }
    .menu {
      margin-top: 0;
    }
  }
  
  #log {
    transform: scale(-1, 1);
  }
</style>
