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
  import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

  import {
    ref,
    watch,
    computed,
    onMounted
  } from 'vue';

  import { useWindowSize } from '@vueuse/core';

  import starsTexture from '/3D-assets/stars.jpg';
  import sunTexture from '/3D-assets/sun.jpg';
  import mercuryTexture from '/3D-assets/mercury.jpg';
  import venusTexture from '/3D-assets/venus.jpg';
  import earthTexture from '/3D-assets/earth.jpg';
  import marsTexture from '/3D-assets/mars.jpg';
  import jupiterTexture from '/3D-assets/jupiter.jpg';
  import saturnTexture from '/3D-assets/saturn.jpg';
  import saturnRingTexture from '/3D-assets/saturn ring.png';
  import uranusTexture from '/3D-assets/uranus.jpg';
  import uranusRingTexture from '/3D-assets/uranus ring.png';
  import neptuneTexture from '/3D-assets/neptune.jpg';
  import plutoTexture from '/3D-assets/pluto.jpg';
  import { Raycaster, Vector2 } from 'three';

  import {
    setRendererSize,
    createRenderer,
    createCamera,
    updateCamera,
    createAndAddLights,
    onCursorMove,
    onScroll,
    onResize,
    createPlanet,
    createSun,
    createControls,
    createBackground
  } from '../utils3D';

  const { content } = defineProps( [ 'content' ] );

  let renderer,
    labelRenderer,
    controls,
    sun,
    camera,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    objectsToIntersect,
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

  const rotatePlanets = () => {
    sun.rotateY( 0.0001 );
    mercury.mesh.rotateY( 0.004 );
    venus.mesh.rotateY( 0.002 );
    earth.mesh.rotateY( 0.002 );
    mars.mesh.rotateY( 0.0018 );
    jupiter.mesh.rotateY( 0.004 );
    saturn.mesh.rotateY( 0.0038 );
    uranus.mesh.rotateY( 0.003 );
    neptune.mesh.rotateY( 0.0032 );
    pluto.mesh.rotateY( 0.0008 );
  };

  const translatePlanets = () => {
    mercury.obj.rotateY( 0.004 );
    venus.obj.rotateY( 0.001 );
    earth.obj.rotateY( 0.0009 );
    mars.obj.rotateY( 0.0008 );
    jupiter.obj.rotateY( 0.00009 );
    saturn.obj.rotateY( 0.00009 );
    uranus.obj.rotateY( 0.000005 );
    neptune.obj.rotateY( 0.00005 );
    pluto.obj.rotateY( 0.00005 );
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
    objectsToIntersect.forEach( ( object, index ) => {
      if ( object.material ) {
        object.material.color.set( 'white' );
        camera.layers.disable( index + 1 );

      }
    } );
  };

  const handleMouseOver = () => {
    const intersects = raycaster.intersectObjects( objectsToIntersect );

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

    handleMouseOver();
    handleIntersection();
    // transitionOnFirstZoom();

    controls.update();
    rotatePlanets();
    translatePlanets();
    handleSunExplosions();

    requestAnimationFrame( animate );

    labelRenderer.render( scene, camera );
    renderer.render( scene, camera );
  }

  onMounted( () => {
    renderer = createRenderer( renderer, experience );
    renderer = setRendererSize( renderer );

    updateCamera();

    controls = createControls( controls, camera, renderer );
    scene.background = createBackground();

    sun = createSun( sun, sunTexture, scene );

    mercury = createPlanet( 3.2, mercuryTexture, 68, scene );
    mercury.mesh.name = 1;
    venus = createPlanet( 5.8, venusTexture, 90, scene );
    venus.mesh.name = 3;
    earth = createPlanet( 6, earthTexture, 162, scene );
    earth.mesh.name = 2;
    mars = createPlanet( 4, marsTexture, 278, scene );
    mars.mesh.name = 4;
    jupiter = createPlanet( 12, jupiterTexture, 400, scene );
    jupiter.mesh.name = 5;
    saturn = createPlanet( 10, saturnTexture, 538, scene, {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture
    } );
    saturn.mesh.name = 6;
    uranus = createPlanet( 7, uranusTexture, 776, scene, {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture
    } );
    uranus.mesh.name = 7;
    neptune = createPlanet( 7, neptuneTexture, 1000, scene );
    neptune.mesh.name = 8;
    pluto = createPlanet( 5.8, plutoTexture, 1216, scene );
    pluto.mesh.name = 9;
    pluto.obj.rotation.x = 1;

    window.addEventListener( 'scroll', () => onScroll( camera ) );
    window.addEventListener( 'mousemove', ( e ) => onCursorMove( e, cursor ) );
    window.addEventListener( 'resize', () => onResize( renderer, camera ) );

    objectsToIntersect = [
      sun,
      mercury.mesh,
      venus.mesh,
      earth.mesh,
      mars.mesh,
      jupiter.mesh,
      saturn.mesh,
      uranus.mesh,
      neptune.mesh,
      pluto.mesh
    ];


    const mercuryDiv = document.createElement( 'div' );
    mercuryDiv.className = 'label';
    mercuryDiv.textContent = 'Mercury';
    mercuryDiv.style.marginTop = '-1em';
    const mercuryLabel = new CSS2DObject( mercuryDiv );
    mercuryLabel.position.set( 0, 6, 0 );
    mercury.mesh.add( mercuryLabel );
    mercuryLabel.layers.set( 1 );
    camera.layers.disable( 1 );

    const earthDiv = document.createElement( 'div' );
    earthDiv.className = 'label';
    earthDiv.textContent = 'Earth';
    earthDiv.style.marginTop = '-1em';
    const earthLabel = new CSS2DObject( earthDiv );
    earthLabel.position.set( 0, 6, 0 );
    earth.mesh.add( earthLabel );
    earthLabel.layers.set( 2 );
    camera.layers.disable( 2 );

    const venusDiv = document.createElement( 'div' );
    venusDiv.className = 'label';
    venusDiv.textContent = 'Venus';
    venusDiv.style.marginTop = '-1em';
    const venusLabel = new CSS2DObject( venusDiv );
    venusLabel.position.set( 0, 6, 0 );
    venus.mesh.add( venusLabel );
    venusLabel.layers.set( 3 );
    camera.layers.disable( 3 );

    const marsDiv = document.createElement( 'div' );
    marsDiv.className = 'label';
    marsDiv.textContent = 'Mars';
    marsDiv.style.marginTop = '-1em';
    const marsLabel = new CSS2DObject( marsDiv );
    marsLabel.position.set( 0, 6, 0 );
    mars.mesh.add( marsLabel );
    marsLabel.layers.set( 4 );
    camera.layers.disable( 4 );

    const jupiterDiv = document.createElement( 'div' );
    jupiterDiv.className = 'label';
    jupiterDiv.textContent = 'Jupiter';
    jupiterDiv.style.marginTop = '-1em';
    const jupiterLabel = new CSS2DObject( jupiterDiv );
    jupiterLabel.position.set( 0, 6, 0 );
    jupiter.mesh.add( jupiterLabel );
    jupiterLabel.layers.set( 5 );
    camera.layers.disable( 5 );

    const saturnDiv = document.createElement( 'div' );
    saturnDiv.className = 'label';
    saturnDiv.textContent = 'Saturn';
    saturnDiv.style.marginTop = '-1em';
    const saturnLabel = new CSS2DObject( saturnDiv );
    saturnLabel.position.set( 0, 6, 0 );
    saturn.mesh.add( saturnLabel );
    saturnLabel.layers.set( 6 );
    camera.layers.disable( 6 );

    const uranusDiv = document.createElement( 'div' );
    uranusDiv.className = 'label';
    uranusDiv.textContent = 'Uranus';
    uranusDiv.style.marginTop = '-1em';
    const uranusLabel = new CSS2DObject( uranusDiv );
    uranusLabel.position.set( 0, 6, 0 );
    uranus.mesh.add( uranusLabel );
    uranusLabel.layers.set( 7 );
    camera.layers.disable( 7 );

    const neptuneDiv = document.createElement( 'div' );
    neptuneDiv.className = 'label';
    neptuneDiv.textContent = 'Neptune';
    neptuneDiv.style.marginTop = '-1em';
    const neptuneLabel = new CSS2DObject( neptuneDiv );
    neptuneLabel.position.set( 0, 6, 0 );
    neptune.mesh.add( neptuneLabel );
    neptuneLabel.layers.set( 8 );
    camera.layers.disable( 8 );

    const plutoDiv = document.createElement( 'div' );
    plutoDiv.className = 'label';
    plutoDiv.textContent = 'Pluto';
    plutoDiv.style.marginTop = '-1em';
    const plutoLabel = new CSS2DObject( plutoDiv );
    plutoLabel.position.set( 0, 6, 0 );
    pluto.mesh.add( plutoLabel );
    plutoLabel.layers.set( 9 );
    camera.layers.disable( 9 );

    const sunDiv = document.createElement( 'div' );
    sunDiv.className = 'label';
    sunDiv.textContent = 'The Sun';
    sunDiv.style.marginTop = '-1em';
    sunDiv.style.fontSize = '20px';
    const sunLabel = new CSS2DObject( sunDiv );
    sunLabel.position.set( 0, 0, 0 );
    sun.add( sunLabel );
    sunLabel.layers.set( 10 );
    camera.layers.disable( 10 );

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';


    controls.update();
    createExplosion();
    animate();
  } );

</script>

<template>
  <canvas ref='experience' />
</template>


