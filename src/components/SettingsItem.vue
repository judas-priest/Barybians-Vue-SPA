<template>
  <div>
    <div v-for="value in item.values" :key="value.value" class="settings-item">
      <input
        :type="item.type"
        :name="item.name"
        :id="`${item.name}_${value.value}`"
        :value="value.value"
        v-model="checkedValue"
        class="pointer"
      />
      <label :for="`${item.name}_${value.value}`" class="pointer">{{
        value.label
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'checked'],
  computed: {
    checkedValue: {
      get: function () {
        return this.checked
      },
      set: function (val) {
        this.$emit('update:checked', val)
        this.$emit('change')
      },
    },
  },
}
</script>

<style scoped>
.settings-item {
  color: var(--profile-text);
}
</style>
