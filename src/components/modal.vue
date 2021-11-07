<template>
  <div @click="$emit('close')" class="">
    <transition name="modal">
      <div
        class="fixed top-0 left-0 z-50 w-full h-full transition-all duration-1000 ease-in-out delay-1000 modal-mask"
      >
        <div class="text-left modal-wrapper">
          <div
            @click.stop
            class="w-full max-w-2xl p-2 m-auto bg-white rounded-lg shadow-md"
          >
            <div class="relative ">
              <button @click="$emit('close')" class="absolute right-4 top-4">
                <font-awesome-icon class="w-10" icon="times" />
              </button>
              <slot name="header"> default header </slot>
            </div>

            <div class="my-1 overflow-y-scroll body">
              <slot name="body"> default body </slot>
            </div>

            <div class="">
              <slot name="footer">
                default footer
                <button class="float-right" @click="$emit('close')">OK</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>



<style scoped>
.modal-mask {
  background-color: rgba(0, 0, 0, 0.253);
  display: table;
  transition: opacity 0.3s ease;
}
.body {
    max-height: 700;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
