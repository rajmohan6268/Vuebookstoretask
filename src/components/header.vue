<template>
  <div
    class="items-center justify-between p-2 mb-4 bg-gray-100 lg:p-4 md:p-3 2xl:mb-10 md:flex text-title"
  >
    <div class="text-lg font-bold text-left lg:text-2xl">
      {{ user?.roles[0] === "ROLE_USER" ? "User" : "Admin" }}
      Dashboard
    </div>

    <div class="flex items-center justify-between max-w-sm lg:max-w-none">
      <div class="fx-i">
        <img
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          class="w-8 xl:w-12"
        />
        <div class="mx-2 xl:mx-4">{{ user?.username }}</div>
      </div>

      <button
        @click="logOut()"
        class="px-2 py-1 text-xl font-medium text-red-500 bg-white shadow-sm xl:py-2 xl:px-8"
      >
        <font-awesome-icon class="mr-1 xl:mr-2" icon="sign-out-alt" /> logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
     computed: {
    user() {
      return this.$store.state.auth.user;
    },
     },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
