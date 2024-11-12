<script setup>
import { onBeforeUpdate, onMounted, ref, watch } from "vue";
import UserList from "./UserList.vue";
import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
} from "firebase/database";

const props = defineProps({
  chatId: String,
});
const chatName = ref("");
const imageUrl = ref("");
let chatRef;

onMounted(() => {
  chatRef = databaseRef(getDatabase(), `chats/${props.chatId}`);
  onValue(chatRef, (snapshot) => {
    const chatData = snapshot.val();
    if (chatData) {
      chatName.value = chatData.name;
      if (chatData.imageUrl) {
        imageUrl.value = chatData.imageUrl;
      }
      // users.value = chatData.users;
    }
  });
});

watch(chatName, async () => {
  const chatRef = await databaseRef(getDatabase(), `chats/${props.chatId}`);
  update(chatRef, { name: chatName.value });
});
watch(imageUrl, async () => {
  const chatRef = await databaseRef(getDatabase(), `chats/${props.chatId}`);
  update(chatRef, { imageUrl: imageUrl.value });
});
</script>

<template>
  <div
    class="absolute w-4/5 h-[calc(100%-4rem)] flex items-center justify-center bg-black/50 z-10"
  >
    <div
      class="border-4 border-[#7E22CE] w-4/5 h-4/5 bg-[#282C34] p-3 flex flex-col"
    >
      <input
        v-model="chatName"
        class="text-2xl text-center bg-transparent border-none outline-none h-8"
      />
      <input
        v-model="imageUrl"
        placeholder="Chat image url.."
        class="text-sm text-center bg-transparent border-none outline-none h-8 text-slate-300"
      />
      <span class="text-xl">Users:</span>
      <UserList :chat-id="props.chatId" class="h-5/6 mt-2" />
    </div>
  </div>
</template>

<style scoped></style>
