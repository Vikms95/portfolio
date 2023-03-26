<script setup>
import ProjectView from './ProjectView.vue'
import { projectsData } from '../projectData'
import ProjectInvertedView from './ProjectInvertedView.vue'
</script>

<template>
  <article>
    <h4 class="section-title text-glow">Projects</h4>
    <div>
      <template v-for="(project, index) in projectsData">
        <ProjectView v-if="index % 2 == 0" :project="project" />
        <ProjectInvertedView v-else :project="project" />
      </template>
    </div>
  </article>
</template>
