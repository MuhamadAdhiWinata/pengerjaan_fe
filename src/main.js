import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);

app.config.warnHandler = (msg, instance, trace) => {
  if (
    msg.includes("Extraneous non-emits event listeners") ||
    msg.includes("Extraneous non-props attributes")
  ) {
    return; // skip warning ini
  }

  // warning lain tetap ditampilkan
  console.warn(msg, trace);
};

app.use(pinia);
app.use(router);
app.mount("#app");
