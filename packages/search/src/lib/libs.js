module.exports = [
  {
    name: 'HeroIcons',
    shortName: 'hi',
    path: 'node_modules/heroicons/optimized',
  },
  {
    name: 'RemixIcons',
    shortName: 'ri',
    basePath: 'remixicon',
    source: 'https://github.com/Remix-Design/RemixIcon',
    path: 'node_modules/remixicon/icons',
  },
  {
    name: 'Octicons',
    shortName: 'oc',
    source: 'https://github.com/primer/octicons/tree/main/icons',
    path: '../icons/octicons/icons',
    excludeFile: new RegExp(/16/, 'g'),
    stripFilename: new RegExp(/24/, 'g'),
  },
  {
    name: 'Ionic Icons',
    shortName: 'io',
    source: 'https://github.com/ionic-team/ionicons/tree/master/src/svg',
    path: 'node_modules/ionicons/src/svg',
  },
  // {
  //   name: 'Font Awesome',
  //   shortName: 'fa',
  //   source: 'https://github.com/FortAwesome/Font-Awesome.git',
  //   path: 'node_modules/Font-Awesome/svgs',
  // },
  {
    name: 'Box Icons',
    shortName: 'bx',
    source: 'https://github.com/atisawd/boxicons.git',
    path: 'node_modules/boxicons/svg',
    stripFilename: new RegExp(/^bx/),
  },
  {
    name: 'Tabler Icons',
    shortName: 'ti',
    source: 'https://github.com/tabler/tabler-icons',
    path: 'node_modules/@tabler/icons/icons',
  },
];
