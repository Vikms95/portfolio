<style scoped>
.logo-wrapper {
  @apply flex 
  flex-col 
  justify-center 
  items-center 
  absolute 
  z-10 
  top-5;
}

.logo-wrapper-tablet {
  @apply tablet:left-0 tablet:right-0 tablet:my-0 tablet:mx-auto;
}
</style>

<script setup>
import { Teleport } from 'vue'
import logo from '/social-icons/logo.png'
import ExperienceButton from './ExperienceButton.vue'

const { toggle, content } = defineProps(['toggle', 'text', 'content'])
</script>

<template>
  <Teleport to="body">
    <div class="logo-wrapper logo-wrapper-tablet -left-20">
      <img class="h-24 tablet:h-16" :src="logo" />

      <ExperienceButton
        v-if="!content.isEnabled"
        :toggle="toggle"
        :text="content.buttonText"
      />
    </div>
  </Teleport>
</template>
