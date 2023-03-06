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
</style>


<script setup>

  import { Vector2, Raycaster, Scene } from 'three';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useWindowSize } from '@vueuse/core';

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
    transitionOnFirstZoom
  } from '../utils-3D';

  const { content } = defineProps( [ 'content' ] );

  let
    renderer,
    labelRenderer,
    controls,
    camera,
    sunMesh,
    explosion,
    scene = new Scene(),
    cursor = new Vector2(),
    raycaster = new Raycaster(),
    planetMeshes = [],
    planetObjects = [],
    isExplosionHappening = false,
    isExplosionDiminishing = false;

  const experience = ref( null );
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
    handleIntersection( planetMeshes, sunMesh, content, raycaster, cursor, camera );

    rotatePlanets( planetMeshes );
    translatePlanets( planetObjects );
    handleSunExplosions( isExplosionHappening, isExplosionDiminishing, explosion, scene );

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

    addEventListeners( cursor, renderer, camera );

    [ sunMesh, planetMeshes, planetObjects ] = setupCelestialBodies( scene, camera );

    animate();
  } );

</script>

<template>
  <canvas ref='experience' />
</template>


