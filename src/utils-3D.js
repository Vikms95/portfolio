import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import starsTexture from '/3D-assets/stars.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useWindowSize } from '@vueuse/core';
import { planetsData } from './planetsData';


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
  camera.layers.enableAll();

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
  controls.enabled = false;

  controls.update();

  controls.zoomSpeed = 0.25;
  controls.panSpeed = 0.75;

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.listenToKeyEvents( window );

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

const createRing = ( ring, obj, position ) => {
  const textureLoader = new THREE.TextureLoader();
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
};

export const createPlanet = ( size, texture, position, scene, index, ring, offset ) => {
  const textureLoader = new THREE.TextureLoader();

  const geo = new THREE.SphereGeometry( size, 30, 30 );
  const mat = new THREE.MeshStandardMaterial( { map: textureLoader.load( texture ) } );
  const mesh = new THREE.Mesh( geo, mat );
  mesh.name = index;
  mesh.position.x = position;

  const obj = new THREE.Object3D();
  obj.rotateY( Math.random() * 5 );
  obj.add( mesh );

  if ( ring )
    createRing( ring, obj, position );

  if ( offset )
    obj.rotation.x = offset;

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
  const cube = new Array( 6 ).fill( starsTexture, 0, 6 );
  return cubeTextureLoader.load( cube );
};

export const rotatePlanets = ( planetMeshes ) => {
  planetMeshes.forEach( ( planet, index ) =>
    planet.rotateY( planetsData[ index ].rotation ) );
};

export const translatePlanets = ( planetObjects ) => (
  planetObjects.forEach( ( planet, index ) =>
    planet.rotateY( planetsData[ index ].translation ) )
);

export const createExplosion = ( isExplosionHappening, explosion, scene ) => {
  const isExplosion = Math.random() >= 0.9991 ? true : false;

  if ( isExplosion ) {
    isExplosionHappening = true;
    explosion = new THREE.PointLight( 0xFFFFFF, 2, 550 );
    scene.add( explosion );
  }
};

const increaseExplosion = ( isExplosionDiminishing, explosion ) => {
  explosion.intensity += 0.025;

  if ( explosion.intensity >= 5 )
    isExplosionDiminishing = true;
};

const diminishExplosion = ( isExplosionDiminishing, isExplosionHappening, explosion, scene ) => {
  explosion.intensity -= 0.05;

  if ( explosion.intensity <= 0.5 ) {
    scene.remove( explosion );
    isExplosionHappening = false;
    isExplosionDiminishing = false;
  }
};

export const handleSunExplosions = (
  isExplosionHappening,
  isExplosionDiminishing,
  explosion, scene
) => {
  if ( !isExplosionHappening )
    createExplosion( isExplosionHappening, explosion, scene );

  else
    if ( !isExplosionDiminishing )
      increaseExplosion( isExplosionDiminishing, explosion );

    else
      diminishExplosion( isExplosionDiminishing, isExplosionHappening, explosion, scene );
};

export const zoomOnStart = ( isInitialZoom, labelRenderer, controls, content ) => {
  if ( content.isEnabled ) return;

  isInitialZoom = true;
  controls.enabled = true;
  document.body.appendChild( labelRenderer.domElement );
};


const normalizeColorOnMouseLeave = ( planetMeshes, camera ) => {
  planetMeshes.forEach( ( object, index ) => {
    if ( object.material ) {
      object.material.color.set( 'white' );
      camera.layers.disable( index + 1 );
    }
  } );
};

const handleMouseOver = ( planetMeshes, raycaster, camera ) => {
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

export const handleIntersection = ( planetMeshes, content, raycaster, cursor, camera ) => {
  if ( !content.isEnabled ) {
    raycaster.setFromCamera( cursor, camera );
    normalizeColorOnMouseLeave( planetMeshes, camera );
    handleMouseOver( planetMeshes, raycaster, camera );
  }
};

export const transitionOnFirstZoom = ( isInitialZoom, camera, sun, controls ) => {
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
