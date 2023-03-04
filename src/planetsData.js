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


export const planetsData = [
  {
    name: 'Mercury',
    index: 1,
    size: 3.2,
    texture: mercuryTexture,
    position: 68,
    rotation: 0.004,
    translation: 0.004
  },
  {
    name: 'Venus',
    index: 2,
    size: 5.8,
    texture: venusTexture,
    position: 90,
    rotation: 0.002,
    translation: 0.001
  },
  {
    name: 'Earth',
    index: 3,
    size: 6,
    texture: earthTexture,
    position: 162,
    rotation: 0.002,
    translation: 0.0009

  },
  {
    name: 'Mars',
    index: 4,
    size: 4,
    texture: marsTexture,
    position: 278,
    rotation: 0.0018,
    translation: 0.0008
  },
  {
    name: 'Jupiter',
    index: 5,
    size: 12,
    texture: jupiterTexture,
    position: 400,
    rotation: 0.004,
    translation: 0.00009
  },
  {
    name: 'Saturn',
    index: 6,
    size: 10,
    texture: saturnTexture,
    ring: {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture,
    },
    position: 600,
    rotation: 0.0038,
    translation: 0.00009
  },
  {
    name: 'Uranus',
    index: 7,
    size: 7,
    texture: uranusTexture,
    ring: {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture,
    },
    position: 776,
    rotation: 0.003,
    translation: 0.000005
  },
  {
    name: 'Neptune',
    index: 8,
    size: 7,
    texture: neptuneTexture,
    position: 1000,
    rotation: 0.0032,
    translation: 0.000005
  },
  {
    name: 'Pluto',
    index: 9,
    size: 5.8,
    texture: plutoTexture,
    position: 1216,
    offset: 1,
    rotation: 0.0008,
    translation: 0.000005
  }
];

export const sun = {
  name: 'Sun',
  index: 9,
  size: 5.8,
  texture: plutoTexture,
  position: 1216,
  offset: 1,
  rotation: 0.0008,
  translation: 0.000005
};