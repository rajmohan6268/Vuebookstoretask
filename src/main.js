
import './index.css'
import router from "./router";
import { createApp } from 'vue'
import  App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPhone,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);
library.add(faEye);
library.add(faEyeSlash);
library.add(faPhone);

createApp(App).use(router)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')