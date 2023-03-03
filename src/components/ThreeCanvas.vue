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
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  import { setRendererSize, createRenderer, createCamera, updateCamera } from '../utils3D';

  const { content } = defineProps( [ 'content' ] );

  let renderer;
  let labelRenderer;
  let sun;
  let camera;
  let mercury;
  let venus;
  let earth;
  let mars;
  let jupiter;
  let saturn;
  let uranus;
  let neptune;
  let pluto;

  const { width, height } = useWindowSize();
  const aspectRatio = computed( () => width.value / height.value );

  const raycaster = new Raycaster();
  const cursor = new Vector2();

  let objectsToIntersect;

  const onCursorMove = ( e ) => {
    cursor.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    cursor.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

  };

  let controls;
  let isInitialZoom = false;
  let isKeyPress = true;
  const experience = ref( null );
  const scene = new THREE.Scene();

  camera = createCamera( camera, aspectRatio );
  scene.add( camera );

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
  watch( content, zoomOnStart );



  const ambientLight = new THREE.AmbientLight( 0x333333 );
  const pointLight = new THREE.PointLight( 0xFFFFFF, 2, 1500 );
  pointLight.layers.enableAll();
  scene.add( pointLight );
  scene.add( ambientLight );

  const textureLoader = new THREE.TextureLoader();

  function createPlanet ( size, texture, position, ring ) {
    const geo = new THREE.SphereGeometry( size, 30, 30 );
    const mat = new THREE.MeshStandardMaterial( {
      map: textureLoader.load( texture )
    } );

    const mesh = new THREE.Mesh( geo, mat );
    const obj = new THREE.Object3D();
    obj.add( mesh );

    if ( ring ) {
      const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        32
      );

      const ringMat = new THREE.MeshBasicMaterial( {
        map: textureLoader.load( ring.texture ),
        side: THREE.DoubleSide
      } );

      const ringMesh = new THREE.Mesh( ringGeo, ringMat );
      obj.add( ringMesh );
      ringMesh.position.x = position;
      ringMesh.rotation.x = -0.5 * Math.PI;
    }

    scene.add( obj );
    mesh.position.x = position;

    return { mesh, obj };
  }

  let explosion;
  let isExplosionHappening = false;
  let isExplosionDiminishing = false;


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


  window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } );

  onMounted( () => {
    renderer = createRenderer( renderer, experience );
    renderer = setRendererSize( renderer );

    updateCamera();

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enabled = true;
    controls.zoomSpeed = 0.25;
    controls.panSpeed = 0.75;
    controls.enableDamping = false;
    controls.dampingFactor = 0.25;
    controls.listenToKeyEvents( window );
    controls.update();


    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load( [
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture
    ] );

    const sunGeo = new THREE.SphereGeometry( 40, 30, 30 );
    const sunMat = new THREE.MeshBasicMaterial( { map: textureLoader.load( sunTexture ) } );
    sun = new THREE.Mesh( sunGeo, sunMat );
    sun.name = 10;
    scene.add( sun );

    mercury = createPlanet( 3.2, mercuryTexture, 68 );
    mercury.mesh.name = 1;
    venus = createPlanet( 5.8, venusTexture, 90 );
    venus.mesh.name = 3;
    earth = createPlanet( 6, earthTexture, 162 );
    earth.mesh.name = 2;
    mars = createPlanet( 4, marsTexture, 278 );
    mars.mesh.name = 4;
    jupiter = createPlanet( 12, jupiterTexture, 400 );
    jupiter.mesh.name = 5;

    saturn = createPlanet( 10, saturnTexture, 538, {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture
    } );
    saturn.mesh.name = 6;

    uranus = createPlanet( 7, uranusTexture, 776, {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture
    } );
    uranus.mesh.name = 7;
    // uranus.rotation.x = 2;
    neptune = createPlanet( 7, neptuneTexture, 1000 );
    neptune.mesh.name = 8;
    pluto = createPlanet( 5.8, plutoTexture, 1216 );
    pluto.mesh.name = 9;
    pluto.obj.rotation.x = 1;
    document.addEventListener( 'scroll', moveCamera );
    window.addEventListener( 'mousemove', onCursorMove );


    mercury.obj.rotateY( Math.random() * 5 );
    venus.obj.rotateY( Math.random() * 5 );
    earth.obj.rotateY( Math.random() * 5 );
    mars.obj.rotateY( Math.random() * 5 );
    saturn.obj.rotateY( Math.random() * 5 );
    uranus.obj.rotateY( Math.random() * 5 );
    neptune.obj.rotateY( Math.random() * 5 );
    pluto.obj.rotateY( Math.random() * 5 );

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


  function moveCamera () {
    const distance = document.body.getBoundingClientRect().top;
    camera.position.z += distance * -0.00001;
  }

</script>

<template>
  <canvas ref='experience' />
</template>


