<script setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase";
import { getDatabase, ref as databaseRef, onValue } from "firebase/database";

const defaultImg =
  "https://i0.wp.com/yt3.googleusercontent.com/_zYxhcRZ2K6x355MF39yCYC1Zk_ZePI72zBgWEgQ1LQFXqKhgAPtFag_vRIxJENA99V3Uhn8=s900-c-k-c0x00ffffff-no-rj?ssl=1";
const props = defineProps({
  userId: String,
  deleteUser: Function,
  createdBy: String,
});
const userName = ref("");
const avatarUrl = ref("");
onMounted(async () => {
  const chatRef = await databaseRef(getDatabase(), `users/${props.userId}`);
  onValue(chatRef, (snapshot) => {
    const userData = snapshot.val();

    userName.value = userData.displayName;
    avatarUrl.value = userData.avatarUrl || defaultImg;
  });
});
</script>

<template>
  <div
    class="flex w-full rounded-lg border-2 border-purple-700 shadow-purple-500 hover:shadow-2xl max-[500px]:min-h-14 max-[500px]:h-14 min-h-18 h-18 hover:-translate-y-[1px] max-[500px]:hover:translate-y-0 max-[500px]:active:-translate-y-2 transition-all"
  >
    <img
      :src="avatarUrl"
      class="rounded-full w-12 h-12 my-2 ml-3 shadow-md max-[1000px]:mx-1 max-[500px]:my-1 max-[500px]:w-12 max-[500px]:h-12"
      alt="Chat_preview"
    />
    <div
      class="ml-3 my-auto overflow-hidden w-full max-[500px]:ml-0 flex justify-between"
    >
      <span
        class="whitespace-nowrap w-auto overflow-clip break-words text-ellipsis"
        >{{ userName }}</span
      >
      <button
        @click="deleteUser(props.userId)"
        v-if="
          auth.currentUser.uid === props.createdBy &&
          auth.currentUser.uid !== props.userId
        "
        class="mr-3 text-red-500 hover:scale-110 active:scale-90 transition-all bg-purple-900/50 py-0 px-2 rounded-full"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped></style>
