<template>
  <div class="mx-auto 2xl:container">
    <!-- header -->
    <Header />

    <!-- tabs start -->
    <div
      class="transition-all duration-1000 ease-in-out border border-gray-100 xl:p-4"
    >
      <div
        class="space-x-5 text-lg font-semibold border-b-2 border-gray-200 fx-i tetx-sec"
      >
        <button
          :class="currentTab == 'Inventory' ? 'active-tab' : 'inacive-tab'"
          class="flex items-center px-4 py-1.5 space-x-3 xl:px-8 xl:py-2"
          @click="(currentTab = 'Inventory'), (searchterm = '')"
        >
          <div class="">
            <img src="./../assets/inventory.svg" class="w-8" />
          </div>
          <div class="">Inventory</div>
        </button>
        <button
          :class="currentTab == 'orders' ? 'active-tab ' : 'inacive-tab'"
          class="flex items-center px-4 py-1.5 space-x-3 xl:py-2 xl:px-8"
          @click="(currentTab = 'orders'), (showOrdersofBookName = '')"
        >
          <div class=""><img src="./../assets/orders.png" class="w-8" /></div>
          <div class="flex items-center">
            Orders
            <span class="rounded-full fx-i-jc -right-4 -top-4">
              ({{ orderdetails?.orders?.length }})
            </span>
          </div>
        </button>
      </div>
      <!-- inventory -->
      <div class="" v-if="currentTab == 'Inventory'">
        <div class="mx-2 my-5 md:justify-between md:flex xl:my-10 xl:mx-4">
          <div class="items-center w-full max-w-xl md:flex">
            <div class="mr-12 text-2xl font-semibold text-left text-title">
              Books
            </div>
            <div class="relative justify-start w-full fx-i">
              <button class="absolute mx-4">
                <font-awesome-icon class="mr-2" icon="search" />
              </button>

              <input
                debounce="500"
                v-model="searchterm"
                class="w-full p-2 pl-10 text-black bg-gray-100 border rounded-md "
                type="search"
                placeholder=" search books by name"
                name="search"
              />
            </div>
          </div>

          <div class="">
            <button
              v-if="user?.roles[0] === 'ROLE_ADMIN'"
              @click="showaddbook()"
              class="px-4 py-2 m-2 text-white bg-gray-100 rounded-sm shadow blue"
            >
              <font-awesome-icon class="mr-2" icon="plus" /> Add New Book
            </button>
          </div>
        </div>

        <!-- book card -->
        <div v-if="Books.length" class="space-y-3">
          <div class="" v-for="(book, index) in Books" :key="index">
            <card
              @q="quantity($event)"
              @buy="buy($event)"
              @deleteBook="deleteBook($event)"
              :activeBookindex="activeBookindex"
              :showBuyquantity="showBuyquantity"
              :buyquantity="buyquantity"
              :book="book"
              :index="index"
              :user="user"
            />
          </div>
        </div>

        <div
          v-if="!Books.length & (currentTab == 'Inventory')"
          class="mx-auto my-40"
        >
          <div class="">
            <div class="">no books found with title {{ searchterm }} !</div>
            <button
              @click="(searchterm = ''), getbooks()"
              class="px-4 py-2 mt-4 text-white blue"
            >
              show all books
            </button>
          </div>
        </div>
      </div>
      <!--  -->

      <div v-if="currentTab == 'orders'" class="w-full mt-10 text-left">
        <div
          class="items-center px-2 mb-4 md:px-4 xl:space-x-8 xl:flex xl:px-0"
        >
          <div class="max-w-sm text-2xl font-semibold">
            Total orders: ({{ orderdetails?.orders?.length }})
          </div>

          <div v-if="user?.roles[0] === 'ROLE_ADMIN'" class="flex-grow">
            <select
              v-model="showOrdersofBookName"
              aria-placeholder="select"
              name="select"
              class="w-full max-w-2xl p-2 bg-white border border-gray-300 rounded-md "
            >
              <option value="" disabled>filter Order by Book Name</option>
              <option
                class="w-full"
                v-for="(book, index) in Books"
                :key="index"
                :value="book._id"
              >
                {{ book.title }}
              </option>
            </select>
            <button
              :class="showOrdersofBookName == '' ? ' hidden' : ' bg-red-500'"
              @click="showOrdersofBookName = ''"
              class="px-4 py-2 mt-4 ml-4 font-bold text-white xl:mt-0"
            >
              clear select filter
            </button>
          </div>
        </div>
        <div class="overflow-x-scroll xl:overscroll-none xl:overscroll-x-none">
          <table class="w-full border lg:table-fixed">
            <thead class="w-full">
              <tr class="text-center divide-x">
                <!-- <th class="w-4 ">S.No</th> -->
                <th class="w-1/6 p-4 mwt">Order Id</th>
                <th class="w-1/6 mwt">Buyer email</th>
                <th class="w-1/6 mwt">Book Name</th>
                <th class="w-1/6 mwt">Quantity</th>
                <th class="w-1/6 mwt-md">Order Date/Time</th>
                <th class="w-1/6 mwt">Total amount</th>
              </tr>
            </thead>

            <tbody v-if="filteredorderr.length" class="border">
              <tablerow
                v-for="(i, index) in filteredorderr"
                :key="index"
                :row="i"
                class="text-center divide-x"
              />
            </tbody>
          </table>
          <!-- <div v-if="!filteredorderr.length" class="space-y-4">
            <div  v-for="i in 15" :key="i"  class="flex justify-between w-full space-x-3">
              <div v-for="i in 6" :key="i" class="w-full p-4 bg-gray-200 animate-pulse" />
            </div>
          </div>
         -->
