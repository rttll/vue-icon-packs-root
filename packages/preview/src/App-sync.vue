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
  <div>
    <section>
      <h1>{{ libraries.hi.name }}</h1>
      <template v-for="icon of libraries.hi.icons" :key="icon">
        <span class="icon">
          <component :is="HI[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.ri.name }}</h1>
      <template v-for="icon of libraries.ri.icons" :key="icon">
        <span class="icon">
          <component :is="RI[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.oc.name }}</h1>
      <template v-for="icon of libraries.oc.icons" :key="icon">
        <span class="icon">
          <component :is="OC[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.io.name }}</h1>
      <template v-for="icon of libraries.io.icons" :key="icon">
        <span class="icon">
          <component :is="IO[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.bx.name }}</h1>
      <template v-for="icon of libraries.bx.icons" :key="icon">
        <span class="icon">
          <component :is="BX[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.ti.name }}</h1>
      <template v-for="icon of libraries.ti.icons" :key="icon">
        <span class="icon">
          <component :is="TI[icon]" />
        </span>
      </template>
    </section>
    <section>
      <h1>{{ libraries.in.name }}</h1>
      <template v-for="icon of libraries.in.icons" :key="icon">
        <span class="icon">
          <component :is="IN[icon]" />
        </span>
      </template>
    </section>
  </div>
</template>

<style>
.icon {
  font-size: 1.5rem;
  display: inline-block;
  padding: 2px;
}
.icon:hover {
  color: tomato;
}
</style>
