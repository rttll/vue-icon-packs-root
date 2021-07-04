<template>
  <aside class="fixed z-10 p-4 overflow-y-auto" style="width: 30%">
    <div class="border border-gray-200 rounded shadow-sm">
      <div class="relative ">
        <div class="py-20 text-4xl rounded-sm w-ful">
          <Icon :icon="icon" :sidebar="true" />
          <span class=""> </span>
        </div>
        <h2 class="absolute top-0 right-0 p-1 text-xs rounded-tr bg-gray-50 ">
          {{ icon.id }}
        </h2>
      </div>
      <div class="text-sm border-t border-gray-200 bg-gray-50">
        <Input :text="importKey.default" />
        <Input :text="`&lt;${icon.id} /&gt;`" />
      </div>
    </div>
    <div class="flex justify-end mt-4 item-center">
      <div>
        <h3 class="flex-grow text-lg">{{ pack.name }}</h3>
        <div class="flex space-x-2 bottom-1">
          <a class="block text-xs text-blue-400" :href="pack.site">Site</a>
          <a class="block text-xs text-blue-400" :href="pack.license"
            >License</a
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Plus from 'vue-icons/dist/oc/sfc/Plus.vue';
import Input from './Input';
import Icon from './Icon';
export default {
  name: 'ActiveIcon',
  data() {
    return {
      svg: '',
    };
  },
  components: { Icon, Input },
  computed: {
    ...mapState(['icon', 'packs']),
    importKey() {
      return {
        default: `import { ${this.icon.id} } from 'vue-icon-packs/${this.icon.lib.id}'`,
      };
    },
    pack() {
      return this.packs.filter((p) => p.id === this.icon.lib.id)[0];
    },
  },
  methods: {
    ...mapActions(['setIcon']),
  },
};
</script>
