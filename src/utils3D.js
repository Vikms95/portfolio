import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import starsTexture from '/3D-assets/stars.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useWindowSize } from '@vueuse/core';
import { planetsData } from './planets';

export const createRenderer = ( renderer, element ) => (
  renderer = new THREE.WebGLRenderer( {
    canvas: element.value,
    antialias: true
  } )
);

export const setRendererSize = ( renderer ) => {
  const { width, height } = useWindowSize();
  renderer.setSize( width.value, height.value );
  renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

  return renderer;
};

export const createCamera = ( camera, aspectRatio ) => {
  camera = new THREE.PerspectiveCamera(
    45,
    aspectRatio.value,
    0.1,
    10000
  );

  camera.position.set( -90, 140, 140 );

  return camera;
};

export const updateCamera = ( camera, aspectRatio ) => {
  if ( !camera || !aspectRatio ) return;

  camera.aspect = aspectRatio.value;
  camera.updateProjectionMatrix;
  return camera;
};

export const createControls = ( controls, camera, renderer ) => {
  controls = new OrbitControls( camera, renderer.domElement );
  controls.enabled = true;
  controls.zoomSpeed = 0.25;
  controls.panSpeed = 0.75;
  controls.enableDamping = false;
  controls.dampingFactor = 0.25;
  controls.listenToKeyEvents( window );
  controls.update();

  return controls;
};

export const createAndAddLights = ( scene ) => {
  let ambientLight = new THREE.AmbientLight( 0x333333 );
  let pointLight = new THREE.PointLight( 0xFFFFFF, 2, 1500 );
  pointLight.layers.enableAll();
  scene.add( pointLight );
  scene.add( ambientLight );

};

export const onCursorMove = ( e, cursor ) => {
  cursor.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  cursor.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
};

export const onScroll = ( camera ) => {
  const distance = document.body.getBoundingClientRect().top;
  camera.position.z += distance * -0.00001;
};

export const onResize = ( renderer, camera ) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

export const addEventListeners = ( cursor, renderer, camera ) => {
  window.addEventListener( 'scroll', () => onScroll( camera ) );
  window.addEventListener( 'mousemove', ( e ) => onCursorMove( e, cursor ) );
  window.addEventListener( 'resize', () => onResize( renderer, camera ) );

};

export const createSun = ( star, texture, scene ) => {
  const textureLoader = new THREE.TextureLoader();

  const starGeo = new THREE.SphereGeometry( 40, 30, 30 );
  const sunMat = new THREE.MeshBasicMaterial( { map: textureLoader.load( texture ) } );
  star = new THREE.Mesh( starGeo, sunMat );
  star.name = 10;
  scene.add( star );
  return star;
};

export const createPlanet = ( size, texture, position, scene, index, ring, offset ) => {
  const textureLoader = new THREE.TextureLoader();

  const geo = new THREE.SphereGeometry( size, 30, 30 );
  const mat = new THREE.MeshStandardMaterial( { map: textureLoader.load( texture ) } );
  const mesh = new THREE.Mesh( geo, mat );
  mesh.name = index;

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

  mesh.position.x = position;
  obj.rotateY( Math.random() * 5 );

  if ( offset ) obj.rotation.x = offset;

  scene.add( obj );

  return { mesh, obj };
};

export const createLabel = ( name, index, mesh, camera ) => {
  const div = document.createElement( 'div' );
  div.className = 'label';
  div.textContent = name;
  div.style.marginTop = '-1em';

  const label = new CSS2DObject( div );
  label.position.set( 0, 6, 0 );
  mesh.add( label );
  label.layers.set( index );
  camera.layers.disable( index );
};

export const createLabelRenderer = ( renderer ) => {

  renderer = new CSS2DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';

  return renderer;

};

export const createBackground = () => {
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  return cubeTextureLoader.load( [ starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture ] );
};

export const rotatePlanets = ( planetMeshes ) => {
  planetMeshes.forEach( ( planet, index ) => planet.rotateY( planetsData[ index ].rotation ) );
};

export const translatePlanets = ( planetObjects ) => (
  planetObjects.forEach( ( planet, index ) => planet.rotateY( planetsData[ index ].translation ) )
);

