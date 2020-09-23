import Vue from "vue";
import Vuex from "vuex";

import entry from "@/store/modules/entry.js";
import entries from "@/store/modules/entries.js";
import search from "@/store/modules/search.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entry,
    entries,
    search
  }
});
