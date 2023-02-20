<style scoped>
  .project-container {
    display: flex;
    margin: 0 0 100px;
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
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px;
    z-index: 1;
    color: red;
  }

  .project-description {
    max-width: 20em;
    min-height: 7em;
    background-color: #112240;
    padding: 25px;
    border-radius: 5px;
    font-size: 15px;
  }

  .project-technologies {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0 0;
    z-index: 1;
    color: red;
  }

  .project-image {
    position: absolute;
    left: 300px;
    top: -30px;
    display: flex;
    height: 20em;
    z-index: -1;
    border-radius: 5px;
  }
</style>

<script setup>
  const props = defineProps([
    'name',
    'description',
    'images',
    'technologies',
    'link'
  ]);
</script>
<!-- https://brittanychiang.com/ -->

<template>
  <section class='project-container'>
    <div class='project-content'>
      <div class='project-header'>
        <div style="font-size: 25px">{{ props.name }}</div>
        <div class='project-link-icons'>Github Page</div>
      </div>
      <div class='project-description'>{{ props.description }}</div>
      <div class='project-technologies'>
        <span class='technology-name' v-for='            techName             in technologies'>
          {{ techName }}
        </span>
      </div>
      <img class='project-image' :src=' props.images ' :alt=' props.name '>
    </div>

    <a href=""></a>
  </section>
</template>