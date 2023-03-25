<style scoped>
.content-wrapper {
  position: absolute;
  left: 50%;
  top: 120em;
  transform: translate(-50%, -110em);
  width: clamp(310px, 60vw, 1050px);

  display: grid;
  justify-content: center;
  align-items: center;
  text-align: left;

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
import { useWindowSize } from '@vueuse/core'
import PortfolioBio from './PortfolioBio.vue'
import ScrollAnimatedIcon from './ScrollAnimatedIcon.vue'
import ContentProjects from './ContentProjects.vue'
import ContentContributions from './ContentContributions.vue'
import ContentTechnologies from './ContentTechnologies.vue'
import ExperienceButton from './ExperienceButton.vue'
import HorizontalSocialBar from './HorizontalSocialBar.vue'
import { onMounted, ref, computed } from 'vue'

const {
  experience,
  toggleContent,
  toggleExperience,
  contentButtonText,
  experienceButtonText,
} = defineProps([
  'experience',
  'toggleContent',
  'toggleExperience',
  'contentButtonText',
  'experienceButtonText',
])

const isFirstLoad = ref(false)
const opacity = computed(() => (isFirstLoad.value ? 1 : 0))
const { width } = useWindowSize()

onMounted(() =>
  setTimeout(() => {
    isFirstLoad.value = true
  }, 100)
)
</script>

<template>
  <Teleport to="body">
    <main class="content-wrapper">
      <PortfolioBio />

      <div
        class="flex justify-center gap-x-10 mb-40 tablet:flex-col tablet:gap-y-6 tablet:mb-20 tablet:items-center"
      >
        <ExperienceButton
          v-if="experience.isEnabled"
          :toggle="toggleContent"
          :text="contentButtonText"
        />

        <ExperienceButton
          :toggle="toggleExperience"
          :text="experienceButtonText"
        />
      </div>

      <ScrollAnimatedIcon v-if="width >= 786" />
      <HorizontalSocialBar v-else />

      <section
        class="backdrop-blur-lg grid text-base text-white rounded-lg px-8 py-4 tablet:px-6 tablet:py-2"
      >
        <article class="technologies">
          <ContentTechnologies />
        </article>

        <!-- <article class="projects">
          <ContentProjects />
        </article> -->

        <!-- 
        <article class="contributions">
          <ContentContributions />
        </article> -->
      </section>
    </main>
  </Teleport>
</template>
