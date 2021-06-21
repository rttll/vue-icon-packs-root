<template>
  <div class="flex space-y-4">
    <a
      href="#"
      :class="`flex justify-center flex-grow p-4 ${classes}`"
      @click.prevent="setIcon({ icon })"
      v-html="svg"
    >
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { stringify } from 'svgson';
export default {
  name: 'Icon',
  props: { icon: Object, sidebar: Boolean },
  data() {
    return {
      svg: '',
    };
  },
  computed: {
    activeIcon() {
      return this.$store.state.icon;
    },
    imActive() {
      return (
        this.icon.id === this.activeIcon.id &&
        this.icon.lib.id === this.activeIcon.lib.id
      );
    },
    classes() {
      if (this.sidebar) {
        return 'bg-white text-6xl';
      }
      let base = 'text-2xl cursor-pointer hover:bg-gray-100';
      if (this.imActive) base += ' bg-gray-100 ';
      return base;
    },
  },
  watch: {
    icon() {
      this.svg = stringify(this.icon.svg);
    },
  },
  methods: {
    ...mapActions(['setIcon']),
  },
  created() {
    this.svg = stringify(this.icon.svg);
  },
};
</script>
