const jetpack = require('fs-jetpack');
const libs = require('../../vue-icons/build/import.config');

const template = (lib, suffix, names) => {
  let content = `
      <!-- This file was autogenerated in build/icons.js -->
      <template>
      <Icon :icon="icon">
        <component :is="icon.id" />
      </Icon>
    </template>

    <script>
    import { mapActions, mapState } from 'vuex';
    import Icon from '~/components/Icon.vue';
    export default {
      name: 'Icon${suffix}',
      props: {
        icon: {
          type: Object, 
          required: true 
        },
      },
      methods: {
        ...mapActions(['setIcon']),
      },
      components: {
        Icon,
        `;
  for (const name of names) {
    content += `${name}: () => import(/* webpackPrefetch: -1 */ 'vue-icons/dist/${lib.shortName}/sfc/${name}.vue')`;
    content += ',';
  }
  content += '}'; // end components
  // End export
  content += `
    };
    </script>

  `;
  return content;
};

function makeIcons() {
  for (let lib of libs) {
    const paths = jetpack.find(
      `../../vue-icons/vue-icons/dist/${lib.shortName}/sfc`,
      {
        matching: '*.vue',
      }
    );
    let names = paths.map((str) => str.split('/').pop().replace('.vue', ''));
    let suffix = lib.shortName.replace(/[a-z]/g, (match) =>
      match.toUpperCase()
    );
    const component = template(lib, suffix, names);
    jetpack.write(
      `src/components/async/${lib.shortName}/Icon${suffix}.vue`,
      component
    );
  }
}

(() => {
  makeIcons();
})();
