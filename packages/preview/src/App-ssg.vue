<script setup>
import { ref } from 'vue';

import * as HI from './icons/hi/hi.js';
import * as RI from './icons/ri/ri.js';
import * as OC from './icons/oc/oc.js';
import * as IO from './icons/io/io.js';
import * as BX from './icons/bx/bx.js';
import * as TI from './icons/ti/ti.js';
import * as IN from './icons/in/in.js';

import manifest from './manifest.js';
const libraries = ref({});

for (let k in manifest) {
  const lib = manifest[k];
  const modules = import(`./icons/${lib.id}/${lib.id}.js`);
  modules.then((res) => {
    libraries.value = {
      ...libraries.value,
      [lib.id]: { name: lib.name, icons: Object.keys(res) },
    };
  });
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <div>
        <component :is="Component" />
      </div>
    </Suspense>
  </router-view>
</template>
