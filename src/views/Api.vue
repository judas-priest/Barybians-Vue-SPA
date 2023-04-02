<template>
  <div class="container base" @click="uuidv4Update">
    <div class="row">
      <div class="swagger-ui col-12" id="swagger-ui"></div>
    </div>
  </div>
</template>

<script>
import SwaggerUI from "swagger-ui"
import "/var/www/api.barybians.ru/swagger/swagger-ui.css"
export default {
  name: "Api",
  methods: {
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    uuidv4Update() {
      document.querySelectorAll('input[placeholder="request"').forEach((el) => {
        el.value = this.uuidv4()
      })
    },
  },
  mounted() {
    const spec = require("@/../public/js/openapi.json")
    SwaggerUI({
      spec: spec,
      dom_id: "#swagger-ui",
    })

    document.querySelectorAll(".opblock-summary-path").forEach((el) => {
      var govno = el.querySelector(".nostyle").querySelector("span").innerHTML

      /*
                el.querySelector(".nostyle").querySelector("span").textContent = el.querySelector(".nostyle").querySelector("span").textContent.replace(
                  /\/v.\//g,
                  '/api.brb.lan$1'
                )
                */
      el.querySelector(".nostyle").querySelector("span").innerHTML =
        govno.replace(
          /\{(.+?)\}/g,
          '<span style="color:red">{</span><span style="color:green">$1</span><span style="color:red">}</span>'
        )
    })

    this.$nextTick(() => {
      this.$store.state.loaded.content = true
      this.emitter.emit("loaded", true)
    })
  },
  updated() {
    //console.log(this.items);
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

<style lang="scss">
.swagger-ui,
.swagger-ui > * {
  font-family: "Open Sans", "Arial";
}

.swagger-ui .info .title {
  font-family: "Open Sans", "Arial";
  color: var(--profile-text);
}

.swagger-ui a.nostyle {
  font-family: "Open Sans", "Arial";
  color: var(--profile-text);
}

.swagger-ui .opblock .opblock-section-header {
  background: inherit;
}

.swagger-ui .table-container {
  //padding: 0;
  //border: 1px dotted var(--foreground);
}

.parameters-col_name,
.parameters-col_description {
  border-bottom: 1px solid var(--foreground);
}

.swagger-ui .opblock .opblock-summary-description {
  color: var(--profile-text);
}

.swagger-ui .opblock-description-wrapper p,
.swagger-ui .opblock-external-docs-wrapper p,
.swagger-ui .opblock-title_normal p,
.swagger-ui .parameter__name,
:not(.col_header).response-col_status,
:not(.col_header).response-col_description {
  color: var(--profile-text);
}

.swagger-ui .parameter__type,
.swagger-ui .opblock .opblock-section-header h4 button .try-out__btn,
.col_header.response-col_status,
.col_header.response-col_description {
  color: var(--foreground);
}

.swagger-ui .opblock-description-wrapper {
  padding: 0;
}

tr[data-code="200"] {
  background-color: rgba(29, 129, 39, 0.07);
}

tr[data-code="400"] {
  background-color: rgba(39, 29, 129, 0.07);
}

tr[data-code="401"] {
  background-color: rgba(129, 129, 39, 0.07);
}

tr[data-code="404"] {
  background-color: rgba(129, 29, 39, 0.07);
}

tr[data-code="500"] {
  background-color: rgba(29, 29, 39, 0.07);
}

.response-col_links {
  display: none;
}

.swagger-ui .opblock-tag {
  padding: 10px 0 10px 0;
}

.swagger-ui .wrapper {
  margin: unset;
}

.swagger-ui .scheme-container {
  background-color: unset;
  box-shadow: unset;
}

.swagger-ui .btn {
  box-shadow: unset;
  border: 1px solid var(--foreground) !important;
  border-radius: 4px;
}

.swagger-ui .auth-wrapper {
  //display: inline;
}

.swagger-ui .auth-wrapper .authorize {
  //width: 100%;
}

.swagger-ui .btn.authorize span {
  float: unset;
}

.swagger-ui .response-controls,
.swagger-ui .opblock-section-request-body > .opblock-section-header {
  /* json */
  display: none;
}

.swagger-ui
  .response-col_description
  > .response-col_description__inner
  > .renderedMarkdown
  > p {
  margin: unset;
}

.swagger-ui .renderedMarkdown p {
  margin: unset;
}

.swagger-ui section.models .model-container {
  background: var(--block-bg);
}

.swagger-ui section.models .model-container:hover {
  background: var(--hover);
}

.swagger-ui .model-title {
  color: var(--placeholder);
}

.swagger-ui .inner-object .model {
  color: var(--placeholder);
}
</style>
