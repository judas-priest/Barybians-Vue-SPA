<template>
    <div class="register">
      <button @click="$emit('close')" class="close-btn" tabindex="1">×</button>
      <br />
      <div class="form-group">
        <label for="register-name-input">Имя</label>
        <input type="text" class="form-control register-item" id="register-name-input" v-model="firstName" pattern="[A-Za-zА-Яа-яЁё-]{2,}" placeholder="От 2 до 20 букв" />
        <small id="register-name-small" class="form-text"></small>
  
        <label for="register-surname-input">Фамилия</label>
        <input type="text" class="form-control register-item" id="register-surname-input" v-model="lastName" pattern="[A-Za-zА-Яа-яЁё-]{2,}" placeholder="От 2 до 20 букв" />
        <small id="register-surname-small" class="form-text"></small>
  
        <label for="register-sex-input">Пол</label>
        <select v-model="sex" class="form-control">
                <option value="male" selected="">Мужской</option>
                <option value="female">Женский</option>
              </select>
        <small id="register-sex-small" class="form-text"></small>
  
        <label for="register-birth-date-input">Дата рождения</label>
        <input type="date" class="form-control register-item" id="register-birth-date-input" placeholder="дд.мм.гггг" v-model="birthDate" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}" />
        <small id="register-birth-date-small" class="form-text"></small>
  
        <label for="register-photo-input">Фото профиля</label>
        <button class="form-control btn btn-secondary register-item" name="upload_image" id="register-photo-input" @click="setAvatar">
                {{ photo ? imageName : "Выбрать..." }}
              </button>
        <small id="register-photo-small" class="form-text"></small>
        <span id="uploaded_image"></span>
  
        <label for="register-login-input">Логин</label>
        <input type="text" class="form-control register-item" id="register-login-input" v-model="username" pattern="[a-zA-Z0-9-]{4,}" placeholder="От 4 до 20 символов" />
        <small id="register-login-small" class="form-text"></small>
  
        <label for="register-password-input">Пароль</label>
        <input type="password" class="form-control register-item" id="register-password-input" v-model="password" pattern="[a-zA-Z0-9-]{4,}" placeholder="От 4 до 50 символов" />
        <small id="register-password-small" class="form-text"></small>
  
        <label for="register-password-repeat-input">Повторите пароль</label>
        <input type="password" class="form-control register-item" id="register-password-repeat-input" placeholder="Пароли должны совпадать!" v-model="passwordRepeat" />
        <small id="register-password-repeat-small" class="form-text"></small>
      </div>
      <button type="submit" class="form-control btn btn-secondary" id="register-btn" @click="Register" :disabled="!Validate">
              Зарегистрироваться
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
        firstName: "",
        lastName: "",
        sex: "0",
        birthDate: "",
        photo: "",
        username: "",
        password: "",
        passwordRepeat: "",
        imageName: "",
      };
    },
    methods: {
      Register() {
        if (
          this.firstName.length > 1 &&
          this.firstName.length < 20 &&
          this.lastName.length > 1 &&
          this.lastName.length < 20 &&
          this.sex &&
          this.birthDate &&
          this.photo &&
          this.username.length > 3 &&
          this.username.length < 20 &&
          this.password.length > 3 &&
          this.password.length < 50
        ) {
          console.log('dima')
          const body = new FormData();
          body.append("firstName", this.firstName.trim());
          body.append("lastName", this.lastName.trim());
          body.append("sex", this.sex.trim());
          body.append("birthDate", this.birthDate.trim());
          body.append("photo", this.photo);
          body.append("username", this.username.trim());
          body.append("password", this.password.trim());
  
          this.axios({
              method: "post",
              url: "/register",
              data: body,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch(() => {
              this.errorHandler(this.status);
            });
        }
      },
      setAvatar() {
        const settings = {
          type: "cropper_register",
          title: "Выбрать фото профиля",
          ok: "Добавить",
          cancel: "Отмена",
        };
        this.modalToggle(settings);
      },
      errorHandler: errorHandler,
      escapeHandler(e) {
        if (e.key === "Escape" && !this.$store.state.modal.toggle) this.$emit("close");
      },
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.escapeHandler);
    },
    mounted() {
      document.addEventListener('keydown', this.escapeHandler);
      this.emitter.on("photo-update-reg", (photo) => {
        if (photo) {
          this.photo = photo.image;
          this.imageName = photo.name;
        }
      });
      this.emitter.on("modal-cancel-cropper_register", (val) => {
        if (val) {
          this.photo = null;
          this.imageName = null;
          this.$store.state.modal.toggle = false;
        }
      });
    },
    computed: {
      Validate() {
        return (
          this.firstName.length > 1 &&
          this.firstName.length < 20 &&
          this.lastName.length > 1 &&
          this.lastName.length < 20 &&
          this.sex &&
          this.birthDate &&
          this.photo &&
          this.username.length > 3 &&
          this.username.length < 20 &&
          this.password.length > 3 &&
          this.password.length < 50 &&
          this.password === this.passwordRepeat
        )
  
      },
    }
  };
</script>

<style scoped>
  #register-btn {
    margin-top: 17px;
  }
   ::placeholder {
    color: #666666aa;
  }
</style>