<style scoped>
  .logo {
    position: absolute;
    top: 10px;
    /* left: 20px; */
    z-index: 2;
    height: 6em;
  }
</style>

<script setup>
  import logo from '/social-icons/logo.png';

</script>

<template>
  <img class='logo' :src=' logo ' />

</template>