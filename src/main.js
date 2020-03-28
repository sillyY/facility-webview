import Vue from "vue";
import App from "./App.vue";
import {
  Tabs,
  TabPane,
  Card,
  Button,
  Popover,
  Upload,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import { event } from "./services";

Vue.config.productionTip = false;

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Upload);

// event.listen();

new Vue({
  render: h => h(App)
}).$mount("#app");
