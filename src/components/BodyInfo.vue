<style scoped>
  .info-container {
    display: block;
    position: absolute;
    top: 50px;
    left: 1100px;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: v-bind( opacity );
    transition: opacity 0.5s, visibility 0.5s ease-in-out;
    min-width: 20em;
    min-height: 35em;
    padding: 1.5em;
    border-radius: 5px;
  }

  .body-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2em;

  }

  .name {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
    font-size: 30px;
  }

  .title {
    font-weight: 900;
    font-size: 15px;
    text-decoration: underline;
  }

  .value {
    font-style: italic;
  }
</style>

<script setup>
  import { getSelectedBodyName, getSelectedBodyDetails } from '../utils-3D';
  import { computed, defineProps } from 'vue';

  const { selectedBody } = defineProps( [ 'selectedBody' ] );
  const name = getSelectedBodyName( selectedBody );
  const details = getSelectedBodyDetails( selectedBody );

  const opacity = computed( () => selectedBody !== null ? 1 : 0 );

</script>

<template>
  <aside class='info-container'>
    <h1 class='name'>{{ name }}</h1>
    <article class='body-details'>
      <div class='detail' v-for='                detail                 in details'>
        <div class='title'>
          {{ detail.title }}
        </div>
        <div class='value'>
          {{ detail.value }}
        </div>
      </div>
    </article>
  </aside>
</template>