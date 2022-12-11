import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('canvas')
});

const geometry = new THREE.BoxGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const mesh = new THREE.Mesh(geometry, material);

camera.position.z = 10;
scene.add(camera);
scene.add(mesh);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
