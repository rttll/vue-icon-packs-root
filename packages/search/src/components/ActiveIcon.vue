<template>
  <div
    class="fixed z-10 p-4 border border-gray-200 rounded-sm"
    style="width: 30%"
  >
    <div class="relative">
      <a
        href="#"
        class="absolute top-0 right-0 p-2 text-3xl text-gray-400 transform translate-x-4 -translate-y-4 cursor-pointer "
        @click.prevent="setIcon()"
      >
        <!-- <Plus class="transform rotate-45" /> -->
      </a>
      <div
        class="flex flex-col items-center justify-center p-12 space-y-8 text-4xl rounded-sm "
      >
        <Icon :icon="icon" :sidebar="true" />
      </div>
      <h2 class="text-xl text-center">{{ icon.id }}</h2>
      <div class="py-4 my-2 space-y-6 text-sm bg-yellow-50">
        <code class="block">
          <span class="block px-4">// Import</span>
          <input
            type="text"
            class="block w-full p-4 py-2 bg-transparent outline-none"
            onClick="this.setSelectionRange(0, this.value.length)"
            :value="importKey.default"
          />
        </code>
        <code class="block">
          <span class="block px-4"> &lt;!-- Tag -- &gt; </span>
          <input
            type="text"
            class="block w-full p-4 py-2 bg-transparent outline-none"
            onClick="this.setSelectionRange(0, this.value.length)"
            :value="`<${icon.id} />`"
          />
        </code>
      </div>
      <h3 class="text-center">{{ icon.lib.name }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Plus from 'vue-icons/dist/oc/sfc/Plus.vue';
import Icon from './Icon';
export default {
  name: 'ActiveIcon',
  data() {
    return {
      svg: '',
    };
  },
  components: { Icon },
  computed: {
    ...mapState(['icon']),
    importKey() {
      return {
        default: `import { ${this.icon.id} } from 'vue-icons/${this.icon.lib.id}'`,
      };
    },
  },
  methods: {
    ...mapActions(['setIcon']),
  },
};
</script>
