<style>

  canvas {
    width: 100%;
    height: 100%;
  }

</style>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { ref, watch, computed, onMounted } from 'vue';
import {useWindowSize} from '@vueuse/core';


let renderer;
let controls;
const {width, height} = useWindowSize();
const aspectRatio = computed( () => width.value / height.value );
const experience = ref( null );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
	75, 
	aspectRatio.value, 
	0.01,
	1000
);

function updateRenderer ( ) {
	renderer.setSize( width.value, height.value );
	renderer.setPixelRatio( window.devicePixelRatio );
}

function updateCamera ( ) {
	camera.aspect = aspectRatio.value;
	camera.updateProjectionMatrix;
}

watch( aspectRatio, updateRenderer );
watch( aspectRatio, updateCamera );

const geometry = new THREE.SphereGeometry( 1.5, 30 );
const material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
const mesh = new THREE.Mesh( geometry, material );

camera.position.z = 5;
scene.add( mesh );
scene.add( camera );


const clock = new THREE.Clock();

const loop = () => {
	const elapsedTime = clock.getElapsedTime();

	renderer.render( scene, camera );
	mesh.position.x = Math.sin( elapsedTime * 0.5 ) * 5;
	mesh.position.z = Math.cos( elapsedTime * 0.5 ) * 5; 
	requestAnimationFrame( loop );
};


onMounted( () => {
	renderer = new THREE.WebGLRenderer( {
		canvas: experience.value,
		antialias: true,
	} );

	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.enablePan = true;
	updateRenderer();
	updateCamera;
	loop();

	// const controls = new OrbitControls( camera, renderer );
	renderer.setSize( width.value, height.value );
} );

</script>

<template>
  <canvas ref='experience'/>
</template>


