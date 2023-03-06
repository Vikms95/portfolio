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

  import * as THREE from 'three';
  import { ref, watch, computed, onMounted } from 'vue';
  import { useWindowSize } from '@vueuse/core';
  import { planetsData } from '../planetsData';

  import {
    setRendererSize,
    createRenderer,
    createLabelRenderer,
    toggleRenderer,
    createCamera,
    updateCamera,
    createAndAddLights,
    createPlanet,
    createSun,
    createControls,
    createBackground,
    createLabel,
    rotatePlanets,
    translatePlanets,
    addEventListeners,
    createExplosion,
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
    scene,
    cursor,
    raycaster,
    sunMesh,
    explosion,
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
    transitionOnFirstZoom( isFirstToggle, camera, sunMesh, controls );
    handleIntersection( planetMeshes, sunMesh, content, raycaster, cursor, camera );

    rotatePlanets( planetMeshes );
    translatePlanets( planetObjects );
    handleSunExplosions( isExplosionHappening, isExplosionDiminishing, explosion, scene );

    requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );
  }

  onMounted( () => {
    scene = new THREE.Scene();
    cursor = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    renderer = createRenderer( renderer, experience );
    renderer = setRendererSize( renderer );
    labelRenderer = createLabelRenderer( labelRenderer );

    camera = createCamera( camera, aspectRatio );
    camera = updateCamera( camera, aspectRatio );
    scene.add( camera );

    createAndAddLights( scene );

    controls = createControls( controls, camera, labelRenderer );

    addEventListeners( cursor, renderer, camera );

    scene.background = createBackground();

    sunMesh = createSun( sunMesh, scene );

    createLabel( 'The Sun', sunMesh.name, sunMesh, camera );

    createExplosion( isExplosionHappening, explosion, scene );

    planetsData.forEach( ( { name, size, texture, position, index, ring, offset } ) => {
      const { mesh, obj } = createPlanet( size, texture, position, scene, index, ring, offset );
      createLabel( name, index, mesh, camera );

      planetMeshes.push( mesh );
      planetObjects.push( obj );
    } );

    animate();
  } );

</script>

<template>
  <canvas ref='experience' />
</template>


