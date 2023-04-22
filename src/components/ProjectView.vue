<style scoped>
.project-container {
  display: flex;
  margin: 0 0 200px;
  @apply desktop:-ml-40;
  @apply tablet:ml-0 tablet:mb-80;
  @apply tablet:-scroll-mb-64;
}

.project-content {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  z-index: 2;
}

.project-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 20px;
  z-index: 1;
  color: red;
  @apply tablet:justify-center;
}

.project-name {
  color: white;
  font-size: 25px;
  font-weight: 900;
}

.project-link-icons {
  display: flex;
  column-gap: 15px;
  margin: 0 20px;
}

.project-link-icons > a > img {
  height: 1.5em;
}

.project-link-icons > img:hover {
  outline: solid 2px blue;
}

.project-description {
  max-width: 20em;
  background-color: #112240;
  color: var(--light-slate);
  padding: 25px;
  border-radius: 5px;
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialised;
}

.project-technologies {
  display: flex;
  justify-content: center;
  column-gap: 15px;
  align-items: center;
  margin: 20px 0 0;
  z-index: 1;
}

.project-image {
  max-width: none;
  position: absolute;
  left: 300px;
  top: -30px;
  display: flex;
  height: 20em;
  z-index: -1;
  border-radius: 5px;
  @apply desktop:h-64 desktop:-ml-10;
  @apply tablet:-ml-0 tablet:-left-[38px] tablet:top-64 tablet:h-44;
  @apply mobile:top-72 mobile:h-36 tablet:ml-10;
}
</style>

<script setup>
import ghIcon from '/social-icons/github-project-icon.png'
import linkIcon from '/social-icons/external-link-icon.png'
import { useWindowSize } from '@vueuse/core'

const { project } = defineProps(['project'])
const { width } = useWindowSize()

const { name, description, images, technologies, githubLink, projectLink } =
  project
</script>
<!-- https://brittanychiang.com/ -->

<template>
  <section class="project-container">
    <div class="project-content">
      <div class="project-header">
        <div class="flex flex-row tablet-min:mr-16 tablet:pb-4">
          <div class="project-name">{{ name }}</div>
          <div class="project-link-icons">
            <a target="_blank" :href="githubLink">
              <img :src="ghIcon" alt="gh" />
            </a>
            <a target="_blank" :href="projectLink">
              <img :src="linkIcon" alt="link" />
            </a>
          </div>
        </div>

        <div v-if="width <= 640" class="flex gap-x-6">
          <span class="technology-icon" v-for="techIcon in technologies">
            <img class="h-8" :src="techIcon" alt="tech-icon" />
          </span>
        </div>
      </div>

      <div class="project-description mobile:-mb-[150px]">
        {{ description }}
      </div>
      <div class="project-technologies">
        <span
          class="technology-icon tablet:hidden"
          v-for="techIcon in technologies"
        >
          <img class="h-8" :src="techIcon" alt="tech-icon" />
        </span>
      </div>
      <img class="project-image" :src="images" :alt="name" />
    </div>

    <a href=""></a>
  </section>
</template>
