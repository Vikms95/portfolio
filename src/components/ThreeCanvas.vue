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

  import sunTexture from '/3D-assets/sun.jpg';

  import {
    setRendererSize,
    createRenderer,
    createCamera,
    createLabelRenderer,
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
    zoomOnStart,
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
    sun,
    explosion,
    planetMeshes = [],
    planetObjects = [];

  let isKeyPress = true;
  let isInitialZoom = false;
  let isExplosionHappening = false;
  let isExplosionDiminishing = false;

  const experience = ref( null );
  const { width, height } = useWindowSize();
  const aspectRatio = computed( () => width.value / height.value );

  watch( aspectRatio, () => setRendererSize( renderer ) );
  watch( aspectRatio, () => updateCamera( camera, aspectRatio ) );
  watch( content, () => zoomOnStart( isInitialZoom, labelRenderer, controls, content ) );

  function animate () {
    controls.update();

    transitionOnFirstZoom( isInitialZoom, camera, sun, controls );
    handleIntersection( planetMeshes, content, raycaster, cursor, camera );

    rotatePlanets( planetMeshes );
    translatePlanets( planetObjects );
    handleSunExplosions( isExplosionHappening, isExplosionDiminishing, explosion, scene );

    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );

    requestAnimationFrame( animate );
  }

  onMounted( () => {
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
    cursor = new THREE.Vector2();

    renderer = createRenderer( renderer, experience );
    renderer = setRendererSize( renderer );
    labelRenderer = createLabelRenderer( labelRenderer );

    camera = createCamera( camera, aspectRatio );
    camera = updateCamera( camera, aspectRatio );
    scene.add( camera );

    createAndAddLights( scene );

    controls = createControls( controls, camera, renderer );

    addEventListeners( cursor, renderer, camera );

    scene.background = createBackground();

    sun = createSun( sun, sunTexture, scene );
    createLabel( 'The Sun', 10, sun, camera );
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


