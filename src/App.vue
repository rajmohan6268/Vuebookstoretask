<template>
  <div class="flex justify-center w-full space-x-4 text-lg font-semibold">
    <router-link to="/"> Home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/Register">Register</router-link>
    <router-link to="/Dashboard">Dashboard</router-link>
  </div>

  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
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
