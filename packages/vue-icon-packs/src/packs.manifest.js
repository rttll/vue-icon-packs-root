module.exports = [
  {
    id: 'hi',
    name: 'HeroIcons',
    path: '../../node_modules/heroicons/optimized',
  },
  {
    id: 'ri',
    name: 'RemixIcons',
    source: 'https://github.com/Remix-Design/RemixIcon',
    path: '../../node_modules/remixicon/icons',
  },
  {
    id: 'oc',
    name: 'Octicons',
    source: 'https://github.com/primer/octicons/tree/main/icons',
    path: './sources/octicons/icons',
    excludeFile: new RegExp(/16/, 'g'),
    stripFilename: new RegExp(/24/, 'g'),
  },
  {
    id: 'io',
    name: 'Ionic Icons',
    source: 'https://github.com/ionic-team/ionicons/tree/master/src/svg',
    path: '../../node_modules/ionicons/src/svg',
  },
  {
    id: 'bx',
    name: 'Box Icons',
    source: 'https://github.com/atisawd/boxicons.git',
    path: '../../node_modules/boxicons/svg',
    stripFilename: new RegExp(/^bx/),
  },
  {
    id: 'ti',
    name: 'Tabler Icons',
    source: 'https://github.com/tabler/tabler-icons',
    path: '../../node_modules/@tabler/icons/icons',
  },
];
