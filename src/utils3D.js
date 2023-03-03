import * as THREE from 'three';
import { useWindowSize } from '@vueuse/core';

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
