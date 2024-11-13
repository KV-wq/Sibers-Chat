<script setup>
import Logout from "./Logout.vue";
defineProps({
  handleOptionsView: Function,
  isNewChat: Boolean,
});
</script>

<template>
  <div
    class="absolute flex justify-between items-center top-0 w-4/5 right-0 h-16 border-2 border-[#7E22CE]"
  >
    <img
      @click="handleOptionsView"
      src="/settings.png"
      class="w-12 ml-2 cursor-pointer transition hover:scale-105 active:scale-95 hover:rotate-12 active:rotate-0"
      alt="Details.."
    />
    <div
      v-if="isNewChat"
      class="absolute left-16 max-[500px]:text-sm max-[500px]:max-w-24 text-wrap"
    >
      🢠 Configure your chat
    </div>
    <Logout class="" />
  </div>
</template>

<style scoped></style>
