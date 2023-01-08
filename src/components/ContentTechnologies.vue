<style scoped>
  .tech-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 2.5em;
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
  import html from '/tech-icons/html5-original.svg';
  import css from '/tech-icons/css3-original.svg';
  import bootstrap from '/tech-icons/bootstrap-original.svg';
  import mongo from '/tech-icons/mongodb-original.svg';
  import node from '/tech-icons/nodejs-original.svg';
  import python from '/tech-icons/python-original.svg';
  import react from '/tech-icons/react-original.svg';
  import three from '/tech-icons/threejs-original.png';
  import graphql from '/tech-icons/graphql-plain.svg';
  import ts from '/tech-icons/typescript-original.svg';
  import vue from '/tech-icons/vuejs-original.svg';
  import redux from '/tech-icons/redux-original.svg';
  import angular from '/tech-icons/angularjs-original.svg';
  import postgre from '/tech-icons/postgresql-original.svg';
  import mysql from '/tech-icons/mysql-original.svg';
  import csharp from '/tech-icons/csharp-original.svg';
  import dotnet from '/tech-icons/dot-net-original.svg';
  import docker from '/tech-icons/docker-original.svg';
  import blender from '/tech-icons/blender-original.svg';

  const links = ref( [
    git,
    html,
    css,
    bootstrap,
    react,
    vue,
    angular,
    redux,
    three,
    blender,
    ts,
    node,
    python,
    csharp,
    dotnet,
    graphql,
    mysql,
    postgre,
    mongo,
    docker,
  ] );

</script>

<template>

  <h4 class='section-title text-glow'>
    Technologies
  </h4>

  <ul class='tech-list'>
    <li v-for='(    item, index    ) in links'>
      <img class='tech-icon' :src=' item ' :alt=' index ' />
    </li>
  </ul>

</template>