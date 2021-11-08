<template>
<div class="">
    <div class="flex justify-center w-full my-3 space-x-4 text-lg font-semibold md:my-5 2xl:my-10">
    <router-link to="/"> Home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/Register">Register</router-link>
    <router-link to="/Dashboard">Dashboard</router-link>
  </div>
  <router-view />

</div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  name: "App",
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
