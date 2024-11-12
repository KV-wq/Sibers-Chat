<script setup>
const defaultImg =
  "https://i0.wp.com/yt3.googleusercontent.com/_zYxhcRZ2K6x355MF39yCYC1Zk_ZePI72zBgWEgQ1LQFXqKhgAPtFag_vRIxJENA99V3Uhn8=s900-c-k-c0x00ffffff-no-rj?ssl=1";
</script>

<template>
  <div
    class="flex w-full rounded-full mt-1 border-2 border-purple-700 shadow-purple-500 hover:shadow-2xl max-[500px]:min-h-14 max-[500px]:h-14 min-h-18 h-18 hover:-translate-y-[1px] max-[500px]:hover:translate-y-0 max-[500px]:active:-translate-y-2 transition-all"
  >
    <img
      :src="defaultImg"
      class="rounded-full w-10 h-10 my-1 ml-1 shadow-md max-[1000px]:mx-1 max-[500px]:my-1 max-[500px]:w-12 max-[500px]:h-12"
      alt="Chat_preview"
    />
    <div
      class="ml-3 my-auto overflow-hidden w-full max-[500px]:ml-0 flex justify-between"
    >
      <span
        class="whitespace-nowrap w-auto overflow-clip break-words text-ellipsis"
        >Username</span
      >
      <button
        class="mr-3 text-green-500 hover:scale-110 active:scale-90 transition-all bg-purple-900/50 py-0 px-2 rounded-full"
      >
        ✔
      </button>
    </div>
  </div>
</template>

<style scoped></style>
