<script setup>
import { Teleport } from 'vue'
import logo from '/social-icons/logo.png'
import ExperienceButton from './ExperienceButton.vue'

const { toggle, content } = defineProps(['toggle', 'text', 'content'])
</script>

<template>
  <Teleport to="body">
    <div
      class="flex flex-col justify-center items-center absolute z-10 top-5 -left-20"
    >
      <img class="h-24" :src="logo" />

      <ExperienceButton
        v-if="!content.isEnabled"
        :toggle="toggle"
        :text="content.buttonText"
      />
    </div>
  </Teleport>
</template>
