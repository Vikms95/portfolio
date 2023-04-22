<style scoped>
.info-container {
  @apply block 
  tablet:left-0 
  tablet:right-0 
  tablet:top-48
  tablet:my-0 
  tablet:mx-auto
  absolute 
  top-20 
  left-[70vw] 
  p-6 
  desktop:p-4
  rounded-md 
  w-96 
  desktop:w-72
  tablet:w-64
  bg-black 
  bg-opacity-50;
}

.circle-list > li {
  list-style-type: circle;
}
</style>

<script setup>
import { updateBodyData } from '../utils-3D'
import { ref, watch, onMounted } from 'vue'
import closeIco from '/close.png'

const props = defineProps([
  'selectedBody',
  'selectedBodyRef',
  'updateBodyName',
  'resetSelectedBody',
])

const name = ref(null)
const facts = ref(null)
const details = ref(null)

onMounted(() => updateBodyData(props, name, facts, details))
watch(props, () => updateBodyData(props, name, facts, details))
</script>

<template>
  <aside class="info-container">
    <h1 class="flex relative justify-center mb-6 text-3xl">
      {{ name }}
      <img
        role="button"
        :onclick="props.resetSelectedBody"
        class="h-3 hover:cursor-pointer absolute -top-1 right-[5%] text-base cursor-pointer border-none z-20 bg-transparent"
        :src="closeIco"
        alt="close"
      />
    </h1>
    <article class="grid grid-cols-2 items-center gap-x-8 gap-y-5 mb-16">
      <div class="flex flex-col" v-for="{ title, value } in details">
        <div
          class="flex justify-center text-center text-l underline font-black mb-2"
        >
          {{ title }}
        </div>

        <div
          class="flex justify-center text-center text-l justify-self-start italic"
        >
          {{ value }}
        </div>
      </div>
    </article>

    <ul class="circle-list flex flex-col text-center gap-y-4 text-m">
      <li v-for="fact in facts">
        {{ fact }}
      </li>
    </ul>
  </aside>
</template>
