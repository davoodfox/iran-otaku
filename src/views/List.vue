<template>
  <div>
    <h1>انیمه‌های اضافه شده:</h1>
    <ul>
      <entry v-for="entry in entries" :key="entry.id" :directive="entry" />
    </ul>

    <router-link
      class="nav-links"
      v-if="page != 1"
      :to="{ name: 'list', query: { page: page - 1 } }"
      rel="prev"
    >قبلی</router-link>

    <router-link
      class="nav-links"
      v-if="entriesCount > page * 10"
      :to="{ name: 'list', query: { page: page + 1 } }"
      rel="next"
    >بعدی</router-link>

    <modal></modal>
  </div>
</template>

<script>
import modal from "@/components/modal.vue";
import entry from "@/components/entry.vue";
import { mapState } from "vuex";
export default {
  components: {
    modal,
    entry
  },
  computed: {
    page() {
      return Number(this.$route.query.page) || 1;
    },
    ...mapState(["entries", "entriesCount"])
  },
  mounted() {
    this.$store.dispatch("fetchEntries", { perPage: 10, page: this.page });
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
