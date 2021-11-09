<template>
  <div class="flex items-center justify-center mt-28 2xl:mt-40">
    <authform
      :message="message"
      @clearmessage="clearmessage"
      @submit="login($event)"
    ></authform>
  </div>
</template>

<script>
import authform from "../components/authform.vue";
import { createToast } from "mosha-vue-toastify";

import "mosha-vue-toastify/dist/style.css";
export default {
  components: { authform },
  name: "login",
  data() {
    return {
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    clearmessage() {
      this.message = "";
    },
    login(user) {
      console.log({ user });
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;

          createToast(error.response.data.message, {
            type: "info",
            transition: "bounce",
            showIcon: "true",
            toastBackgroundColor: "red",
          });

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
