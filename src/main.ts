import { createApp } from "vue"
import App from "./App.vue"
import Overlay from "./Overlay.vue"

import "./style.css"

const isOverlay = new URLSearchParams(window.location.search).has("overlay")
if (isOverlay) {
  document.documentElement.classList.add("overlay-mode")
}

createApp(isOverlay ? Overlay : App)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*")
  })
