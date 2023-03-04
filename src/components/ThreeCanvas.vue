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

  import sunTexture from '/3D-assets/sun.jpg';
  import { Raycaster, Vector2 } from 'three';
  import { planetsData } from '../planetsData';

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
    addEventListeners
  } from '../utils-3D';


  const { content } = defineProps( [ 'content' ] );

  let renderer,
    labelRenderer,
    controls,
    sun,
    camera,
    planetMeshes = [],
    planetObjects = [],
    explosion;

  let isInitialZoom = false;
  let isKeyPress = true;
  let isExplosionHappening = false;
  let isExplosionDiminishing = false;

  const raycaster = new Raycaster();
  const cursor = new Vector2();
  const experience = ref( null );
  const scene = new THREE.Scene();

  const { width, height } = useWindowSize();
  const aspectRatio = computed( () => width.value / height.value );

  camera = createCamera( camera, aspectRatio );
  scene.add( camera );
  createAndAddLights( scene );


  function zoomOnStart () {
    if ( !content.isEnabled && isKeyPress ) {
      isInitialZoom = true;

      document.body.appendChild( labelRenderer.domElement );
      controls = new OrbitControls( camera, labelRenderer.domElement );
      controls.enabled = true;
      controls.zoomSpeed = 0.25;
      controls.panSpeed = 0.75;
      controls.enableDamping = false;
      controls.dampingFactor = 0.25;
      controls.listenToKeyEvents( window );

      isKeyPress = false;
    }
  }

  watch( aspectRatio, () => setRendererSize( renderer ) );
  watch( aspectRatio, () => updateCamera( camera, aspectRatio ) );
  // watch( content, zoomOnStart );

  const createExplosion = () => {
    const isExplosion = Math.random() >= 0.9991 ? true : false;

    if ( isExplosion ) {
      isExplosionHappening = true;
      explosion = new THREE.PointLight( 0xFFFFFF, 2, 550 );
      scene.add( explosion );
    }
  };

  const increaseExplosion = () => {
    explosion.intensity += 0.025;

    if ( explosion.intensity >= 5 ) {
      isExplosionDiminishing = true;
    }
  };

  const diminishExplosion = () => {
    explosion.intensity -= 0.05;

    if ( explosion.intensity <= 0.5 ) {
      scene.remove( explosion );

      isExplosionHappening = false;
      isExplosionDiminishing = false;
    }
  };

  const transitionOnFirstZoom = () => {
    if ( isInitialZoom ) {
      camera.lookAt( sun.position );

      switch ( true ) {
        case camera.position.z > 130:
          camera.position.z -= 0.1;
          camera.position.x += 0.1;
          break;
        case camera.position.z > 120:
          camera.position.z -= 0.11;
          camera.position.x += 0.11;
          break;
        case camera.position.z > 115:
          camera.position.z -= 0.13;
          camera.position.x += 0.13;
          break;
        case camera.position.z > 110:
          camera.position.z -= 0.16;
          camera.position.x += 0.16;
          break;
        case camera.position.z > 105:
          camera.position.z -= 0.19;
          camera.position.x += 0.19;
          break;
        case camera.position.z > 100:
          camera.position.z -= 0.17;
          camera.position.x += 0.17;
          break;
        case camera.position.z > 95:
          camera.position.z -= 0.14;
          camera.position.x += 0.14;
          break;
        case camera.position.z > 90:
          camera.position.z -= 0.13;
          camera.position.x += 0.13;
          break;
        case camera.position.z > 85:
          camera.position.z -= 0.1;
          camera.position.x += 0.1;
          break;
        case camera.position.z > 80:
          camera.position.z -= 0.08;
          camera.position.x += 0.08;
          break;
        case camera.position.z > 75:
          camera.position.z -= 0.06;
          camera.position.x += 0.06;
          break;
        case camera.position.z > 70:
          camera.position.z -= 0.04;
          camera.position.x += 0.04;
          break;
        case camera.position.z > 65:
          camera.position.z -= 0.03;
          camera.position.x += 0.03;
          break;
        case camera.position.z > 60:
          camera.position.z -= 0.02;
          camera.position.x += 0.02;
          break;
        case camera.position.z > 55:
          camera.position.z -= 0.01;
          camera.position.x += 0.01;
          break;
        case camera.position.z > 50:
          isInitialZoom = false;
          controls.enabled = true;
          break;
      }

      camera.position.y -= 0.15;
    }

  };

  const handleSunExplosions = () => {

    if ( !isExplosionHappening ) {
      createExplosion();
    } else {
      if ( !isExplosionDiminishing )
        increaseExplosion();

      else
        diminishExplosion();
    }

  };

  const normalizeColorOnMouseLeave = () => {
    planetMeshes.forEach( ( object, index ) => {
      if ( object.material ) {
        object.material.color.set( 'white' );
        camera.layers.disable( index + 1 );

      }
    } );
  };

  const handleMouseOver = () => {
    const intersects = raycaster.intersectObjects( planetMeshes );

    if ( intersects.length > 0 ) {
      if ( intersects[ 0 ].object.material ) {
        intersects[ 0 ].object.material.color.set( '#909090' );
        camera.layers.enable( intersects[ 0 ].object.name );
      }
    }

    if ( intersects.length > 0 ) document.body.style.cursor = 'pointer';
    if ( intersects.length === 0 ) document.body.style.cursor = 'auto';
  };

  const handleIntersection = () => {
    if ( !content.isEnabled ) {
      raycaster.setFromCamera( cursor, camera );
      normalizeColorOnMouseLeave();
      handleMouseOver();
    }

  };

  function animate () {

    // handleMouseOver();
    // handleIntersection();
    // transitionOnFirstZoom();

    controls.update();
    rotatePlanets( planetMeshes );
    translatePlanets( planetObjects );
    // handleSunExplosions();

    requestAnimationFrame( animate );

    // labelRenderer?.render( scene, camera );
    renderer.render( scene, camera );
  }

  onMounted( () => {
    renderer = createRenderer( renderer, experience );
    renderer = setRendererSize( renderer );
    controls = createControls( controls, camera, renderer );
    addEventListeners( cursor, renderer, camera );
    updateCamera();

    scene.background = createBackground();

    sun = createSun( sun, sunTexture, scene );
    createLabel( 'The Sun', 10, sun, camera );

    planetsData.forEach( ( { name, size, texture, position, index, ring, offset } ) => {
      const { mesh, obj } = createPlanet( size, texture, position, scene, index, ring, offset );
      createLabel( name, index, mesh, camera );
      planetMeshes.push( mesh );
      planetObjects.push( obj );
    } );

    // labelRenderer = createLabelRenderer( labelRenderer );

    controls.update();
    // createExplosion();
    animate();
  } );

</script>

<template>
  <canvas ref='experience' />
</template>


