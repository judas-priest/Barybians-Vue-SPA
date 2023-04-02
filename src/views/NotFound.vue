<template>
  <div class="container base">
    <h1>Ошибка № 404. Файл не найден</h1>
    <p>
      К сожалению, страница, которую Вы запросили, не существует.<br />
      Возможные причины:
    </p>
    <ol>
      <li>Страница была удалена с сервера</li>
      <li>Страница временно недоступна</li>
      <li>
        Если Вы набирали адрес вручную, проверьте, пожалуйста, правильно ли он
        набран.
      </li>
    </ol>
    <p>
      Вы можете перейти на
      <router-link id="return" to="/">главную страницу</router-link> сайта.
    </p>
  </div>
</template>

<script>
export default {
  name: "404",
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
}
</script>

<style scoped>
#return {
  color: var(--danger);
}
</style>
