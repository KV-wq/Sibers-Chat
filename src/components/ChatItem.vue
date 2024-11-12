<script setup>
import { inject } from "vue";

const defaultImg =
  "https://i0.wp.com/yt3.googleusercontent.com/_zYxhcRZ2K6x355MF39yCYC1Zk_ZePI72zBgWEgQ1LQFXqKhgAPtFag_vRIxJENA99V3Uhn8=s900-c-k-c0x00ffffff-no-rj?ssl=1";
const props = defineProps({
  title: String,
  imgUrl: String,
  chatId: String,
});
const selectChat = inject("selectChat");
const select = () => {
  selectChat(props.chatId);
};
</script>

<template>
  <div
    @click="select"
    class="flex w-full rounded-lg border-2 border-purple-700 shadow-purple-500 hover:shadow-2xl max-[500px]:min-h-14 max-[500px]:h-14 min-h-24 h-24 hover:-translate-y-[1px] max-[500px]:hover:translate-y-0 max-[500px]:active:-translate-y-2 transition-all cursor-pointer"
  >
    <img
      :src="props.imgUrl ? props.imgUrl : defaultImg"
      class="rounded-full w-14 h-14 my-auto ml-3 shadow-md max-[1000px]:mx-auto max-[500px]:my-1 max-[500px]:w-12 max-[500px]:h-12"
      alt="Chat_preview"
    />
    <div class="ml-3 mt-3 overflow-hidden max-[1000px]:hidden">
      <span
        class="whitespace-nowrap w-[95%] overflow-clip break-words text-ellipsis"
        >{{ props.title }}</span
      >
      <p
        class="text-[.8rem] mt-3 whitespace-nowrap w-[95%] overflow-clip break-words text-ellipsis"
      >
        Последнее сообщение asdasdadsa
      </p>
    </div>
  </div>
</template>

<style scoped></style>
