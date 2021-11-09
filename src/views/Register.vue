<template>
  <div class="flex items-center justify-center 2xl:mt-40 mt-28">
    <authform
      :message="message"
      @clearmessage="clearmessage"
      @submit="signup($event)"
    ></authform>
  </div>
</template>

<script>
import authform from "../components/authform.vue";
import { createToast } from "mosha-vue-toastify";

import "mosha-vue-toastify/dist/style.css";
export default {
  components: { authform },
  name: "register",

  data() {
    return {
      loading: false,
      message: "",
    };
  },

  methods: {
    clearmessage() {
      this.message = "";
    },
    signup(user) {
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          createToast("user created ", {
            hideProgressBar: "true",
            type: "success",
            showIcon: "true",
            transition: "zoom",
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        },
        (error) => {
          createToast(error.response.data.message, {
            type: "info",
            transition: "bounce",
            showIcon: "true",
            toastBackgroundColor: "red",
          });
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style></style>
