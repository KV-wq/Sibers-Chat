<script setup>
import { onBeforeUpdate, onMounted, ref } from "vue";
import ChatInput from "./ChatInput.vue";
import ChatOptions from "./ChatOptions.vue";
import Header from "./Header.vue";
import Message from "./Message.vue";

import { getDatabase, ref as databaseRef, onValue } from "firebase/database";

const defaultAvatarUrl =
  "https://www.seqan.de/assets/images/people/avatar_dummy.svg";

const props = defineProps({
  chatId: String,
  optionsIsView: Boolean,
  handleOptionsView: Function,
});

const messages = ref([]);
const fetchMessages = () => {
  const messagesRef = databaseRef(
    getDatabase(),
    `chats/${props.chatId}/messages`
  );

  onValue(messagesRef, (snapshot) => {
    const messagesData = snapshot.val();
    if (messagesData) {
      messages.value = Object.entries(messagesData).map(
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
    } else {
      messages.value = [];
    }
  });
};

onMounted(async () => {
  await fetchMessages();
});

setTimeout(() => {
  fetchMessages();
}, 2000);
onBeforeUpdate(() => {
  fetchMessages();
});
</script>

<template>
  <div class="w-4/5 h-[calc(100%-4rem)] mt-16 flex flex-col">
    <Header :handle-options-view="props.handleOptionsView" />
    <ChatOptions v-if="props.optionsIsView" :chat-id="props.chatId" />
    <div class="h-5/6 w-full flex flex-col overflow-auto">
      <div
        class="w-fit h-fit flex"
        v-for="message in messages"
        :key="message.id"
      >
        <img
          :src="
            message.user.avatarUrl ? message.user.avatarUrl : defaultAvatarUrl
          "
          alt="user"
          :title="message.user.displayName"
          class="w-14 h-14 rounded-full m-3 mr-0"
        />
        <Message class="max-w-[90%] w-fit h-fit" :text="message.text" />
      </div>
    </div>
    <div class="h-1/6 flex items-center justify-between relative">
      <ChatInput :chatId="props.chatId" />
    </div>
  </div>
</template>

<style scoped></style>
