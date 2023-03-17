<style scoped>
.logo-wrapper {
  position: absolute;
  top: 10px;
  left: -120px;
  z-index: 2;
}

.logo {
  height: 6em;
}
</style>

<script setup>
import logo from '/social-icons/logo.png'
import ExperienceButton from './ExperienceButton.vue'

const { toggle, content } = defineProps(['toggle', 'text', 'content'])
</script>

<template>
  <div class="logo-wrapper">
    <img class="logo" :src="logo" />

    <ExperienceButton v-if="!content.isEnabled" :toggle="toggle" :text="content.buttonText" />
  </div>
</template>
