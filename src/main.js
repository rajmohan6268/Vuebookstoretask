import "./index.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./../store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
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

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
