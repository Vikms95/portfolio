import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth, 
  window.innerHeight,
  0.1,
  1000
)
camera.position.z = 10
scene.add(camera)

const geometry = new THREE.BoxGeometry(30,30)
const material = new THREE.MeshBasicMaterial({color:0x00ff00})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const renderer = new THREE.WebGLRenderer(
  {canvas: document.querySelector('canvas')}
)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene,camera)