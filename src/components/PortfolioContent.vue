<style scoped>
    .content-wrapper {
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

    .content {
      background-color: aquamarine;
    }
  </style>

<script setup>

  import ContentBio from './ContentBio.vue';
  import ContentProjects from './ContentProjects.vue';
  import ContentContributions from './ContentContributions.vue';

</script>

<template>

  <main class='content-wrapper'>
    <ContentBio />

    <section class='content'>
      <article class='projects'>
        <ContentProjects />
      </article>

      <article class='contributions'>
        <ContentContributions />
      </article>

    </section>
  </main>
</template>