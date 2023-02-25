<style scoped></style>

<script setup>

  const { toggle, text } = defineProps( [ 'toggle', 'text' ] );

</script>

<template>

  <button @click=' toggle '> 
    {{ text }}
  </button>

</template>