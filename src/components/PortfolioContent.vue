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
    justify-content: center;
    align-items: center;
    grid-template-rows: repeat(1fr, 2);
  }

  .content {
    display: grid;
    grid-template-rows: repeat(1fr, 2);
    font-size: 15px;
    backdrop-filter: blur(15px);
    color: white;
    border-radius: 20px;
    padding: 1em 2em;
  }

  .technologies {
    margin-bottom: 2em;
  }
</style>

<script setup>

  import PortfolioBio from './PortfolioBio.vue';
  import ScrollAnimatedIcon from './ScrollAnimatedIcon.vue';
  import ContentProjects from './ContentProjects.vue';
  import ContentContributions from './ContentContributions.vue';
  import ContentTechnologies from './ContentTechnologies.vue';

</script>

<template>

  <main class='content-wrapper'>
    <PortfolioBio />

    <ScrollAnimatedIcon />

    <section class='content'>
      <article class='technologies'>
        <ContentTechnologies />
      </article>

      <article class='projects'>
        <ContentProjects />
      </article>

      <article class='contributions'>
        <ContentContributions />
      </article>

    </section>
  </main>
</template>