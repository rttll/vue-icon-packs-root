import { readFileSync } from 'fs';
import cheerio from 'cheerio';
import svgo from 'svgo';

const optimized = (path) => {
  const str = readFileSync(path, 'utf8');
  const result = svgo.optimize(str, {
    path: path,
    multipass: true,
    plugins: [
      'removeXMLNS',
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'prefixIds',
      'cleanupIDs',
      'collapseGroups',
      'removeTitle',
      'removeEmptyText',
      'removeEmptyContainers',
      'removeHiddenElems',
      'cleanupEnableBackground',
    ],
  });
  return result.data;
};

const optimize = (path) => {
  const _optimized = optimized(path);
  const _setAttrs = setAttrs(_optimized);
  return _setAttrs;
};

const setAttrs = (input) => {
  const $ = cheerio.load(input, { xmlMode: true });

  $('svg').attr('height', '1em').attr('width', '1em').removeAttr('class');

  $('[fill]')
    .not('[fill="currentColor"]')
    .not('[fill="none"]')
    .attr('fill', 'currentColor');
  $('[stroke]')
    .not('[stroke="currentColor"]')
    .not('[stroke="none"]')
    .attr('stroke', 'currentColor');

  // Iterate over all elements that have a `style` attribute
  $('[style]').each(function () {
    let style = $(this).attr('style');
    // Parse the style string into an object for easier manipulation
    let styleObj = style.split(';').reduce((acc, curr) => {
      let [key, value] = curr.split(':').map((item) => item.trim());
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Modify `fill` and `stroke` within the style object if necessary
    if (
      styleObj.fill &&
      styleObj.fill !== 'currentColor' &&
      styleObj.fill !== 'none'
    ) {
      styleObj.fill = 'currentColor';
    }
    if (
      styleObj.stroke &&
      styleObj.stroke !== 'currentColor' &&
      styleObj.stroke !== 'none'
    ) {
      styleObj.stroke = 'currentColor';
    }

    // Convert the style object back into a string and set it as the new style attribute
    let newStyle = Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    $(this).attr('style', newStyle);
  });

  return $.xml();
};

export { optimize };
