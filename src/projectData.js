import icons from './components/_export'
const path = '/tech-icons/'

export const projectsData = [
  {
    name: 'Codespot',
    description:
      "Social network to share and rate your experiences. Ability to interact with other users by commenting each other's posts",
    images: '/project-images/codespot-img.jpg',
    technologies: [icons.ts, icons.react, icons.node, icons.mongo],
    githubLink: 'https://github.com/Vikms95/blog-api',
    projectLink: 'https://codespot.vercel.app/',
  },
  {
    name: 'Waldo',
    description:
      "Classic Where's Waldo game. Ability to record your scores and upload them on a highscore's list.",
    images: '/project-images/wheres-waldo.jpg',
    technologies: [icons.ts, icons.react, icons.node, icons.mongo],
    githubLink: 'https://github.com/Vikms95/react-wheres-waldo',
    projectLink: 'https://vikms95.github.io/react-wheres-waldo/',
  },
  {
    name: 'VGKeys',
    description:
      'Videogame digital key webpage, where you can filter videogames provided by an API. ',
    images: '/project-images/vg-keys.jpg',
    technologies: [icons.ts, icons.react],
    githubLink: 'https://github.com/Vikms95/react-shop-cart',
    projectLink: 'https://vikms95.github.io/react-shop-cart/',
  },
  {
    name: 'Memolearn',
    description:
      'Memory card game where time a card is clicked, the player scores.',
    images: '/project-images/memolearn.jpg',
    technologies: [icons.ts, icons.react],
    githubLink: 'https://github.com/Vikms95/react-memory-card',
    projectLink: 'https://vikms95.github.io/react-memory-card/',
  },
]
