<template>
  <div class="mx-auto overflow-hidden 2xl:container">

    <div class="items-center justify-between p-2 mb-4 bg-gray-100 lg:p-4 md:p-3 2xl:mb-10 md:flex text-title">
      <div class="text-lg font-bold text-left lg:text-2xl">
        {{ user?.roles[0] === "ROLE_USER" ? "User" : "Admin" }}
        Dashboard
      </div>

      <div class="flex items-center justify-between max-w-sm lg:max-w-none">
        <div class="fx-i">
          <img
            src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
            class="w-8 xl:w-12"
          /> <div class="mx-2 xl:mx-4">{{ user?.username }}</div>
        </div>
       
        <button
          @click="logOut()"
          class="px-2 py-1 text-xl font-medium text-red-500 bg-white shadow-sm xl:py-2 xl:px-8"
        >
          <font-awesome-icon class="mr-1 xl:mr-2" icon="sign-out-alt" /> logout
        </button>
      </div>
    </div>

    <div
      class="transition-all duration-1000 ease-in-out border border-gray-100 xl:p-4 "
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
            <div class="mr-12 text-2xl font-semibold text-left text-title">Books</div>
            <div class="relative justify-start w-full fx-i">
              <button class="absolute mx-4">
                <font-awesome-icon class="mr-2" icon="search" />
              </button>

              <input
                debounce="1000"
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
          <div
            v-for="(book, index) in Books"
            :key="index"
            class="items-center p-3 border border-gray-200 rounded-lg lg:justify-between hover:shadow hover:border-gray-200 lg:flex"
          >
            <div class="md:flex">
              <div class="flex-shrink-0 w-40">
                <!-- :src="https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg" -->

                <img :src="book.image" class="w-48 rounded-lg" />
              </div>

              <div
                class="flex-col justify-around w-full ml-2 font-bold text-left md:flex md:ml-8"
              >
                <div class="items-center text-lg md:flex md:space-x-5">
                  <div class="truncate md:max-w-md">
                    Book Title:{{ book.title }}
                  </div>
                  <div class="text-sm font-medium">
                    Author : {{ book.author }}
                  </div>
                  <div class=""> <span class="text-green-500">price : </span>{{ book.price }}</div>
                </div>

                <div class="">
                  Description:
                  <div class="max-w-3xl text-sm font-normal truncate md:h-10">
                    {{ book.description }}
                  </div>
                </div>
              </div>
            </div>

            <div class="justify-between max-w-sm md:space-x-3 fx-i md:max-w-none md:justify-start">
              <div class="text-xl font-medium md:text-2xl">Available:</div>
              <div class="px-4 py-2 text-xl font-bold">{{ book.quantity }}</div>
              <div class="space-x-3 text-xl fx-i">
                <button
                  @click="quantity(book._id, 'inc', index)"
                  class="btn-q hover:bg-green-50 hover:text-green-600"
                >
                  <font-awesome-icon icon="plus" />
                </button>
                <button
                  @click="quantity(book._id, 'dec', index)"
                  class="btn-q hover:bg-red-50 hover:text-red-600"
                >
                  <font-awesome-icon icon="minus" />
                </button>
              </div>
              <button
                v-if="user?.roles[0] === 'ROLE_USER'"
                @click="buy(book._id, index)"
                class="ml-2 text-white md:px-6 px-4 py-1.5 md:py-2 md:ml-0"
                :class="
                  (activeBookindex === index) & (showBuyquantity > 0)
                    ? 'blue '
                    : 'bg-gray-500 hover:bg-gray-700'
                "
              >
                <font-awesome-icon icon="shopping-cart" />
                buy
                <span
                  class=""
                  v-if="showBuyquantity & (activeBookindex === index)"
                >
                  {{ buyquantity }}
                </span>
              </button>
              <button
                v-if="user?.roles[0] === 'ROLE_ADMIN'"
                @click="deleteBook(book._id)"
                class="px-6 text-red-400"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
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
        <div class="items-center px-2 mb-4 md:px-4 xl:space-x-8 xl:flex xl:px-0">
          <div class="max-w-sm text-2xl font-semibold">
            Total orders: ({{ orderdetails?.orders?.length }})
          </div>

          <div v-if="user?.roles[0] === 'ROLE_ADMIN'" class="flex-grow">
            <!-- <input  v-model="showOrdersofBookName"
              class="w-full max-w-md p-2 border border-gray-300 "
              list="browsers"
              placeholder="select book"
              name="browser"
              id="browser"
            />
            <datalist id="browsers">
                  <option  class="text-black"  v-for="(book, index) in Books"
            :key="index" :value="book.title" >{{book.title}}</option>

            </datalist> -->
            <!-- {{filteredorderr}} -->
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
        <div class="overflow-x-scroll overscroll-none">
   <table class="w-full border lg:table-fixed ">
          <thead class="w-full">
            <tr class="text-center divide-x">
              <!-- <th class="w-4 ">S.No</th> -->
              <th class="w-1/6 p-4 mwt">Order Id</th>
              <th class="w-1/6 mwt">Buyer email</th>
              <th class="w-1/6 mwt">Book Name</th>
              <th class="w-1/6 mwt">Quantity</th>
              <th class="w-1/6 mwt-md">Order Date/Time</th>
              <th class="w-1/6 mwt" >Total amount</th>
            </tr>
          </thead>

          <tbody v-if="filteredorderr.length" class="border">
            <tr
              v-for="(i, index) in filteredorderr"
              :key="index"
              class="text-center divide-x"
            >
              <!-- <th class="w-4">{{index+1}}</th> -->
              <td class="w-1/6 p-4 text-left truncate">{{ i._id || "--" }}</td>
              <td class="w-1/6 truncate">{{ i.email || "" }}</td>
              <td class="w-1/6 truncate">
                <span v-if="i.book">{{ i.book.title }}</span>
                <span v-highlight="'red '" v-else> book deleted </span>
              </td>

              <td class="w-1/6 truncate">{{ i.quantity || "--" }}</td>
              <td v-changedateformat="" class="w-1/6 truncate">
                {{ i.createdAt || "--" }}

                <!-- {{ i.createdAt.substr(0, 10) || "--" }} -->
              </td>

              <td class="w-1/6 truncate">{{ i.amount || "--" }}</td>
            </tr>
          </tbody>
        </table>
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
<!-- 
          <div class="xl:hidden fx-col">
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
              />
            </div>
          </div>
          {{ img }} -->
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

    <modal id="modal" v-if="showcartmodal" @close="showcartmodal = false">
      <template #header>
        <div
          class="w-full p-4 text-xl font-medium bg-white border-b border-gray-200 "
        >
          Cart
        </div>
      </template>
      <template #body>
        <div class="justify-between p-4 mt-8 md:items-center md:flex ">
          <div class="cart-text">
            <div class="fsm-lg">Book name </div>
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
              <div class=" fsm-lg">Total Amount</div>
              <div class="text-2xl font-semibold">
                {{ Books[activeBookindex].price * buyquantity }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="w-full p-6 my-3">
        
        </div> -->

        <div class="p-4 fx-col">
          <label class="mb-2">Billing email </label>

          <input
            min="0"
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

    {{ img }}
  </div>
</template>
<script>
import modal from "./../components/modal.vue";
import imageupload from "./../components/imageupload.vue";
import api from "./../services/api";

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
    modal,
    imageupload,
  },
  data() {
    return {
      searchterm: "",
      billingemail: "",
      showBuyquantity: false,
      activeBookindex: null,
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
      }, 800);
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
          .then(() => {
            this.getbooks();
            this.getorderdetails();
            this.showcartmodal = false;
            this.showBuyquantity = false;
            this.activeBookindex = null;
            this.buyquantity = 0;
          })
          .catch((error) => {
            return error;
          });
      } else {
        window.alert("invalid email");
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },

    buy(id, index) {
      if (this.activeBookindex == index) {
        this.showcartmodal = true;
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
    quantity(_id, intent, index) {
      let role = this.user?.roles;

      if (role == "ROLE_ADMIN") {
        this.activeBookindex = index;
        if (intent == "dec") {
          if (this.Books[this.activeBookindex].quantity > 0) {
            this.increaseOrDecriseQuantity(_id, intent);
          }
        } else {
          this.increaseOrDecriseQuantity(_id, intent);
        }
      } else if (role == "ROLE_USER") {
        this.showBuyquantity = true;

        if (this.activeBookindex !== index) {
          this.buyquantity = 0;
        }
        this.activeBookindex = index;

        if (
          (intent == "inc") &
          (this.Books[this.activeBookindex].quantity > 0)
        ) {
          this.buyquantity = this.buyquantity + 1;
        } else if (this.buyquantity > 0) {
          this.buyquantity = this.buyquantity - 1;
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
        })
        .catch((error) => {
          return error;
        });
    },

    deleteBook(_id) {
      api
        .delete(`/users/admin/books/${_id}`)
        .then(() => {
          this.getbooks();
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
      api
        .post("/users/admin/books", this.book)
        .then(() => {
          this.show = false;
          this.book = JSON.parse(JSON.stringify(book));
          this.getbooks();
        })

        .catch((error) => {
          return error;
        });
    },

    uploadedimg(e) {
      this.book.image = e.url;
    },
  },
};
</script>
