<script setup>
import ChatItem from "./ChatItem.vue";
import { onMounted, ref } from "vue";
import {
  getDatabase,
  ref as databaseRef,
  onValue,
  set,
  push,
} from "firebase/database";
import { auth } from "../firebase";

const props = defineProps({
  chatId: String,
});

const chats = ref({});

onMounted(async () => {
  const chatsRef = await databaseRef(getDatabase(), "chats");

  onValue(chatsRef, (snapshot) => {
    chats.value = snapshot.val() || [];
    chats.value = Object.entries(chats.value).reduce(
      (filteredChats, [chatId, chat]) => {
        if (chat["users"].some((userId) => userId == auth.currentUser.uid)) {
          filteredChats[chatId] = chat;
        }
        return filteredChats;
      },
      {}
    );
  });
});

const createChat = async () => {
  const newChatRef = push(databaseRef(getDatabase(), "chats"));
  await set(newChatRef, {
    name: "My chat",
    createdBy: auth.currentUser.uid,
    users: [auth.currentUser.uid],
  });
};
</script>

<template>
  <div class="flex flex-col max-h overflow-auto">
    <ChatItem
      v-for="(chat, chatId) in chats"
      :key="chatId"
      :chat-id="chatId"
      :title="chat.name"
      :selected-chat-id="props.chatId"
      :img-url="chat.imageUrl"
      :last-message="
        chat.messages
          ? chat.messages[
              Object.keys(chat.messages)[Object.keys(chat.messages).length - 1]
            ].text
          : ' '
      "
    />
    <button
      @click="createChat"
      class="mt-1 py-1 mb-3 shadow-violet-500 rounded-lg shadow-md hover:shadow-lg active:scale-95 hover:shadow-violet-500 transition-all"
    >
      New chat
    </button>
  </div>
</template>

<style scoped></style>