</div>
        <div
          v-if="!filteredorderr.length"
          class="w-full py-20 mx-auto text-center"
        >
          <div class="">no order found !</div>
          <button
            @click="currentTab = 'Inventory'"
            class="px-4 py-2 mt-4 text-white blue"
          >
            order books
          </button>
        </div>
      </div>
    </div>
    <!-- tabs end -->
    <!-- add book modal -->
    <modal id="modal" v-if="show" @close="show = false">
      <template #header>
        <div
          class="
            w-full
            2x:p-4
            p-2.5
            text-xl
            font-medium
            bg-white
            border-b border-gray-200
          "
        >
          Add New Book
        </div>
      </template>
      <template #body>
        <div class="w-full p-6 space-y-1 2xl:space-y-3">
          <div class="fx-col">
            <label>Title </label>
            <input
              v-focus
              v-model="book.title"
              class="p-2 border"
              type="text"
              placeholder="enter Title"
              name="Title"
            />
          </div>

          <div class="fx-col">
            <label>Author Name </label>
            <input
              v-model="book.author"
              class="p-2 border"
              type="text"
              placeholder="enter Author Name"
              name="Title"
            />
          </div>

          <div class="fx-col">
            <label>Description </label>

            <textarea
              v-model="book.description"
              class="w-full p-2 border"
              type="text-area "
              placeholder="enter Description"
              rows="4"
            />
          </div>
          <div class="grid-cols-2 gap-4 md:grid">
            <div class="fx-col">
              <label>Price </label>

              <input
                min="0"
                v-model="book.price"
                class="p-2 border"
                type="Number"
                placeholder="enter Author Name"
                name="Price"
              />
            </div>
            <div class="fx-col">
              <label>Quantity </label>

              <input
                min="0"
                v-model="book.quantity"
                class="p-2 border"
                type="Number"
                placeholder="enter Author Name"
                name="Price"
              />
            </div>
          </div>

          <imageupload @input="uploadedimg($event)" v-model="book.image" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end p-2 border-t border-gray-200">
          <button
            @click="addBook()"
            class="px-8 py-2 mr-4 text-white bg-gray-100 rounded-sm shadow blue"
          >
            save
          </button>
        </div></template
      >
    </modal>

    <!-- add confim cart modal -->

    <modal id="modal" v-if="showcartmodal" @close="showcartmodal = false">
      <template #header>
        <div
          class="w-full p-4 text-xl font-medium bg-white border-b border-gray-200 "
        >
          Cart
        </div>
      </template>
      <template #body>
        <div class="justify-between p-4 mt-8 md:items-center md:flex">
          <div class="cart-text">
            <div class="fsm-lg">Book name</div>
            <div class="">
              {{ Books[activeBookindex].title }}
            </div>
          </div>

          <div class="md:text-center md:space-x-10 md:items-center md:flex">
            <div class="cart-text">
              <div class="fsm-lg">Price * quantity</div>
              <div class="">
                {{ Books[activeBookindex].price }} * {{ buyquantity }}
              </div>
            </div>
            <div class="cart-text">
              <div class="fsm-lg">Total Amount</div>
              <div class="text-2xl font-semibold">
                {{ Books[activeBookindex].price * buyquantity }}
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 fx-col">
          <label class="mb-2">Billing email </label>

          <input
            min="0"
            v-focus
            v-model="billingemail"
            class="p-2 border"
            type="email"
            placeholder="enter billing  email"
            name="Price"
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end p-2 border-t border-gray-200">
          <button
            @click="buybook()"
            class="px-8 py-2 mr-4 text-white bg-gray-100 rounded-sm shadow blue"
          >
            confirm order
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import modal from "./../components/modal.vue";
import imageupload from "./../components/imageupload.vue";
import api from "./../services/api";
import { createToast } from "mosha-vue-toastify";
import card from "./../components/card.vue";
import tablerow from "./../components/tablerow.vue";
import Header from "../components/header.vue";
import "mosha-vue-toastify/dist/style.css";

