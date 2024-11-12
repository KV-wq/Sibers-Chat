<script setup>
import { onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase";
import ChatList from "../components/ChatList.vue";
import NoneChats from "../components/NoneChats.vue";
import ChatRoom from "../components/ChatRoom.vue";
import { getDatabase, ref as databaseRef, onValue } from "firebase/database";

const router = useRouter();
const isLoading = ref(true);
const chats = ref({});
const selectedChatId = ref();

const optionsIsView = ref(false);

const handleOptionsView = () => {
  optionsIsView.value = !optionsIsView.value;
};

onMounted(async () => {
  const chatsRef = await databaseRef(getDatabase(), "chats");
  onValue(chatsRef, (snapshot) => {
    chats.value = snapshot.val() || null;
    selectedChatId.value = Object.keys(chats.value)[0]; // by default, the first chat is selected
  });
});

const selectChat = (chatId) => {
  selectedChatId.value = chatId;
};
provide("selectChat", selectChat);

onMounted(() => {
  if (auth.currentUser) {
    isLoading.value = false;
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        isLoading.value = false;
      } else {
        router.push("/"); // Redirect to login page if user is not authenticated
      }
    });
  }
});
</script>

<template>
  <div class="h-screen w-screen flex items-center">
    <div
      class="mx-auto border-4 border-[#7c3eb7] rounded-xl w-5/6 h-5/6 max-[500px]:w-full max-[500px]:h-full relative"
    >
      <img src="/loader.svg" class="w-full h-full" v-if="isLoading" />
      <div v-else class="flex h-full w-full relative">
        <div
          v-if="optionsIsView"
          class="w-1/5 h-full border-r-4 border-[#7c3eb7] absolute bg-black/40"
        ></div>
        <ChatList class="w-1/5 h-full border-r-4 border-[#7c3eb7]" />

        <NoneChats v-if="!chats" />
        <ChatRoom
          v-else
          :chatId="selectedChatId"
          :handleOptionsView="handleOptionsView"
          :optionsIsView="optionsIsView"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
