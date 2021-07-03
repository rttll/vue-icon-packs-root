<template>
  <div class="relative w-full p-4 pt-32">
    <header class="fixed top-0 left-0 z-20 w-full bg-white">
      <div class="relative w-full p-4">
        <div class="relative flex border border-gray-300 rounded-full">
          <div class="flex items-center pl-5">
            <!-- <SearchSolid /> -->
          </div>
          <input
            type="text"
            placeholder="Filter..."
            :value="searchVal"
            v-on:keyup="keyupHandler"
            class="flex-grow p-4 rounded outline-none cursor-pointer"
          />
          <div class="relative pl-4 border-l border-gray-300">
            <a
              href="/"
              v-on:click.prevent="filter.show = !filter.show"
              class="flex items-center p-4 space-x-2 text-sm text-gray-600 cursor-pointer "
            >
              <span>{{ activeLib ? activeLib.name : filter.text }}</span>
              <!-- <ChevronDown /> -->
            </a>
            <ul
              v-if="filter.show"
              class="absolute left-0 z-20 w-full transform -translate-y-1 bg-white border border-gray-300 rounded shadow-lg top-full"
            >
              <li v-for="lib in libs">
                <a
                  href="/"
                  v-on:click.prevent="setLib(lib.id)"
                  class="flex justify-between px-4 py-2 text-sm text-gray-600 border-b border-gray-300 cursor-pointer whitespace-nowrap"
                >
                  <span>{{ lib.name }}</span>
                  <span v-if="activeLib && activeLib.id === lib.id"
                    >&times;</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end">
          <span class="text-sm text-gray-600">
            {{ results.total.length }} Results
          </span>
        </div>
      </div>
    </header>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8" ref="results">
        <IconList :icons="results.batch" />
      </div>
      <div class="col-span-4">
        <ActiveIcon v-if="icon.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { init, search } from '~/search/index.js';
import list from '~/search/packs.manifest.js';
import debounce from 'lodash.debounce';
import shuffle from 'lodash.shuffle';
import { equals } from '../util/helpers';
// import SearchSolid from 'vue-icon-packs/dist/hi/sfc/SearchSolid.vue';
// import { ChevronDown } from 'vue-icon-packs/bx';
// import ChevronDown from 'vue-icon-packs/bx/sfc/ChevronDown.vue';

import IconList from '~/components/IconList';
import ActiveIcon from '~/components/ActiveIcon';
export default {
  name: 'Search',
  components: {
    ActiveIcon,
    IconList,
    // SearchSolid,
    // ChevronDown,
  },
  data() {
    return {
      searchVal: '',
      libs: [],
      filter: {
        show: false,
        text: 'All libraries',
      },
      activeLib: null,
      results: {
        total: [],
        batch: [],
        page: 0,
        loaded: false,
        loading: false,
      },
    };
  },
  computed: {
    ...mapState(['icon']),
  },
  watch: {
    icon(icon) {
      let i = icon.id ? `${icon.lib.id}/${icon.id}` : null;
      this.saveSearch({ i: i });
    },
  },
  methods: {
    ...mapActions(['setIcon']),
    setLib(id) {
      this.filter.show = !this.filter.show;
      if (this.activeLib && this.activeLib.id === id) {
        var lib = null;
        this.saveSearch({ l: null });
      } else {
        var lib = this.libs.filter((lib) => lib.id === id)[0];
        this.saveSearch({ l: lib.id });
      }
      this.activeLib = lib;
      this.sendSearch();
    },
    resetResults() {
      this.results.batch = [];
      this.results.total = [];
      this.results.page = 0;
      document.documentElement.scrollTop = 0;
    },
    sendSearch() {
      this.resetResults();
      if (this.activeLib && this.activeLib.id) {
        search(this.searchVal, this.activeLib.id).then((resp) => {
          this.results.total = this.results.total.concat(resp);
          this.loadNext();
        });
      } else {
        let ids = shuffle(this.libs.map(({ id }) => id));
        let searches = ids.map((id) =>
          search(this.searchVal, id).then((resp) => {
            this.results.total = this.results.total.concat(resp);
          })
        );
        Promise.all(searches).then(() => this.loadNext());
      }
    },
    loadNext() {
      let limit = 100;
      let batch = this.results.total.slice(
        this.results.page * limit,
        this.results.page * limit + limit
      );
      this.results.batch = this.results.batch.concat(batch);
      this.results.page++;
    },
    saveSearch(query) {
      let current = this.$route.query,
        key = Object.keys(query)[0],
        val = query[key],
        newQuery = { ...current, ...query };

      if (!val || val === '') {
        newQuery = JSON.parse(JSON.stringify(current));
        delete newQuery[key];
      }

      if (equals(newQuery, this.$route.query)) {
        return;
      }
      this.$router.replace({
        query: newQuery,
      });
    },
  },
  updated() {
    if (this.results.loading) {
      this.results.loading = false;
    }
  },
  created() {
    const handler = (e) => {
      this.searchVal = e.target.value;
      this.saveSearch({ s: this.searchVal });
      this.sendSearch();
    };
    this.keyupHandler = debounce(handler, 100);
    this.libs = list.map((lib) => ({
      name: lib.name,
      id: lib.id,
    }));

    if (process.isClient) {
      const scroller = () => {
        let el = this.$refs.results;
        let rect = el.getBoundingClientRect();
        let viewport = document.documentElement.clientHeight;
        let bottom = window.scrollY + viewport + 300 > rect.height;
        if (bottom && !this.results.loading) {
          this.results.loading = true;
          this.loadNext();
        }
      };
      const debounceScroller = debounce(scroller, 50);
      window.addEventListener('scroll', debounceScroller);

      let query = this.$route.query;
      init().then(() => {
        if (query) {
          if (query.s) this.searchVal = query.s;
          if (query.l) {
            this.activeLib = this.libs.filter((lib) => lib.id === query.l)[0];
          }
          if (query.i) {
            let [libID, str] = query.i.split('/');
            str = str.replace(/[A-Z]/g, (m) => ` ${m}`);
            search(str, libID).then((resp) => {
              if (resp[0]) this.setIcon({ icon: resp[0] });
            });
          }
        }
        this.sendSearch();
      });
    }
  },
};
</script>
