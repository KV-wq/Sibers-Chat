<script setup>
import {
  getDatabase,
  ref as databaseRef,
  push,
  update,
} from "firebase/database";
import { ref } from "vue";
import { auth } from "../firebase";
const props = defineProps({
  chatId: String,
});
const newMessage = ref("");
const sendMessage = async () => {
  //Create a new message
  if (newMessage.value.trim() !== "") {
    const chatRef = databaseRef(
      getDatabase(),
      `chats/${props.chatId}/messages`
    );
    const newMessageRef = push(chatRef);
    await update(newMessageRef, {
      text: newMessage.value,
      userId: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName,
      userAvatarUrl: auth.currentUser.photoURL,
    });
    newMessage.value = "";
  }
};
</script>

<template>
  <form
    @submit.prevent="sendMessage"
    class="flex relative w-full h-full items-center"
  >
    <input
      v-model="newMessage"
      placeholder="Your message.."
      type="text"
      class="w-full mx-4 h-3/5 rounded-3xl border-2 border-[#7E22CE] bg-transparent text-lg focus:outline-none focus:border-[3px] focus:border-purple-700 pl-3"
    />
    <button
      type="submit"
      class="absolute w-8 active:scale-90 cursor-pointer transition right-8"
    >
      <img src="/send.png" alt="Send message" />
    </button>
  </form>
</template>

<style scoped></style>
