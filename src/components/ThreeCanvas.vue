<style>
  canvas {
    position: fixed;
    width: 100%;
    height: 100%;
  }
</style>


<script setup>

  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
  import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
  import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
  import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

  import {
    ref,
    watch,
    computed,
    onMounted
  }
    from 'vue';

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

  let renderer;
  let sun;
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

  const experience = ref( null );
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    aspectRatio.value,
    0.1,
    10000
  );
  camera.position.set( -90, 140, 140 );
  scene.add( camera );

  function updateRenderer () {
    renderer.setSize( width.value, height.value );
    renderer.setPixelRatio( window.devicePixelRatio );
  }

  function updateCamera () {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix;
  }

  watch( aspectRatio, updateRenderer );
  watch( aspectRatio, updateCamera );

  const ambientLight = new THREE.AmbientLight( 0x333333 );
  const pointLight = new THREE.PointLight( 0xFFFFFF, 2, 1500 );
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

  function animate () {
    //Self-rotation
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

    // //Around-sun-rotation
    mercury.obj.rotateY( 0.004 );
    venus.obj.rotateY( 0.001 );
    earth.obj.rotateY( 0.0009 );
    mars.obj.rotateY( 0.0008 );
    jupiter.obj.rotateY( 0.00009 );
    saturn.obj.rotateY( 0.00009 );
    uranus.obj.rotateY( 0.000005 );
    neptune.obj.rotateY( 0.00005 );
    pluto.obj.rotateY( 0.00005 );

    if ( isExplosionHappening === false ) {
      createExplosion();
    } else {
      if ( isExplosionDiminishing === false ) {
        increaseExplosion();
      } else {
        diminishExplosion();
      }
    }


    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  } );

  onMounted( () => {
    renderer = new THREE.WebGLRenderer( {
      canvas: experience.value,
      antialias: true
    } );

    renderer.setSize( width.value, height.value );
    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
    updateRenderer();
    updateCamera();

    const controls = new OrbitControls( camera, renderer.domElement );
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
    scene.add( sun );

    mercury = createPlanet( 3.2, mercuryTexture, 68 );
    venus = createPlanet( 5.8, venusTexture, 90 );
    earth = createPlanet( 6, earthTexture, 162 );
    mars = createPlanet( 4, marsTexture, 278 );
    jupiter = createPlanet( 12, jupiterTexture, 400 );
    saturn = createPlanet( 10, saturnTexture, 538, {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture
    } );
    uranus = createPlanet( 7, uranusTexture, 776, {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture
    } );
    // uranus.rotation.x = 2;
    neptune = createPlanet( 7, neptuneTexture, 1000 );
    pluto = createPlanet( 5.8, plutoTexture, 1216 );
    pluto.obj.rotation.x = 1;
    document.addEventListener( 'scroll', moveCamera );

    mercury.obj.rotateY( Math.random() * 5 );
    venus.obj.rotateY( Math.random() * 5 );
    earth.obj.rotateY( Math.random() * 5 );
    mars.obj.rotateY( Math.random() * 5 );
    saturn.obj.rotateY( Math.random() * 5 );
    uranus.obj.rotateY( Math.random() * 5 );
    neptune.obj.rotateY( Math.random() * 5 );
    pluto.obj.rotateY( Math.random() * 5 );


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


