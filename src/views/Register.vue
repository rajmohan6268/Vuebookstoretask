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
export default {
  components: { authform },
  name: "register",

  data() {
    return {
      loading: false,
      message: "",
    };
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // },
  },
  created() {
    // if (this.loggedIn) {
    //   this.$router.push("/loginn");
    // }
  },
  methods: {
    clearmessage() {
      this.message = "";
    },
    signup(user) {
    //  console.log({ user }, "signup");
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
      //    console.log(data, "registerd");

          this.message = data.message;

          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        },
        (error) => {
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
