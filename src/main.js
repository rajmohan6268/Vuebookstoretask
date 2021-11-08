import "./index.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import setupInterceptors from "./services/setupInterceptors";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faHome,
  faAd,
  faSignOutAlt,
  faSearch,
  faPlus,
  faTimes,
  faTimesCircle,
  faMinus,
  faPhone,
  faEye,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faPhone,
  faSignOutAlt,
  faSearch,
  faTimes,
  faTimesCircle,
  faMinus,
  faEye,
  faEyeSlash,
  faPhone,
  faTrash,
  faAd,
  faPlus,
  faShoppingCart
);
setupInterceptors(store);
const app = createApp(App);

app.use(store);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

app.directive("changedateformat", {
  mounted(el, binding) {
    console.log(binding.value);
    el.innerHTML = new Date(el.innerText).toLocaleString();
  },
});

app.directive("highlight", {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value ? binding.value : "#fff";
    el.style.padding = "5px";
    el.style.color = "#fff";
  },
});



// app.mixin({
//   methods: {
//     debounce(func, delay=300) {
//       let debounceTimer;
//       return function() {
//       console.log("debouncing call..");
//         const context = this;
//         const args = arguments;
//         clearTimeout(debounceTimer);
//         debounceTimer = setTimeout(() => func.apply(context, args), delay);
//        console.log("..done");
//       };
//     }
//   }
// })
