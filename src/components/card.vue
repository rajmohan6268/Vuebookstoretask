<template>
  <div
    class="items-center p-3 border border-gray-200 rounded-lg lg:justify-between hover:shadow hover:border-gray-200 lg:flex"
  >
    <div class="md:flex">
      <div class="flex-shrink-0 w-40">
        <img :src="book.image" class="rounded-lg " />
      </div>

      <div
        class="flex-col justify-around w-full ml-2 font-bold text-left md:flex md:ml-8"
      >
        <div class="items-center text-lg md:flex md:space-x-5">
          <div class="truncate md:max-w-md">Book Title:{{ book.title }}</div>
          <div class="text-sm font-medium">Author : {{ book.author }}</div>
          <div class="">
            <span class="text-green-500">price : </span>{{ book.price }}
          </div>
        </div>

        <div class="">
          Description:
          <div class="max-w-3xl text-sm font-normal truncate md:h-10">
            {{ book.description }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="justify-between max-w-sm md:space-x-3 fx-i md:max-w-none md:justify-start"
    >
      <div class="text-xl font-medium md:text-2xl">Available:</div>
      <div class="px-4 py-2 text-xl font-bold">{{ book.quantity }}</div>
      <div class="space-x-3 text-xl fx-i">
        <button
          @click="
            this.$emit('q', {
              _id: book._id,
              intent: 'inc',
              index: index,
            })
          "
          class="btn-q hover:bg-green-50 hover:text-green-600"
        >
          <font-awesome-icon icon="plus" />
        </button>
        <button
          @click="
            this.$emit('q', {
              _id: book._id,
              intent: 'dec',
              index: index,
            })
          "
          class="btn-q hover:bg-red-50 hover:text-red-600"
        >
          <font-awesome-icon icon="minus" />
        </button>
      </div>
      <button
        v-if="user?.roles[0] === 'ROLE_USER'"
        @click="this.$emit('buy', { _id: book._id, index: index })"
        class="ml-2 text-white md:px-6 px-4 py-1.5 md:py-2 md:ml-0"
        :class="
          (activeBookindex === index) & (showBuyquantity > 0)
            ? 'blue '
            : 'bg-gray-500 hover:bg-gray-700'
        "
      >
        <font-awesome-icon icon="shopping-cart" />
        buy
        <span class="" v-if="showBuyquantity & (activeBookindex === index)">
          {{ buyquantity }}
        </span>
      </button>
      <button
        v-if="user?.roles[0] === 'ROLE_ADMIN'"
        @click="$emit('deleteBook', { _id: book._id })"
        class="px-6 text-red-400"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    activeBookindex: {
      type: Number,
      required: true,
    },
    showBuyquantity: {
      type: Boolean,
      required: true,
    },
    buyquantity: {
      type: Number,
      required: true,
    },
  },
};
</script>
