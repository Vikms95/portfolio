<style>
    .content {
      background-color: rgba(128, 128, 128, 0.065);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 2em 4em;
      position: absolute;
      top: 10em;
      left: 15vw;
      width: 105ch;
      text-align: left;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }
  </style>

<script setup>

  import ContentBio from './ContentBio.vue';
  import ContentProjects from './ContentProjects.vue';
  import ContentContributions from './ContentContributions.vue';

</script>

<template>
  <main class='content'>
    <ContentBio />
    <ContentProjects />
    <ContentContributions />
  </main>
</template>