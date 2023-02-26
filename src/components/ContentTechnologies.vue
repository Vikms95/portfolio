<style scoped>
  .tech-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 4em;
    column-gap: 1.75em;
    list-style: none;
  }

  .tech-icon {
    height: 4.5em;
  }
</style>

<script setup>

  import icons from './_export';

</script>

<template>

  <h4 class='section-title text-glow'>
    Technologies
  </h4>

  <ul class='tech-list'>
    <li v-for=' (    item, index    ) in icons'>
      <img class='tech-icon' :src=' item ' :alt=' index ' />
    </li>
  </ul>

</template>