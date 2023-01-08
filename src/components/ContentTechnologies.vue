<style scoped>
  .tech-list {
    display: flex;
    flex-direction: row;
    column-gap: 1em;
    list-style: none;
  }

  .tech-icon {
    height: 4.5em;

  }

</style>

<script setup>

  import { ref } from 'vue';
  import git from '/tech-icons/git-original.svg';
  import bootstrap from '/tech-icons/bootstrap-original.svg';
  import mongo from '/tech-icons/mongodb-original.svg';
  import node from '/tech-icons/nodejs-original.svg';
  import postgre from '/tech-icons/postgresql-original.svg';
  import python from '/tech-icons/python-original.svg';
  import react from '/tech-icons/react-original.svg';
  import three from '/tech-icons/threejs-original.svg';
  import ts from '/tech-icons/typescript-original.svg';
  import vue from '/tech-icons/vuejs-original.svg';
  import redux from '/tech-icons/redux-original.svg';

  const links = ref( [
    git,
    bootstrap,
    ts,
    python,
    react,
    vue,
    redux,
    three,
    node,
    mongo,
    postgre,
  ] );

</script>

<template>

  <h4 class='section-title text-glow'>
    Technologies
  </h4>

  <ul class='tech-list'>
    <li v-for='(              item, index              ) in links'>
      <img class='tech-icon' :src=' item ' :alt=' index ' />
    </li>
  </ul>

</template>