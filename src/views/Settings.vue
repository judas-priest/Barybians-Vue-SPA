<template>
  <div class="container base">
    <div class="row">
      <div class="col-12">
        <h4 class="settings-title">Настройки</h4>
        <ul v-on:submit.prevent="submitForm" id="settings-wrapper">
          <li
            type="none"
            v-for="item in items"
            :key="item.name"
            class="setting-item"
          >
            <h5 class="settings-title">{{ item.label }}</h5>
            <Item
              :item="item"
              v-model:checked="item.checked"
              @change="changed = true"
            />
          </li>
          <div id="setting-buttons-wrapper">
            <button
              class="btn btn-outline-danger col-12 col-lg-2"
              @click="resetValues"
            >
              Отменить
            </button>
            <button
              class="btn btn-success col-12 col-lg-2"
              @click="setValues"
              :disabled="changed === false"
            >
              Применить
            </button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/SettingsItem.vue"
export default {
  name: "Settings",
  data() {
    return {
      items: [
        {
          name: "style",
          label: "Тема",
          type: "radio",
          checked: "white",
          values: [
            {
              value: "white",
              label: "Светлая",
            },
            {
              value: "sepia",
              label: "Сепия",
            },
            {
              value: "black",
              label: "Чёрная",
            },
            {
              value: "dark",
              label: "Тёмная",
            },
            {
              value: "winter",
              label: "Зимняя",
            },
          ],
        },
        /*{
                    name: "coloredMessages",
                    label: "Цветные сообщения",
                    type: "checkbox",
                    checked: false,
                    values: [{
                      value: true,
                      label: "Включить",
                    }, ],
                  },
                  {
                    name: "stickersLogo",
                    label: "Логотип стикеров",
                    type: "checkbox",
                    checked: false,
                    values: [{
                      value: true,
                      label: "Включить",
                    }, ],
                  },
                  {
                    name: "blackWhiteImages",
                    label: "Чёрно-белые картинки",
                    type: "checkbox",
                    checked: false,
                    values: [{
                      value: true,
                      label: "Включить",
                    }, ],
                  },*/
      ],
      itemsBackup: [],
      changed: false,
    }
  },
  methods: {
    getValues() {
      this.items.forEach((val, i) => {
        var value = this.$cookies.get(val.name)
        //console.log(val['name'],'_______',value)
        if (value === null) {
          if (val.checked) this.$cookies.set(val.name, val.checked, "30d")
        } else {
          this.items[i].checked = value
        }
        //console.log('_______',value)
      })
      this.itemsBackup = JSON.parse(JSON.stringify(this.items))
      //console.log(this.items)
    },
    setValues() {
      this.items.forEach((val) => {
        if (val.checked) this.$cookies.set(val.name, val.checked, "30d")
        else this.$cookies.set(val.name, "", "30d")
        //console.log('_______',val['checked'])
      })
      this.cssLoad(this.$cookies.get("style"))
    },
    resetValues() {
      //console.log('___________________')
      //console.log(this.items)
      this.items = this.itemsBackup
      //console.log('+++++++++++++++++++')
      //console.log(this.itemsBackup)
      this.itemsBackup = JSON.parse(JSON.stringify(this.items))
      //this.changed = false;
    },
  },
  mounted() {
    this.getValues()
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
    Item,
  },
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 5px;
}

.settings-title {
  color: var(--profile-text);
}

#settings-wrapper {
  padding-left: 0;
}

.setting-item {
  margin-bottom: 1em;
  list-style-type: none;
}

.setting-item div > * {
  margin-right: 3px;
  color: var(--profile-text);
}

input[type="radio"]:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: var(--background) !important;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid var(--foreground) !important;
  outline: none !important;
}

input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: var(--placeholder) !important;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid var(--foreground) !important;
  outline: none !important;
}
</style>
