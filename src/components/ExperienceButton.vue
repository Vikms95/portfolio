<script setup>
const { toggle, text } = defineProps(['toggle', 'text'])
</script>

<template>
  <button class="tablet:px-2 tablet:py-1" @click="toggle">
    {{ text }}
  </button>
</template>
