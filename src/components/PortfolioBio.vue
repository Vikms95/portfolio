<style scoped>
.shadowed-text {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>

<script setup>
import TypeWriter from 'typewriter-effect/dist/core'
import { onMounted } from 'vue'
import profilePicture from '/social-icons/profile.jfif'

onMounted(() => {
  const node = document.querySelector('.typewriter-text')
  const typewriter = new TypeWriter(node, {
    autoStart: true,
    loop: true,
  })

  typewriter
    .pauseFor(200)
    .typeString('Professional web developer')
    .pauseFor(200)
    .deleteAll()
    .typeString('Science enthusiast')
    .pauseFor(200)
    .deleteAll()
    .typeString('Book and videogames lover')
    .pauseFor(200)
    .deleteAll()
    .start()
})
</script>

<template>
  <header
    class="backdrop-blur-sm text-white flex flex-auto justify-evenly flex-wrap items-center gap-x-5 mb-5"
  >
    <img
      class="justify-self-start h-60 mobile:h-52 w-auto rounded-full"
      :src="profilePicture"
      alt="looking at the camera"
    />

    <div class="shadowed-text max-w-full">
      <h2
        class="typewriter-text my-6 mx-0 text-4xl font-bold tablet:text-center tablet:text-xl mobile:text-lg"
      />

      <h3
        class="text-lg font-semibold my-6 mx-0 tablet:text-base tablet:text-center"
      >
        I build impactful websites that bring success to your business
      </h3>
    </div>
  </header>
</template>
