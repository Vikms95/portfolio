<style>

  canvas {
    width: 100%;
    height: 100%;
  }

</style>


<script setup>

import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { 
	ref,
	// watch,
	computed,
	onMounted }
	from 'vue';

import {useWindowSize} from '@vueuse/core';

import starsTexture from '../assets/stars.jpg';
import sunTexture from '../assets/sun.jpg';
import mercuryTexture from '../assets/mercury.jpg';
import venusTexture from '../assets/venus.jpg';
import earthTexture from '../assets/earth.jpg';
import marsTexture from '../assets/mars.jpg';
import jupiterTexture from '../assets/jupiter.jpg';
import saturnTexture from '../assets/saturn.jpg';
import saturnRingTexture from '../assets/saturn ring.png';
import uranusTexture from '../assets/uranus.jpg';
import uranusRingTexture from '../assets/uranus ring.png';
import neptuneTexture from '../assets/neptune.jpg';
import plutoTexture from '../assets/pluto.jpg';

let renderer;
console.log( 'test out scope' );
const {width, height} = useWindowSize();
const aspectRatio = computed( () => width.value / height.value );

const experience = ref( null );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	aspectRatio.value,
	0.1,
	1000
);
camera.position.set( 0, 0, 20 );
scene.add( camera );

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



// function updateRenderer ( ) {
// 	renderer.setSize( width.value, height.value );
// 	renderer.setPixelRatio( window.devicePixelRatio );
// }

// function updateCamera ( ) {
// 	camera.aspect = aspectRatio.value;
// 	camera.updateProjectionMatrix;
// }

// watch( aspectRatio, updateRenderer );
// watch( aspectRatio, updateCamera );

const ambientLight = new THREE.AmbientLight( 0x333333 );
const pointLight = new THREE.PointLight( 0xFFFFFF, 2, 300 );
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

	if( ring ) {
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

	return {mesh, obj};
}


function animate () {
	//Self-rotation
	// sun.rotateY( 0.004 );
	// mercury.mesh.rotateY( 0.004 );
	// venus.mesh.rotateY( 0.002 );
	// earth.mesh.rotateY( 0.02 );
	// mars.mesh.rotateY( 0.018 );
	// jupiter.mesh.rotateY( 0.04 );
	// saturn.mesh.rotateY( 0.038 );
	// uranus.mesh.rotateY( 0.03 );
	// neptune.mesh.rotateY( 0.032 );
	// pluto.mesh.rotateY( 0.008 );

	// //Around-sun-rotation
	// mercury.obj.rotateY( 0.04 );
	// venus.obj.rotateY( 0.015 );
	// earth.obj.rotateY( 0.01 );
	// mars.obj.rotateY( 0.008 );
	// jupiter.obj.rotateY( 0.002 );
	// saturn.obj.rotateY( 0.0009 );
	// uranus.obj.rotateY( 0.0004 );
	// neptune.obj.rotateY( 0.0001 );
	// pluto.obj.rotateY( 0.00007 );
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	console.log( 'render', scene );
	console.log( 'camera', camera );
}

// window.addEventListener( 'resize', function () {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// } );

onMounted( () => {
	renderer = new THREE.WebGLRenderer( {
		canvas: experience.value,
	} );
  
	console.log( 'test in scope' );
  
	// const controls = new OrbitControls( camera, renderer.domElement );
	// controls.update();
	// updateRenderer();
	// updateCamera();
  
	renderer.setSize( width.value, height.value );
  
	const cubeTextureLoader = new THREE.CubeTextureLoader();
	scene.background = cubeTextureLoader.load( [
		starsTexture,
		starsTexture,
		starsTexture,
		starsTexture,
		starsTexture,
		starsTexture
	] );

	const sunGeo = new THREE.SphereGeometry( 2, 30, 30 );
	const sunMat = new THREE.MeshBasicMaterial( {map: textureLoader.load( sunTexture )} );
	sun = new THREE.Mesh( sunGeo, sunMat );

	createPlanet( 1.5, mercuryTexture, 4 );
	createPlanet( 1.8, venusTexture, 5 );
	createPlanet( 1, earthTexture, 6 );
	createPlanet( 1, marsTexture, 7 );
	createPlanet( 1, jupiterTexture, 10 );
	createPlanet( 1, saturnTexture, 13, {
		innerRadius: 10,
		outerRadius: 20,
		texture: saturnRingTexture
	} );

	createPlanet( 1, uranusTexture, 176, {
		innerRadius: 7,
		outerRadius: 12,
		texture: uranusRingTexture
	} );
	createPlanet( 1, neptuneTexture, 200 );
	createPlanet( 1, plutoTexture, 216 );

	scene.add( sun );
  
	animate();
} );

</script>

<template>
  <canvas ref='experience'/>
</template>


