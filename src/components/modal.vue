<template>
  <div @click="$emit('close')" class="">
    <transition name="modal">
      <div class="fixed top-0 left-0 z-50 w-full h-full modal-mask">
        <div class="modal-wrapper">
          <div
            @click.stop
            class="w-full max-w-lg p-5 m-auto transition-all bg-white rounded-lg shadow-md "
          >
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>

            <div class="m-2">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button
                  class="float-right modal-default-button"
                  @click="$emit('close')"
                >
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-mask {
  background-color: rgba(0, 0, 0, 0.027);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
