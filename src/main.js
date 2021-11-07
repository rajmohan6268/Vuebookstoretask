import "./index.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import setupInterceptors from "./services/setupInterceptors";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
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
  faPlus
);
setupInterceptors(store);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
