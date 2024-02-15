import { getName, getIcons } from './lib/repo/index.js';
import { optimize } from './lib/svg/optimize.js';
import { rename } from './lib/component/name.js';
import { bundle } from './lib/bundle/index.js';
import { make as makeBarrel } from './lib/component/barrel.js';
import { createAll } from './lib/component/index.js';
import { Progress } from './lib/util/progress.js';

const generate = async (repo, options = { branch: 'main', dest: 'tmp' }) => {
  const { branch, dest } = options;

  const progress = Progress(5);
  const repoName = getName(repo);
  const data = {};
  let ok = true;

  const steps = [
    {
      name: 'Downloading repo',
      action: async () => {
        const svgFiles = await getIcons(repo, branch);
        return { svgFiles };
      },
    },
    {
      name: 'Optimizing SVGs',
      action: async () => {
        const names = data.svgFiles.map((path) =>
          path.split('/').slice(-1)[0].replace('.svg', '')
        );
        const svgs = data.svgFiles.map((path) => ({
          html: optimize(path),
          name: rename(path, names),
        }));

        return { svgs };
      },
    },
    {
      name: 'Creating components',
      action: async () => {
        const components = await createAll(data.svgs, dest + '/' + repoName);
        return { components };
      },
    },
    {
      name: 'Creating index',
      action: async () => {
        makeBarrel({ components: data.components });
        return {};
      },
    },
    {
      name: 'Bundling',
      action: async () => {
        await bundle({
          entry: dest + '/' + repoName + '/index.js',
          dest: dest + '/' + repoName,
          name: repoName,
          fileName: 'index',
        });
      },
    },
  ];

  console.log('Generating components for ' + repoName + '...');

  for (let step of steps) {
    progress.update(step.name);
    try {
      const resp = await step.action();
      for (const key in resp) {
        data[key] = resp[key];
      }
    } catch (error) {
      console.error('Error, could not create components (' + step.name + ')');
      console.error(
        `Error code: ${error.code || 'N/A'}, Message: ${error.message}`
      );
      ok = false;
      break;
    }
  }

  return ok;
};

export { generate };
