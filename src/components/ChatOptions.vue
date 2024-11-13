<script setup>
import { inject, onMounted, ref, watch } from "vue";
import UserList from "./UserList.vue";
import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
  remove,
} from "firebase/database";
import { auth } from "../firebase";

const props = defineProps({
  chatId: String,
  handleOptionsView: Function,
});
const chatName = ref("");
const imageUrl = ref("");
const createdBy = ref("");

onMounted(() => {
  const chatRef = databaseRef(getDatabase(), `chats/${props.chatId}`);
  onValue(chatRef, (snapshot) => {
    const chatData = snapshot.val();
    if (chatData) {
      chatName.value = chatData.name;
      createdBy.value = chatData.createdBy;
      if (chatData.imageUrl) {
        imageUrl.value = chatData.imageUrl;
      }
      // users.value = chatData.users;
    }
  });
});
const defaultChat = inject("defaultSelectedChat");
const removeChat = async () => {
  const chatRef = await databaseRef(getDatabase(), `chats/${props.chatId}`);
  try {
    await remove(chatRef);
    props.handleOptionsView();

    defaultChat();
  } catch (error) {
    console.error(error);
  }
};

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
      class="border-4 border-[#7E22CE] w-4/5 h-4/5 bg-[#282C34] p-3 flex flex-col relative"
    >
      <button
        v-if="auth.currentUser.uid === createdBy"
        @click="removeChat"
        class="right-0 bottom-2 absolute inline-flex items-center justify-center p-0.5 my-auto me-2 overflow-hidden transition-all active:scale-90 text-sm font-medium rounded-3xl group bg-gradient-to-br from-red-700 to-pink-500 group-hover:from-red-700 group-hover:to-pink-500 text-white"
      >
        <span
          class="px-3 py-1.5 transition-all ease-in text-[.75rem] duration-200 bg-[#282C34] rounded-3xl group-hover:bg-opacity-0"
        >
          Delete chat
        </span>
      </button>
      <input
        v-model="chatName"
        class="text-2xl text-center bg-transparent border-none outline-none h-8"
      />
      <input
        v-model="imageUrl"
        placeholder="Enter image url.."
        class="text-sm text-center bg-transparent border-none outline-none h-8 text-slate-300"
      />
      <span class="text-xl">Users:</span>
      <UserList :chat-id="props.chatId" class="h-5/6 mt-2" />
    </div>
  </div>
</template>

<style scoped></style>
