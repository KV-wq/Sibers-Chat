import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Auth from "./pages/Auth.vue";
import NotFound from "./pages/NotFound.vue";
import Chat from "./pages/Chat.vue";

const routes = [
  { path: "/", component: Auth },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  { path: "/chat", component: Chat },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
