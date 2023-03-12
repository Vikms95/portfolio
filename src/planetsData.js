import sunTexture from '/3D-assets/sun.jpg';
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
    translation: 0.0004,
    diameter: {
      title: 'Diameter',
      value: '4.879 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '3,7 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '4222,6 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '88 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '57,9 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '0'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Venus',
    index: 2,
    size: 5.8,
    texture: venusTexture,
    position: 90,
    rotation: 0.002,
    translation: 0.0001,
    diameter: {
      title: 'Diameter',
      value: '12.104 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '8,9 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '2.802 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '224,7 (days)'
    },
    distanceSun: {
      title: 'Year length',
      value: '108,2 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '0'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Earth',
    index: 3,
    size: 6,
    texture: earthTexture,
    position: 162,
    rotation: 0.002,
    translation: 0.00009,
    diameter: {
      title: 'Diameter',
      value: '12.576 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '9,8 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '24 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '365,2 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '149,6 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '1'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Mars',
    index: 4,
    size: 4,
    texture: marsTexture,
    position: 278,
    rotation: 0.0018,
    translation: 0.00008,
    diameter: {
      title: 'Diameter',
      value: '6.792 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '3,7 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '24,7 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '687 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '228 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '2'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Jupiter',
    index: 5,
    size: 12,
    texture: jupiterTexture,
    position: 400,
    rotation: 0.004,
    translation: 0.000009,
    diameter: {
      title: 'Diameter',
      value: '142.984 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '23,1 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '9,9 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '4.331 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '778,5 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '92'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
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
    translation: 0.000009,
    diameter: {
      title: 'Diameter',
      value: '120.536 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '9,0 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '10,7 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '10.747 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '1.432 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '83'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
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
    translation: 0.0000005,
    diameter: {
      title: 'Diameter',
      value: '51.118 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '8,7 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '17,2 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '30.589 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '2.867 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '27'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Neptune',
    index: 8,
    size: 7,
    texture: neptuneTexture,
    position: 1000,
    rotation: 0.0032,
    translation: 0.0000005,
    diameter: {
      title: 'Diameter',
      value: '49.528 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '11 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '16,1 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '59.800 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '4.515 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '14'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  },
  {
    name: 'Pluto',
    index: 9,
    size: 5.8,
    texture: plutoTexture,
    position: 1216,
    offset: 1,
    rotation: 0.0008,
    translation: 0.0000005,
    diameter: {
      title: 'Diameter',
      value: '2.376 (km)'
    },
    gravity: {
      title: 'Gravity',
      value: '0,7 (m/s²)',
    },
    dayLength: {
      title: 'Day length',
      value: '153,3 (hours)'
    },
    yearLength: {
      title: 'Year length',
      value: '90.560 (days)'
    },
    distanceSun: {
      title: 'Sun distance',
      value: '5.906 (10⁶ km)'
    },
    moons: {
      title: 'Moons',
      value: '5'
    },
    facts: [
      `Average day length is increasing by about 1.7 milliseconds every century.`,
      `Melting glaciers are causing Earth's waistline to spread.`
    ],
  }
];

export const sunData = {
  name: 'The Sun',
  index: 10,
  size: 40,
  texture: sunTexture,
  position: 0,
  rotation: 0.00000000008,
  translation: null
};