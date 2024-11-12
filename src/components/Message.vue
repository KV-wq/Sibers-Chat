<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <p
    class="text-wrap whitespace-normal w-auto h-auto px-4 py-2 m-3 bg-gradient-to-r from-purple-900 to-purple-800 text-base rounded-2xl overflow-auto"
  >
    {{ text }}
  </p>
</template>

<style scoped></style>
