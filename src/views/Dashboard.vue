<template>
  <div class="container mx-auto">
    <!-- <button @click="show = !show">toggle</button> -->

    <div class="p-4 mb-10 bg-gray-100 fx-i-jb text-title">
      <div class="text-2xl font-bold">Admin Dashboard</div>

      <button
        class="px-8 py-2 text-xl font-medium text-red-500 bg-white shadow-sm"
      >
        <font-awesome-icon class="mr-2" icon="sign-out-alt" /> logout
      </button>
    </div>

    <div
      class="p-4 transition-all duration-1000 ease-in-out border border-gray-100 "
    >
      <div
        class="space-x-5 text-lg font-semibold border-b-2 border-gray-200 fx-i tetx-sec"
      >
        <button
          :class="currentTab == 'Inventory' ? 'active-tab' : 'inacive-tab'"
          class="flex items-center px-8 py-2 space-x-3"
          @click="currentTab = 'Inventory'"
        >
          <div class="">
            <img src="./../assets/inventory.svg" class="w-8" />
          </div>
          <div class="">Inventory</div>
        </button>
        <button
          :class="currentTab == 'orders' ? 'active-tab ' : 'inacive-tab'"
          class="flex items-center px-8 py-2 space-x-3"
          @click="currentTab = 'orders'"
        >
          <div class=""><img src="./../assets/orders.png" class="w-8" /></div>
          <div class="">Orders</div>
        </button>
      </div>
      <!-- inventory -->
      <div class="" v-if="currentTab == 'Inventory'">
        <div class="flex justify-between mx-4 my-10">
          <div class="w-full max-w-xl fx-i">
            <div class="mr-12 text-2xl font-semibold text-title">Books</div>
            <div class="relative justify-start w-full fx-i">
              <button class="absolute mx-4">
                <font-awesome-icon class="mr-2" icon="search" />
              </button>

              <input
                @change="submitted = false"
                class="w-full p-2 pl-10 text-black bg-gray-100 border rounded-md "
                type="search"
                placeholder=" search books"
                name="search"
              />
            </div>
          </div>

          <div class="">
            <button
              @click="show = true"
              class="px-4 py-2 text-white bg-gray-100 rounded-sm shadow blue"
            >
              <font-awesome-icon class="mr-2" icon="plus" /> Add New Book
            </button>
          </div>
        </div>

        <!-- book card -->

        <div
          class="justify-between p-3 border border-gray-200 rounded-lg hover:shadow hover:border-gray-200 fx-i"
        >
          <div class="flex">
            <div class="">
              <img
                src="https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
                class="w-48 rounded-lg"
              />
            </div>

            <div class="flex flex-col justify-around ml-8 font-bold text-left">
              <div class="space-x-5 text-lg fx-i">
                <div class="">Book Title</div>
                <div class="text-sm font-medium">Author Name</div>
                <div class="">price</div>
              </div>

              <div class="">
                Description:
                <div class="h-10 max-w-3xl text-sm font-normal truncate">
                  Once login user/admin will be redirected to this screen. It
                  contains two tabs Inventory and orders. Has search option to
                  search across available books.Once login user/admin will be
                  redirected to this screen. It contains two tabs Inventory and
                  orders. Has search option to search across available books.
                </div>
              </div>
            </div>
          </div>

          <div class="space-x-3 fx-i">
            <div class="text-2xl font-medium">Available:</div>
            <div class="px-4 py-2 text-xl font-bold">10</div>
            <div class="space-x-3 text-xl fx-i">
              <button
                class="w-12 h-12 border rounded-full shadow hover:bg-green-50 hover:text-green-600"
              >
                <font-awesome-icon icon="plus" />
              </button>
              <button
                class="w-12 h-12 border rounded-full shadow hover:bg-red-50 hover:text-red-600"
              >
                <font-awesome-icon icon="minus" />
              </button>
            </div>
            <button class="px-6 text-red-400">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </div>
      <!--  -->
      <div v-if="currentTab == 'orders'" class="mt-10 text-left">
        <div class="mb-4 text-2xl font-semibold">Total orders: 20</div>
        <table class="w-full table-fixed">
          <thead class="w-full">
            <tr class="text-center divide-x">
              <th class="w-1/6 p-2">Order Id</th>
              <th class="w-1/6 p-2">Buyer email</th>
              <th class="w-1/6 p-2">Book Name</th>
              <th class="w-1/6 p-2">Quantity</th>
              <th class="w-1/6 p-2">Order Date/Time</th>
              <th class="w-1/6 p-2">Total amount</th>
            </tr>
          </thead>
          <tbody class="space-y-4">
            <tr v-for="i in 10" :key="i" class="divide-x">
              <td v-for="i in 6" :key="i" class="w-1/6 p-2">content {{ i }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal v-if="show" @close="show = false">
      <template #header>
        <div
          class="w-full p-4 text-xl font-medium bg-white border-b border-gray-200 "
        >
          Add New Book
        </div>
      </template>
      <template #body>
        <div class="w-full p-6 space-y-3">
          <div class="fx-col">
            <label>Title </label>
            <input
              class="p-2 border"
              type="text"
              placeholder="enter Title"
              name="Title"
              required
            />
          </div>

          <div class="fx-col">
            <label>Author Name </label>
            <input
              class="p-2 border"
              type="text"
              placeholder="enter Author Name"
              name="Title"
              required
            />
          </div>

          <div class="fx-col">
            <label>Description </label>

            <textarea
              class="w-full p-2 border"
              type="text-area "
              placeholder="enter Description"
              rows="4"
              required
            />
          </div>
          <div class="fx-col">
            <label>Price </label>

            <input
              class="p-2 border"
              type="text"
              placeholder="enter Author Name"
              name="Price"
              required
            />
          </div>
          <div class="fx-col">
            <label>image </label>

            <div
              class="relative flex flex-col items-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md "
            >
              <svg
                class="w-24 h-24 mx-auto text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              click here to upload file
              <input
                class="absolute block w-full h-full opacity-0"
                type="file"
                placeholder="upload mage"
                required
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end p-2 border-t border-gray-200">
          <button
            class="px-8 py-2 mr-4 text-white bg-gray-100 rounded-sm shadow blue"
          >
            save
          </button>
        </div></template
      >
    </modal>
    {{ state }}
  </div>
</template>
<script>
import modal from "./../components/modal.vue";

export default {
  components: {
    modal,
  },
  data() {
    return {
      show: false,
      currentTab: "orders",
    };
  },
  computed: {
    state() {
      return this.$store.state
    },
  },
};
</script>
