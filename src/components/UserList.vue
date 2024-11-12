<script setup>
import UserItem from "./UserItem.vue";
import UserItem2 from "./UserItem2.vue";
import {
  getDatabase,
  ref as databaseRef,
  onValue,
  update,
} from "firebase/database";
import { onMounted, ref } from "vue";

const props = defineProps({
  chatId: String,
});
const matchingUsers = ref([]);
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
const searchUsers = (searchQuery) => {
  return new Promise((resolve, reject) => {
    const usersRef = databaseRef(getDatabase(), "users");
    onValue(usersRef, (snapshot) => {
      const Users = snapshot.val();

      for (const userId in Users) {
        const user = Users[userId];
        if (
          user.displayName &&
          user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !users.value.includes(user.id)
        ) {
          matchingUsers.value = [];
          matchingUsers.value.push({ id: userId, ...user });
          console.log(matchingUsers.value);
        }
      }
      resolve(matchingUsers.value);
    });
    if (userInput.value.length == 0) matchingUsers.value = [];
  });
};
const addUserToChat = async (userId) => {
  const chatRef = databaseRef(getDatabase(), `chats/${props.chatId}`);
  await update(chatRef, {
    users: {
      ...users.value,
      [users.value.length]: userId,
    },
  });

  matchingUsers.value = [];
  userInput.value = "";
};
const removeUserFromChat = async (userId) => {
  const chatRef = databaseRef(getDatabase(), `chats/${props.chatId}`);
  await update(chatRef, {
    users: {
      ...users.value.filter((user) => user !== userId),
    },
  });
  matchingUsers.value = [];
  userInput.value = "";
};

const userInput = ref("");
</script>

<template>
  <div class="flex flex-col max-h overflow-auto">
    <UserItem
      v-for="(user, id) in users"
      :key="id"
      :userId="user"
      :deleteUser="removeUserFromChat"
    />

    <input
      @input="searchUsers(userInput)"
      v-model="userInput"
      placeholder="Add user.."
      class="w-full mt-1 py-1 h-auto rounded-3xl border-2 border-[#7E22CE] bg-transparent text-lg focus:outline-none focus:border-[3px] focus:border-purple-700 pl-3"
    />
    <UserItem2
      v-for="user in matchingUsers"
      :key="user.id"
      :name="user.displayName"
      :imageUrl="user.avatarUrl"
      :userId="user.id"
      :add-user="addUserToChat"
    />
  </div>
</template>

<style scoped></style>
