<script setup>
import { links } from '../socialData'
</script>

<template>
  <nav class="flex w-full mb-10">
    <ul class="flex w-full justify-evenly">
      <li class="" v-for="{ link, iconSrc, alt, text } in links">
        <a target="_blank" :href="link">
          <img class="h-9" :src="iconSrc" :alt="alt" />
        </a>
      </li>
    </ul>
  </nav>
</template>
