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
    opacity: v-bind( opacity );
    margin-left: v-bind( margin );
    transition: margin-left 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
  }

  .bio-button-container {
    display: flex;
    justify-content: center;
    column-gap: 5em;
    margin-bottom: 10em;
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
  import ExperienceButton from './ExperienceButton.vue';
  import { onMounted, ref, computed, defineProps } from 'vue';

  const {
    toggleContent,
    toggleExperience,
    contentButtonText,
    experienceButtonText,
  } = defineProps( [
    'toggleContent',
    'toggleExperience',
    'contentButtonText',
    'experienceButtonText',
  ] );

  const isLoaded = ref( false );
  const opacity = computed( () => isLoaded.value ? 1 : 0 );
  const margin = computed( () => isLoaded.value ? 'none' : '5em' );

  onMounted( () => setTimeout( () => isLoaded.value = true, 500 ) );

</script>

<template>

  <main class='content-wrapper'>
    <PortfolioBio />    

    <div class='bio-button-container'>
      <ExperienceButton 
        :toggle=' toggleContent '
        :text=' contentButtonText '
      />
      <ExperienceButton 
        :toggle=' toggleExperience '
        :text=' experienceButtonText '
      />
    </div>

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