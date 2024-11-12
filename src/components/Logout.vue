<script setup>
import { useRouter } from "vue-router";
import authFunctions from "../firebase";
const router = useRouter();
const onClickLogout = async () => {
  await authFunctions.logout();
  router.replace("/");
};
</script>

<template>
  <button
    @click="onClickLogout"
    class="inline-flex items-center justify-center p-0.5 my-auto me-2 overflow-hidden transition-all active:scale-90 text-sm font-medium rounded-3xl group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 text-white"
  >
    <span
      class="px-3 py-1.5 transition-all ease-in duration-200 bg-[#282C34] rounded-3xl group-hover:bg-opacity-0"
    >
      Logout
    </span>
  </button>
</template>

<style scoped></style>
