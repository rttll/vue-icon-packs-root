<script setup>
import HeroIcons from './components/HeroIcons.vue';

import RemixIcon from './components/RemixIcon.vue';

import Octicons from './components/Octicons.vue';

import IonicIcons from './components/IonicIcons.vue';

import BoxIcons from './components/BoxIcons.vue';

import TablerIcons from './components/TablerIcons.vue';

import Iconoir from './components/Iconoir.vue';
</script>

<template>
  <div>
    <section>
      <HeroIcons />
      <RemixIcon />
      <Octicons />
      <IonicIcons />
      <BoxIcons />
      <TablerIcons />
      <Iconoir />
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
