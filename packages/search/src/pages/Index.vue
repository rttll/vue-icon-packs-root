<template>
  <Layout>
    <div class="flex">
      <Search />
    </div>
  </Layout>
</template>

<script>
import list from '../search/packs.manifest';
import Search from '../components/Search.vue';
export default {
  metaInfo: {
    title: 'Vue Icon Packs',
  },
  components: { Search },
  created() {
    this.$store.dispatch('setPacks', { packs: list });
  },
};
</script>
