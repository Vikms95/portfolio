<script setup>
    import { ref } from 'vue';
    import ThreeCanvas from './ThreeCanvas.vue';

    defineProps( {
        msg: String,
    } );

    const count = ref( 0 )
</script>

<template>
    <ThreeCanvas />
</template>

