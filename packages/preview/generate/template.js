const compile = (id, config) => {
  const names = Object.keys(config.module);

  const def = (name) => {
    return `const ${name} = defineAsyncComponent(
      {
        loader: () => import('./${id}/${name}.vue'),
        loadingComponent: Loading,
      }
      );`;
  };

  const defs = names.map((name) => `${def(name)} \n`);

  return `
    <!-- Generated file. See generate/index.js -->
    <script setup>
      import { defineAsyncComponent } from 'vue';
      import Loading from './Loading.vue'
      ${defs.join(' ')}
    </script>
    <template>
      <div>
        <section>
          <h1>${config.name}</h1>
          <div class="row">
          ${names
            .map((name) => `<span class="icon"><${name} /></span>`)
            .join(' ')}
          </div>
        </section>
      </div>
    </template>
  `;
};

export { compile };
