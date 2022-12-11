<script setup>
   const props = defineProps( {
        id: String,
    } );

</script>

<template>
  <canvas v-bind:id='props.id' ></canvas>
</template>

