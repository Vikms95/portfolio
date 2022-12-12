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
import { Group } from 'three';


let renderer;
let controls;

const {width, height} = useWindowSize();
const aspectRatio = computed( () => width.value / height.value );
const experience = ref( null );
const scene = new THREE.Scene();
const solarSystem = new Group();
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

const sun = new THREE.Mesh( 
	new THREE.SphereGeometry( 10, 30 ),
	new THREE.MeshBasicMaterial( { color: 'yellow' }
	) );

const mercury = new THREE.Mesh(
	new THREE.SphereGeometry( 0.1, 30 ),
	new THREE.MeshBasicMaterial( {color: 'gray'} 
	) );

const venus = new THREE.Mesh(
	new THREE.SphereGeometry( 0.25, 30 ),
	new THREE.MeshBasicMaterial( {color: 'beige'} 
	) );

const earth = new THREE.Mesh(
	new THREE.SphereGeometry( 0.25, 30 ),
	new THREE.MeshBasicMaterial( {color: 'blue'} 
	) );

const mars = new THREE.Mesh(
	new THREE.SphereGeometry( 0.2, 30 ),
	new THREE.MeshBasicMaterial( {color: 'red'} 
	) );

const jupiter = new THREE.Mesh(
	new THREE.SphereGeometry( 1, 30 ),
	new THREE.MeshBasicMaterial( {color: 'brown'} 
	) );

const saturn = new THREE.Mesh(
	new THREE.SphereGeometry( 0.90, 30 ),
	new THREE.MeshBasicMaterial( {color: 'brown'} 
	) );

const neptune = new THREE.Mesh(
	new THREE.SphereGeometry( 0.70, 30 ),
	new THREE.MeshBasicMaterial( {color: 'blue'} 
	) );

const uranus = new THREE.Mesh(
	new THREE.SphereGeometry( 0.75, 30 ),
	new THREE.MeshBasicMaterial( {color: 'cyan'} 
	) );



camera.position.z = 50;
camera.position.y = 90;

mercury.position.x = 20;
venus.position.x = 28;
earth.position.x = 40;
mars.position.x = 60;
jupiter.position.x = 120;
saturn.position.x = 240;
neptune.position.x = 480;
uranus.position.x = 650;

solarSystem.add( 
	sun,
	mercury,
	venus,
	earth,
	mars,
	jupiter,
	saturn,
	neptune,
	uranus
);

scene.add( solarSystem );
scene.add( camera );

// const clock = new THREE.Clock();

const loop = () => {
	// const elapsedTime = clock.getElapsedTime();

	renderer.render( scene, camera );
	// mesh.position.x = Math.sin( elapsedTime * 0.5 ) * 5;
	// mesh.position.z = Math.cos( elapsedTime * 0.5 ) * 5; 
	solarSystem.rotation.y += 0.001 * 0.95;
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


