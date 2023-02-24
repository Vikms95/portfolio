<style></style>

<script setup>
  import ProjectView from './ProjectView.vue';
  import { projects } from '../projectInfo';
  import ProjectInvertedView from './ProjectInvertedView.vue';
</script>

<template>
  <h4 class='section-title text-glow'>
    Projects
  </h4>

  <article>
        
    <template v-for=' (     project, index     )  in projects' >
      <ProjectView  v-if=' index % 2 == 0 '
        :project=' project '
      />
      <ProjectInvertedView v-else 
        :project=' project '
      />
  </template>

  </article>
</template>