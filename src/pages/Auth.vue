<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import authFunctions, { auth } from "../firebase";

const router = useRouter();
const param = ref("login"); // registration or login parameter

const avatarUrl = ref("");
const email = ref("");
const password = ref("");
const username = ref("");
const userIsAuthName = ref("");

const isLoading = ref(true);

onMounted(() => {
  if (auth.currentUser) {
    isLoading.value = false;
  } else {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        isLoading.value = false;
      } else {
        router.replace("/chat");
      }
    });
  }
});

watch(userIsAuthName, (newValue) => {
  if (newValue !== undefined) {
    router.push("/chat");
  }
});

const handleRegister = async () => {
  try {
    userIsAuthName.value = await authFunctions.registerUser(
      avatarUrl.value,
      username.value,
      email.value,
      password.value
    );
  } catch (e) {
    console.error(e);
  }
};
const handleLogin = async () => {
  try {
    userIsAuthName.value = await authFunctions.loginUser(
      email.value,
      password.value
    );
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center text-center">
    <div class="w-full h-1/2 bg-white shadow-md" v-if="isLoading">
      <img src="/loader.svg" class="w-full h-full" />
    </div>
    <div
      v-else
      class="w-full h-auto bg-white shadow-md text-slate-800 py-10 px-8 flex flex-col items-center"
    >
      <div>
        <h1
          class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Welcome!
        </h1>
        <p class="mt-4 text-xl">Login or register in to use the chat</p>
      </div>
      <div class="flex mt-4 gap-5">
        <button
          @click="() => (param = 'login')"
          class="px-12 max-[500px]:px-8 py-1 rounded-xl border-2 border-purple-500 hover:border-purple-800 transition"
          :class="
            param == 'login'
              ? 'bg-[#2b2f35] text-white border-[3px]'
              : 'bg-white'
          "
        >
          Login
        </button>
        <button
          @click="() => (param = 'register')"
          class="px-12 max-[500px]:px-8 py-1 rounded-xl border-2 border-purple-500 hover:border-purple-800 transition"
          :class="
            param == 'register'
              ? 'bg-[#2c2f36] text-white border-[3px]'
              : 'bg-white'
          "
        >
          Register
        </button>
      </div>
      <div class="mt-4 max-w-[500px]">
        <form @submit.prevent="handleLogin" v-if="param == 'login'">
          <input
            v-model="email"
            required
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input
            v-model="password"
            required
            type="password"
            placeholder="Password"
            class="w-full mt-4 px-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            class="w-full mt-4 px-4 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-800 transition active:scale-95"
          >
            Login
          </button>
        </form>
        <form @submit.prevent="handleRegister" v-if="param == 'register'">
          <input
            required
            v-model="avatarUrl"
            type="url"
            placeholder="Avatar URL"
            class="w-full px-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input
            required
            v-model="username"
            :minlength="4"
            type="text"
            placeholder="Username"
            class="w-full mt-4 px-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input
            v-model="email"
            required
            type="email"
            placeholder="Email"
            class="w-full px-4 mt-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />
          <input
            v-model="password"
            required
            :minlength="6"
            type="password"
            placeholder="Password"
            class="w-full mt-4 px-4 py-2 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            class="w-full mt-4 px-2 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-800 transition active:scale-95"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