const book = {
  title: "",
  image: "",
  author: "",
  description: "",
  price: "",
  quantity: "",
};

export default {
  components: {
    tablerow,
    modal,
    imageupload,
    card,
    Header,
  },
  data() {
    return {
      searchterm: "",
      billingemail: "",
      showBuyquantity: false,
      activeBookindex: 0,
      buyquantity: 0,
      showcartmodal: false,
      show: false,
      currentTab: "Inventory",
      showOrdersofBookName: "",
      img: null,
      book: JSON.parse(JSON.stringify(book)),
      Books: [],
      orderdetails: [],
    };
  },
  computed: {
    filteredorderr() {
      // console.log(this.orderdetails);
      if (this.showOrdersofBookName) {
        return this.orderdetails?.orders?.filter(
          (orders) => orders.book?._id == this.showOrdersofBookName
        );
      } else {
        return this.orderdetails?.orders?.filter(
          (orders) => orders.book?._id != null
        );
      }
    },

    user() {
      return this.$store.state.auth.user;
    },
    state() {
      return this.$store.state;
    },
  },

  watch: {
    currentTab(val) {
      if (val === "Inventory") {
        this.getbooks();
      } else if (val === "orders") {
        this.getorderdetails();
        this.getbooks();
      }
    },
    searchterm() {
      setTimeout(() => {
        this.getbooks(this.searchterm);
      }, 500);
    },
  },
  mounted() {
    this.getbooks();
    this.getorderdetails();
  },
  methods: {
    getorderdetails() {
      let role = this.user?.roles;

      if (role == "ROLE_ADMIN") {
        api.get("/users/admin/orders").then((res) => {
          this.orderdetails = res.data;
        });
      } else if (role == "ROLE_USER") {
        api.get("/users/orders/myorders").then((res) => {
          this.orderdetails = res.data;
        });
      }
    },

    buybook() {
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.billingemail)
      ) {
        api
          .post("/store/order", {
            book: this.Books[this.activeBookindex],
            quantity: this.buyquantity,
            amount: this.Books[this.activeBookindex].price * this.buyquantity,
            email: this.billingemail,
          })
          .then((data) => {
            this.getbooks();
            this.getorderdetails();
            this.showcartmodal = false;
            this.showBuyquantity = false;
            this.activeBookindex = null;
            this.buyquantity = 0;
            createToast(
              {
                title: "order created",
                description: data,
              },
              {
                type: "success",
                transition: "slide",
                showIcon: true,
                toastBackgroundColor: "green",
                hideProgressBar: true,
              }
            );
          })
          .catch((error) => {
            return error;
          });
      } else {
        createToast("invalid email", {
          type: "danger",
          transition: "slide",
          showIcon: true,
          toastBackgroundColor: "red",
          hideProgressBar: true,
        });
      }
    },

    buy(e) {
      if ((this.activeBookindex == e.index) & (this.buyquantity > 0)) {
        this.showcartmodal = true;
      } else {
        createToast(
          {
            title: "cart quantity",
            description: "add items to buy",
          },
          {
            hideProgressBar: true,
            transition: "slide",
            type: "default",
            showIcon: true,
          }
        );
      }
    },
    getbooks(val) {
      if (val) {
        this.searchterm !== null ||
          this.searchterm !== undefined ||
          this.searchterm !== "";
      }
      api
        .get(`/store/getbooks?${"title=" + val}`)
        .then((data) => {
          this.Books = data.data;
        })
        .catch((error) => {
          return error;
        });
    },
    quantity(e) {
      let role = this.user?.roles;

      if (role == "ROLE_ADMIN") {
        this.activeBookindex = e.index;
        if (e.intent == "dec") {
          if (this.Books[this.activeBookindex].quantity > 0) {
            this.increaseOrDecriseQuantity(e._id, e.intent);
          }
        } else {
          this.increaseOrDecriseQuantity(e._id, e.intent);
        }
      } else if (role == "ROLE_USER") {
        this.showBuyquantity = true;

        if (this.activeBookindex !== e.index) {
          this.buyquantity = 0;
        }
        this.activeBookindex = e.index;

        if (
          (e.intent == "inc") &
          (this.Books[this.activeBookindex].quantity > 0) &
          (this.Books[this.activeBookindex].quantity > this.buyquantity)
        ) {
          this.buyquantity = this.buyquantity + 1;
          createToast("count increase", {
            type: "success",
            transition: "zoom",
            showIcon: true,
            toastBackgroundColor: "green",
            hideProgressBar: true,
          });
        } else if ((e.intent == "dec") & (this.buyquantity > 0)) {
          this.buyquantity = this.buyquantity - 1;
          createToast("count decreased", {
            type: "success",
            transition: "zoom",
            showIcon: true,
            toastBackgroundColor: "green",
            hideProgressBar: true,
          });
        } else {
          createToast(
            {
              title: "quantity",
              description: "unable to increase or decrease",
            },
            {
              hideProgressBar: true,
              type: "warning",
            }
          );
        }
      }
    },
    increaseOrDecriseQuantity(_id, intent) {
      api
        .post(
          `/users/admin/books/quantity/${_id}/?role=${this.user?.roles[0]}&intent=${intent}`,
          {
            role: this.user?.roles,
          }
        )
        .then(() => {
          this.getbooks();
          createToast(
            {
              title: "Quantity",
              description: intent + "reased",
            },
            {
              hideProgressBar: true,
              type: "success",
              showIcon: true,
              transition: "zoom",
            }
          );
        })
        .catch((error) => {
          return error;
        });
    },

    deleteBook(_id) {

      console.log(_id)
      api
        .delete(`/users/admin/books/${_id._id}`)
        .then(() => {
          this.getbooks();
          createToast("book deleted", {
            hideProgressBar: true,
            type: "success",
            showIcon: true,
            transition: "zoom",
          });
        })
        .catch((error) => {
          return error;
        });
    },
    showaddbook() {
      this.show = true;
      this.book = JSON.parse(JSON.stringify(book));
    },
    addBook() {
      this.show = false;

      api
        .post("/users/admin/books", this.book)
        .then(() => {
          createToast(
            {
              title: "BOOK",
              description: "add book sucessfully",
            },
            {
              hideProgressBar: true,
              transition: "zoom",
              type: "success",
              showIcon: true,
            }
          );

          this.book = JSON.parse(JSON.stringify(book));
          this.getbooks();
        })

        .catch((error) => {
          this.book = JSON.parse(JSON.stringify(book));

          return error;
        });
    },

    uploadedimg(e) {
      this.book.image = e.url;
    },
  },
};
</script>
