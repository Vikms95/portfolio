<script setup>
import { techData } from '../techData'
</script>

<template>
  <article class="mb-8">
    <h4 class="section-title text-glow tablet:text-center">Technologies</h4>
    <ul class="flex justify-center flex-wrap gap-y-16 gap-x-7 list-none">
      <li v-for="({ doc, ico }, index) in techData">
        <a target="_blank" :href="doc">
          <img
            class="h-[4.5rem] tablet:h-12 mobile:h-6"
            :src="ico"
            :alt="index"
          />
        </a>
      </li>
    </ul>
  </article>
</template>
