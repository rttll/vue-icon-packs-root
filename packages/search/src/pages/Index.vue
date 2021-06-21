<template>
  <Layout>
    <div class="flex">
      <Search />
    </div>
  </Layout>
</template>

<script>
import Search from '../components/Search.vue';
export default {
  metaInfo: {
    title: 'Hello, world!',
  },
  components: { Search },
};
</script>
