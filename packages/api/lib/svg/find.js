import fg from 'fast-glob';

function find(directory) {
  return fg(`${directory}/**/*.svg`);
}

export { find };
