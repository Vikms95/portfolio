<style scoped>

  canvas {
    width: 100%;
    height: 100%;
    background-color: black;
  }

</style>

<script setup>

   const props = defineProps( {
        id: String,
    } );

</script>


<template>

  <canvas v-bind:id='props.id'></canvas>

</template>


