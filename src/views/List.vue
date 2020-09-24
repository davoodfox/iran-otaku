<template>
  <div>
    <h1>انیمه‌های اضافه شده:</h1>
    <ul>
      <entry v-for="entry in chunk" :key="entry.id" :directive="entry" />
    </ul>

    <router-link
      class="nav-links"
      v-if="list.page != 1"
      :to="{ name: 'list', query: { page: list.page - 1 } }"
      rel="prev"
      >قبلی</router-link
    >

    <router-link
      class="nav-links"
      v-if="count > list.page * 10"
      :to="{ name: 'list', query: { page: list.page + 1 } }"
      rel="next"
      >بعدی</router-link
    >

    <modal></modal>
  </div>
</template>

<script>
import modal from "@/components/modal.vue";
import entry from "@/components/entry.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    modal,
    entry
  },
  methods: {
    ...mapActions("entries", ["fetchEntries"]),
    ...mapActions("list", ["setPage"])
  },
  computed: {
    ...mapState({
      list: state => state.list
    }),
    ...mapGetters("list", ["chunk", "count"])
  },
  mounted() {
    this.setPage(this.$route.query.page || 1);
  }
};
</script>

<style lang="scss" scoped>
ul {
  text-align: right;
  display: flex;
  flex-direction: column;
}
.nav-links {
  padding: 1rem;
}
</style>
