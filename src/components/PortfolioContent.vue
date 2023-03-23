<style scoped>
.content-wrapper {
  position: absolute;
  top: 15em;
  left: 0;
  right: 0;
  margin-left: clamp(18em, 21vw, 20em);
  margin-right: auto;
  width: clamp(635px, 70vw, 1950px);
  text-align: left;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(1fr, 2);
  opacity: v-bind(opacity);
  transition: opacity 0.8s, visibility 0.5s linear;
}

.bio-button-container {
  display: flex;
  justify-content: center;
  column-gap: 2.5em;
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
import PortfolioBio from './PortfolioBio.vue'
import ScrollAnimatedIcon from './ScrollAnimatedIcon.vue'
import ContentProjects from './ContentProjects.vue'
import ContentContributions from './ContentContributions.vue'
import ContentTechnologies from './ContentTechnologies.vue'
import ExperienceButton from './ExperienceButton.vue'
import { onMounted, ref, computed, defineProps } from 'vue'

const { experience, toggleContent, toggleExperience, contentButtonText, experienceButtonText } = defineProps([
  'experience',
  'toggleContent',
  'toggleExperience',
  'contentButtonText',
  'experienceButtonText',
])

const isFirstLoad = ref(false)
const opacity = computed(() => (isFirstLoad.value ? 1 : 0))

onMounted(() =>
  setTimeout(() => {
    isFirstLoad.value = true
  }, 100)
)
</script>

<template>
  <main class="content-wrapper">
    <PortfolioBio />

    <div class="bio-button-container">
      <ExperienceButton v-if="experience.isEnabled" :toggle="toggleContent" :text="contentButtonText" />

      <ExperienceButton :toggle="toggleExperience" :text="experienceButtonText" />
    </div>

    <ScrollAnimatedIcon />

    <section class="content">
      <article class="technologies">
        <ContentTechnologies />
      </article>

      <article class="projects">
        <ContentProjects />
      </article>

      <article class="contributions">
        <ContentContributions />
      </article>
    </section>
  </main>
</template>
