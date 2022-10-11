import { createApp } from "vue";
import App from "./App.vue";
import FriendContactComponent from "./components/FriendContact.vue";
import FriendNewComponent from "./components/NewFriend.vue";

createApp(App)
  .component("friend-contact", FriendContactComponent)
  .component("new-friend", FriendNewComponent)
  .mount("#app");
