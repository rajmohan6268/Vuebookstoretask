<template>
  <div class="">
    Dashboard
    <button @click="show = !show">toggle</button>

    <div class="flex items-center justify-between">
      <div class="">Admin Dashboard</div>

      <div class="">logout</div>
    </div>

    <!-- 
    <modal v-if="show" @close="show = false">
      <template #header>custom header</template>
      <template #body>custom body</template>
      <template #footer>custom footer</template>
    </modal> -->
  </div>
</template>
<script>
// import modal from "./../components/modal.vue";
export default {
  components: {
    // modal,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
