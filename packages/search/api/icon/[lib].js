import { stringify } from 'svgson';

const { readFileSync } = require('fs');
const { join } = require('path');

export default function handler(request, response) {
  const { lib, icon } = request.query;
  const file = readFileSync(join(__dirname, '_files', `${lib}.json`), 'utf8');
  const library = JSON.parse(file);
  const src = library.icons.filter((config) => config.id === icon)[0];
  if (!src) {
    response.status(404).send('could not find that icon');
    return;
  }
  const svg = stringify(src.svg);
  response.status(200).send(`${svg}`);
}
