import Vuex from 'vuex';
import debounce from 'lodash.debounce';
import DefaultLayout from '~/layouts/Default.vue';
import store from './store/index';

let y = 0;
const scroller = () => {
  y = document.documentElement.scrollTop;
};

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.config.productionTip = false;
  Vue.config.performance = true;
  Vue.use(Vuex);
  Vue.component('Layout', DefaultLayout);
  appOptions.store = new Vuex.Store(store);

  if (process.isClient) {
    window.addEventListener('scroll', debounce(scroller, 250));
    router.afterEach(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    });
  }
}
