<template>
  <div>
    <h1>{{ entry.faTitle }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    entry() {
      console.log(this.$route.query.id);
      let id = this.$route.query.id;
      console.log(this.getEntryById(id));
      return this.getEntryById(id);
    },
    ...mapGetters(["getEntryById"])
  }
};
</script>

<style lang="scss" scoped></style>
