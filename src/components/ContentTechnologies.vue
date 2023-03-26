<script setup>
import icons from './_export'
</script>

<template>
  <article class="mb-8">
    <h4 class="section-title text-glow tablet:text-center">Technologies</h4>
    <ul class="flex justify-center flex-wrap gap-y-16 gap-x-7 list-none">
      <li v-for="(item, index) in icons">
        <img
          class="h-[4.5rem] tablet:h-12 mobile:h-6"
          :src="item"
          :alt="index"
        />
      </li>
    </ul>
  </article>
</template>
