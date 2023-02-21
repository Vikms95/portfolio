<style scoped>
  .project-container {
    display: flex;
    margin: 0 0 200px;
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
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 20px;
    z-index: 1;
    color: red;
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

  .project-link-icons > img {
    height: 1.5em;
  }

  .project-description {
    max-width: 20em;
    /* min-height: 7em; */
    background-color: #112240;
    color: var(--light-slate);
    padding: 25px;
    border-radius: 5px;
    font-size: 18px;
    line-height: 1.3;
    letter-spacing: 1px;
    -webkit-font-smoothing: antialised;
  }

  .project-technologies {
    display: flex;
    justify-content: space-evenly;
    column-gap: 13px;
    align-items: center;
    margin: 20px 0 0;
    z-index: 1;
    color: #f57dff;
    font-size: 15px;
    font-weight: 900;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
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
  import ghIcon from '/social-icons/github-project-icon.png';
  import linkIcon from '/social-icons/external-link-icon.png';

  const props = defineProps( [
    'name',
    'description',
    'images',
    'technologies',
    'link'
  ] );
</script>
<!-- https://brittanychiang.com/ -->

<template>
  <section class='project-container'>
    <div class='project-content'>
      <div class='project-header'>
        <div class='project-name'>{{ props.name }}</div>
        <div class='project-link-icons'>
          <img :src=' ghIcon ' alt="">
          <img :src=' linkIcon ' alt="">
        </div>
      </div>
      <div class='project-description'>{{ props.description }}</div>
      <div class='project-technologies'>
        <span class='technology-name' v-for='                          techName                           in technologies'>
          {{ techName }}
        </span>
      </div>
      <img class='project-image' :src=' props.images ' :alt=' props.name '>
    </div>

    <a href=""></a>
  </section>
</template>