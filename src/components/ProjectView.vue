<script setup>
  const props = defineProps(
    ['name', 'description', 'images', 'technologies', 'link']
  );
</script>
<!-- https://brittanychiang.com/ -->

<template>
  <article>
    <h3>{{ props.name }}</h3>
    <img src="" alt={{props.name}}>
    <button>Go to project</button>
    <p>{{ props.description }}</p>
    <a href=""></a>
  </article>
</template>