<script setup>
import { onBeforeUpdate, onMounted, ref } from "vue";
import ChatInput from "./ChatInput.vue";
import ChatOptions from "./ChatOptions.vue";
import Header from "./Header.vue";
import Message from "./Message.vue";

import { getDatabase, ref as databaseRef, onValue } from "firebase/database";
import { auth } from "../firebase";

const defaultAvatarUrl =
  "https://www.seqan.de/assets/images/people/avatar_dummy.svg";

const props = defineProps({
  chatId: String,
  optionsIsView: Boolean,
  handleOptionsView: Function,
});

const messages = ref([]);
const isNewChat = ref(false);
const fetchMessages = () => {
  const messagesRef = databaseRef(
    getDatabase(),
    `chats/${props.chatId}/messages`
  );

  onValue(messagesRef, (snapshot) => {
    const messagesData = snapshot.val();
    if (messagesData) {
      messages.value = Object.entries(messagesData).map(
        //receiving all chat messages
        ([messageId, messageData]) => ({
          id: messageId,
          text: messageData.text,
          user: {
            id: messageData.userId,
            displayName: messageData.userDisplayName,
            avatarUrl: messageData.userAvatarUrl,
          },
        })
      );
      isNewChat.value = false;
    } else {
      messages.value = [];
      isNewChat.value = true;
    }
  });
};
const scrollChat = () => {
  const chatContainer = document.querySelector(".scrolling");
  chatContainer.scrollTop = chatContainer.scrollHeight; // scroll the chat down during initialization
  chatContainer.style.scrollBehavior = "smooth";
};

onMounted(async () => {
  await fetchMessages();
  scrollChat();
});

setTimeout(() => {
  fetchMessages();
  scrollChat();
}, 2000);
onBeforeUpdate(() => {
  fetchMessages();
});
</script>

<template>
  <div class="w-4/5 h-[calc(100%-4rem)] mt-16 flex flex-col">
    <Header
      :handle-options-view="props.handleOptionsView"
      :isNewChat="isNewChat"
    />
    <ChatOptions
      v-if="props.optionsIsView"
      :chat-id="props.chatId"
      :handle-options-view="props.handleOptionsView"
    />
    <div class="h-5/6 w-full overflow-auto scrolling">
      <div
        class="w-full h-fit flex"
        :class="auth.currentUser.uid == message.user.id ? 'justify-end' : ''"
        v-for="message in messages"
        :key="message.id"
      >
        <Message
          class="max-w-[85%] w-fit h-fit mr-1 text-end"
          :text="message.text"
          v-if="auth.currentUser.uid === message.user.id"
        />
        <img
          :src="
            message.user.avatarUrl ? message.user.avatarUrl : defaultAvatarUrl
          "
          alt="user"
          :title="message.user.displayName"
          class="w-14 h-14 rounded-full m-2 mr-0"
          :class="auth.currentUser.uid === message.user.id ? 'mr-4' : ''"
        />
        <Message
          class="max-w-[90%] w-fit h-fit"
          :text="message.text"
          v-if="auth.currentUser.uid !== message.user.id"
        />
      </div>
    </div>
    <div class="h-1/6 flex items-center justify-between relative">
      <ChatInput :chatId="props.chatId" />
    </div>
  </div>
</template>

<style scoped></style>
