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

</script>

<template>
  <h4 class='section-title text-glow'>
    Technologies
  </h4>
  <ul class='tech-list'>
    <li>
      <img class='tech-icon' v-bind:src=' hi ' />
    </li>
    <!-- <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
    </li>
    <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
    </li>
    <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
    </li>
    <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
    </li>
    <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
    </li>
    <li>
      <img class='tech-icon'
           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
    </li> -->
  </ul>
</template>