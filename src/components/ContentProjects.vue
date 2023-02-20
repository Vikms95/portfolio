<style></style>

<script setup>
  import ProjectView from './ProjectView.vue';
  import { projects } from '../projectInfo';
</script>

<template>
  <h4 class='section-title text-glow'>Projects</h4>
  <article>
    <ProjectView v-for=' project  in projects' 
      :name=' project.name ' 
      :description=' project.description '
      :images=' project.images ' 
      :technologies=' project.technologies ' 
      :link=' project.link ' 
    />
  </article>
</template>