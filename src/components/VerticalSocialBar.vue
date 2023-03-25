<style scoped>
.vertical-bar::after {
  content: '';
  display: block;
  width: 3px;
  height: 140px;
  margin: 20px auto;
  background-color: rgb(57, 72, 209);
  border-radius: 15px;
}

.social-icon {
  height: 30px;
}

.social-icon:hover ~ .icon-text {
  display: flex;
}

.social-icon:hover ~ .icon-text {
  opacity: 1;
}

.icon-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  position: absolute;
  color: white;
  left: 40px;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s linear;
}
</style>

<script setup>
import { links } from '../socialData'
</script>

<template>
  <nav class="tablet:hidden fixed bottom-10 left-10 z-10 vertical-bar">
    <ul class="flex flex-col justify-center items-center gap-y-6 p-0 m-0">
      <li v-for="{ link, iconSrc, alt, text } in links">
        <a
          target="_blank"
          class="flex justify-center items-center gap-y-1"
          :href="link"
        >
          <img class="social-icon" :src="iconSrc" :alt="alt" />
          <span class="icon-text">{{ text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
