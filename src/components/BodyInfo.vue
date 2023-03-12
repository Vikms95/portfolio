<style scoped>
  .info-container {
    display: block;
    position: absolute;
    top: 50px;
    left: 1200px;
    background-color: #112240;
    opacity: v-bind( opacity );
    transition: opacity 0.5s, visibility 0.5s ease-in-out;
    min-width: 15em;
    min-height: 35em;
    padding: 1.5em;
    border-radius: 5px;
  }

  .body-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .name {
    display: flex;
    justify-content: flex-start;
  }

  .title {
    font-weight: 900;
    font-size: 15px;
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
    <h2 class='name'>{{ name }}</h2>
    <article class='body-details'>
      <div class='detail' v-for='          detail           in details'>
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