<style>
  canvas {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .experience-div {
    position: absolute;
    top: 50px;
    left: 100px;
  }

  .body-info {
    position: absolute;
    top: 50px;
    right: 500px;
    /* z-index: 999; */
  }
</style>


<script setup>

  import gsap from 'gsap';
  import { useWindowSize } from '@vueuse/core';
  import { Vector2, Raycaster, Scene, Clock } from 'three';
  import { ref, watch, computed, onMounted } from 'vue';

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
    translateToSelectedBody
  } from '../utils-3D';

  const { content } = defineProps( [ 'content' ] );

  let
    renderer,
    labelRenderer,
    controls,
    camera,
    sunMesh,
    explosion,
    planetMeshes = [],
    planetObjects = [],
    clock = new Clock(),
    scene = new Scene(),
    cursor = new Vector2(),
    raycaster = new Raycaster(),
    isExplosionHappening = false,
    isExplosionDiminishing = false;

  const experience = ref( null );
  const selectedBody = ref( null );
  const isFirstToggle = ref( null );

  const { width, height } = useWindowSize();
  const aspectRatio = computed( () => width.value / height.value );

  watch( aspectRatio, () => setRendererSize( renderer ) );
  watch( aspectRatio, () => updateCamera( camera, aspectRatio ) );
  watch( content, () => toggleRenderer( content, labelRenderer, isFirstToggle ) );

  function animate () {
    controls.update();
    requestAnimationFrame( animate );

    // transitionOnFirstZoom( isFirstToggle, camera, sunMesh, controls );
    translateToSelectedBody( scene, camera, controls, selectedBody );
    handleIntersection( planetMeshes, sunMesh, content, raycaster, cursor, camera );

    rotatePlanets( planetMeshes );
    translatePlanets( planetObjects );
    // handleSunExplosions( isExplosionHappening, isExplosionDiminishing, explosion, scene );

    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );
  }

  onMounted( () => {
    renderer = setupRenderer( renderer, experience );
    renderer = setRendererSize( renderer );
    labelRenderer = setupLabelRenderer( labelRenderer );

    camera = setupCamera( camera, aspectRatio, scene );
    camera = updateCamera( camera, aspectRatio );
    controls = setupControls( controls, camera, labelRenderer );

    setupBackground( scene );
    setupAndAddLights( scene );
    setupExplosion( isExplosionHappening, explosion, scene );

    [ sunMesh, planetMeshes, planetObjects ] = setupCelestialBodies( scene, camera );

    addEventListeners( cursor, renderer, camera, planetMeshes, sunMesh, raycaster, selectedBody );

    animate();
  } );

</script>

<template>
  <canvas ref='experience' />
  <aside v-if=' selectedBody !== null ' class='body-info'>Hello</aside>
</template>


