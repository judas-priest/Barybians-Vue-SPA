<template>
  <div
    v-if="$store.state.modal.toggle"
    class="modal modal-backdrop"
    id="modal"
    @click.self="$store.state.modal.toggle = false"
    tabindex="0"
  >
    <div
      class="modal-dialog"
      :class="[
        ['cropper', 'cropper_register', 'image', 'video'].includes(
          this.$store.state.modal.settings.type
        ) && image.src !== ''
          ? 'modal-dialog-file'
          : '',
      ]"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ $store.state.modal.settings.title }}
          </h5>
          <CloseBtn
            class="modal-close"
            @click="$store.state.modal.toggle = false"
          />
        </div>
        <div class="modal-body">
          {{ $store.state.modal.settings.body }}
          <input
            v-if="$store.state.modal.settings.type === 'create_link'"
            v-model="ok"
            type="text"
            class="form-control"
            ref="text"
          />
          <Cropper
            v-if="
              ['cropper', 'cropper_register', 'image', 'video'].includes(
                this.$store.state.modal.settings.type
              )
            "
            class="setting-item"
            :src="image.src"
            :type="image.type"
            :name="image.name"
          />
          <img
            v-if="this.$store.state.modal.settings.type === 'photo'"
            id="photo__full"
            alt="profilePhotoPreview"
            :onerror="imageErrorAvatar"
            :src="this.$store.state.modal.settings.photo"
          />
        </div>

        <button
          v-if="
            ['cropper', 'cropper_register', 'image', 'video'].includes(
              this.$store.state.modal.settings.type
            )
          "
          type="button"
          id="file-browse"
        >
          <input
            type="file"
            class="form-control-file"
            @change="loadImage($event)"
            accept="image/*"
            ref="browse"
          />
        </button>
        <div class="modal-footer">
          <button
            v-if="$store.state.modal.settings.cancel"
            type="button"
            class="btn btn-danger"
            @click="emitter.emit(modalCancel, true)"
            data-modal="true"
          >
            {{ $store.state.modal.settings.cancel }}
          </button>
          <button
            v-if="$store.state.modal.settings.ok"
            type="button"
            class="btn btn-primary"
            @click="sendOk"
            data-modal="true"
            :disabled="
              ['cropper', 'cropper_register', 'image', 'video'].includes(
                this.$store.state.modal.settings.type
              ) &&
              (image.src == '' || image.src === null)
            "
          >
            {{ $store.state.modal.settings.ok }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#file-browse {
  background-color: var(--block-bg);
  color: var(--text);
}
</style>

<script>
import CloseBtn from "@/components/Buttons/Close.vue"
import Cropper from "@/components/Cropper.vue"
// @click.capture="$store.state.modal.toggle=false"

export default {
  data() {
    return {
      modalCancel: "",
      modalOk: "",
      ok: true,
      image: {
        src: "",
        type: "",
        name: "",
      },
    }
  },

  methods: {
    loadImage(event) {
      //this.image.src = null;
      // Reference to the DOM input element
      const { files } = event.target
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) URL.revokeObjectURL(this.image.src)
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0])

        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }

        // Create a new FileReader to read this image binary data
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.image = {
            // Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: () => {
              const byteArray = new Uint8Array(e.target.result).subarray(0, 4)
              let header = ""
              for (let i = 0; i < byteArray.length; i++) {
                header += byteArray[i].toString(16)
              }
              switch (header) {
                case "89504e47":
                  return "image/png"
                case "47494638":
                  return "image/gif"
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                  return "image/jpeg"
                default:
                  return files[0].type
              }
            },
            name: files[0].name,
          }
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0])
      }
    },
    reset() {
      this.image = {
        src: null,
        type: null,
        name: null,
      }
    },
    sendOk() {
      console.log(this.modalOk)
      console.log(this.ok)
      this.emitter.emit(this.modalOk, this.ok)
    },
    escapeHandler(e) {
      if (e.key === "Escape") this.$store.state.modal.toggle = false
    },
  },
  mounted() {
    console.log(this.$store.state.modal.settings.id)
    if (this.$store.state.modal.settings.type === "create_link") {
      this.ok = ""
      this.$refs.text.focus()
    }
    document.addEventListener("keydown", this.escapeHandler)
    this.modalCancel = `modal-cancel-${this.$store.state.modal.settings.type}${
      this.$store.state.modal.settings.id ?? ""
    }`
    this.modalOk = `modal-ok-${this.$store.state.modal.settings.type}${
      this.$store.state.modal.settings.id ?? ""
    }`

    if (
      ["cropper", "cropper_register", "image", "video"].includes(
        this.$store.state.modal.settings.type
      )
    )
      this.$refs.browse.click()
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.escapeHandler)
    this.$store.state.modal.settings = {
      id: "",
      type: "",
      title: "",
      body: "",
      ok: "",
      cancel: "",
    }
    if (this.image.src) URL.revokeObjectURL(this.image.src)
    console.log('unmounted modal!')
    
  },
  components: {
    CloseBtn,
    Cropper,
  },
}
</script>
