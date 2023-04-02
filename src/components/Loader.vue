<template>
  <div>
    <img
      class="loading"
      :src="`${this.host}/img/loader.webp`"
      :class="{ loading_invert: invert }"
    />
  </div>
</template>

<style scoped>
.loading {
  width: 100px;
  /* margin-left: auto;
      margin-right: auto;
      display: block; */
}

.loading_invert {
  filter: invert(100%);
}
</style>

<script>
export default {
  name: "Loader",
  data() {
    return {
      invert: false,
    }
  },
  mounted() {
  switch (this.settings.style) {
    case 'white':
          case 'sepia':
                   this.invert = true
  break;
    default:
      this.invert = false
      break;
  }

   
  },
}
</script>
