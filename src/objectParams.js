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


export const objectParams = [
  {
    name: 'Mercury',
    index: 1,
    size: 3.2,
    texture: mercuryTexture,
    position: 68
  },
  {
    name: 'Venus',
    index: 2,
    size: 5.8,
    texture: venusTexture,
    position: 90
  },
  {
    name: 'Earth',
    index: 3,
    size: 6,
    texture: earthTexture,
    position: 162
  },
  {
    name: 'Mars',
    index: 4,
    size: 4,
    texture: marsTexture,
    position: 278
  },
  {
    name: 'Jupiter',
    index: 5,
    size: 12,
    texture: jupiterTexture,
    position: 400
  },
  {
    name: 'Saturn',
    index: 6,
    size: 10,
    texture: saturnTexture,
    ringTexture: saturnRingTexture,
    position: 58
  },
  {
    name: 'Uranus',
    index: 7,
    size: 7,
    texture: uranusTexture,
    ringTexture: uranusRingTexture,
    position: 776
  },
  {
    name: 'Neptune',
    index: 8,
    size: 7,
    texture: neptuneTexture,
    position: 1000
  },
  {
    name: 'Pluto',
    index: 9,
    size: 5.8,
    texture: plutoTexture,
    position: 1216
  },
];