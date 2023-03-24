<script setup>
import { useWindowSize } from '@vueuse/core'
import { Vector2, Raycaster, Scene } from 'three'
import { ref, watch, computed, onMounted } from 'vue'

import BodyInfo from './BodyInfo.vue'

import {
  setupCamera,
  updateCamera,
  setupRenderer,
  setRendererSize,
  toggleRenderer,
  setupLabelRenderer,
  setupAndAddLights,
  setupControls,
  setupBackground,
  setupCelestialBodies,
  rotatePlanets,
  translatePlanets,
  addEventListeners,
  setupExplosion,
  handleSunExplosions,
  handleIntersection,
  translateCameraOnFirstToggle,
  translateToSelectedBody,
  getSelectedBodyName,
} from '../utils-3D'

const { content } = defineProps(['content'])

let renderer,
  labelRenderer,
  controls,
  camera,
  sunMesh,
  explosion,
  planetMeshes = [],
  planetObjects = [],
  scene = new Scene(),
  cursor = new Vector2(),
  raycaster = new Raycaster(),
  isExplosionHappening = false,
  isExplosionDiminishing = false

const experience = ref(null)
const selectedBody = ref(null)
const isFirstToggle = ref(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

watch(aspectRatio, () => setRendererSize(renderer))
watch(aspectRatio, () => updateCamera(camera, aspectRatio))
watch(content, () => toggleRenderer(content, labelRenderer, isFirstToggle))

const updateBodyName = (props) => {
  return getSelectedBodyName(props.selectedBody)
}

function animate() {
  controls.update()
  requestAnimationFrame(animate)

  // transitionOnFirstZoom( isFirstToggle, camera, sunMesh, controls );
  translateToSelectedBody(scene, camera, controls, selectedBody)
  handleIntersection(planetMeshes, sunMesh, content, raycaster, cursor, camera)

  rotatePlanets(planetMeshes)
  translatePlanets(planetObjects)
  // handleSunExplosions( isExplosionHappening, isExplosionDiminishing, explosion, scene );

  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
  labelRenderer.setSize(width.value, height.value)
  labelRenderer.render(scene, camera)
}

onMounted(() => {
  renderer = setupRenderer(renderer, experience)
  renderer = setRendererSize(renderer)
  labelRenderer = setupLabelRenderer(labelRenderer)

  camera = setupCamera(camera, aspectRatio, scene)
  camera = updateCamera(camera, aspectRatio)
  controls = setupControls(controls, camera, labelRenderer)

  setupBackground(scene)
  setupAndAddLights(scene)
  setupExplosion(isExplosionHappening, explosion, scene)
  ;[sunMesh, planetMeshes, planetObjects] = setupCelestialBodies(scene, camera)

  addEventListeners(
    cursor,
    renderer,
    camera,
    planetMeshes,
    sunMesh,
    raycaster,
    selectedBody
  )

  animate()
})
</script>

<template>
  <canvas ref="experience" class="fixed w-fit h-fit" />
  <BodyInfo
    v-if="selectedBody !== null"
    :selectedBody="selectedBody"
    :updateBodyName="updateBodyName"
  />
</template>
