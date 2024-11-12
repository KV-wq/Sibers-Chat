<script setup>
import { ref } from "vue";
import ChatInput from "./ChatInput.vue";
import ChatOptions from "./ChatOptions.vue";
import Header from "./Header.vue";
import Message from "./Message.vue";

defineProps({
  chatId: String,
  optionsIsView: Boolean,
  handleOptionsView: Function,
});
</script>

<template>
  <div class="w-4/5 h-[calc(100%-4rem)] mt-16 flex flex-col">
    <Header :handle-options-view="handleOptionsView" />
    <ChatOptions v-if="optionsIsView" :chat-id="chatId" />
    <div class="h-5/6 w-full">
      <Message class="max-w-[70%] w-fit" />
    </div>
    <div class="h-1/6 flex items-center justify-between relative">
      <ChatInput />
    </div>
  </div>
</template>

<style scoped></style>
