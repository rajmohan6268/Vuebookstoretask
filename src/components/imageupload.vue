<template>
  <div
    class="relative flex flex-col items-center p-1 mt-1 border-2 border-gray-300 border-dashed rounded-md "
  >
    <div v-if="!previewUrl">
      <svg
        class="w-24 h-24 mx-auto text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      click here to upload file or drag and drop
    </div>
    <img
      class="max-w-xs mx-auto text-gray-400 preview"
      style="max-width: 180px"
      v-if="previewUrl"
      :src="previewUrl"
      alt=""
    />

    <input
      type="file"
      ref="fileInput"
      accept="image/png, image/gif, image/jpeg, image/jpg"
      @change="onFilePicked"
      @input="updateValue($event.target.value)"
      class="absolute block w-full h-full opacity-0"
      placeholder="upload mage"
      required
    />
  </div>
  <div v-if="fileName" class="">file Name: {{ fileName }}</div>
  <button
    v-if="previewUrl"
    class="flex justify-end px-2 py-1 text-white bg-red-500 floar"
    @click.stop="clear()"
  >
    clear image
  </button>
</template>
<script>
import { createToast } from "mosha-vue-toastify";

export default {
  data: () => ({
    fileName: "",
    previewUrl: "",
    url: "",
  }),
  methods: {
    clear() {
      this.fileName = "";
      this.previewUrl = "";
      this.url = "";

      this.$emit("input", {
        url: null,
      });
    },
    onFilePicked(event) {
      const files = event.target.files;
      console.log(files[0].type, "  /files/  ");

      let isimg = files[0].type.includes("image");

      if (isimg) {
        if (files[0] !== undefined) {
          this.fileName = files[0].name;
          this.previewUrl = URL.createObjectURL(files[0]);

          if (this.fileName.lastIndexOf(".") <= 0) {
            return;
          }

          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            this.url = fr.result;
            this.$emit("input", {
              url: this.url,
            });
          });
        } else {
          this.fileName = "";
          this.fileObject = null;
          this.url = "";
        }
      } else {
        createToast("invalid image  format", {
          type: "danger",
          transition: "slide",
          showIcon: true,
          toastBackgroundColor: "red",
          hideProgressBar: true,
        });
      }
    },
  },
};
</script>
<style scoped>
.preview {
  max-height: 100px;
}
</style>
