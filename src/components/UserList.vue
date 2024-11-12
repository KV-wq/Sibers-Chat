<script setup>
import UserItem from "./UserItem.vue";
import UserItem2 from "./UserItem2.vue";
import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
} from "firebase/database";
import { onBeforeUpdate, onMounted, ref, watch } from "vue";

const props = defineProps({
  chatId: String,
});

const users = ref([]);
onMounted(async () => {
  const chatRef = await databaseRef(getDatabase(), `chats/${props.chatId}`);
  onValue(chatRef, (snapshot) => {
    const chatData = snapshot.val();
    if (chatData) {
      users.value = chatData.users;
    }
  });
});
</script>

<template>
  <div class="flex flex-col max-h overflow-auto">
    <UserItem v-for="(user, id) in users" :key="id" :avatar="user.imageUrl" />

    <input
      placeholder="Add user.."
      class="w-full mt-1 py-1 h-auto rounded-3xl border-2 border-[#7E22CE] bg-transparent text-lg focus:outline-none focus:border-[3px] focus:border-purple-700 pl-3"
    />
    <UserItem2 />
  </div>
</template>

<style scoped></style>
