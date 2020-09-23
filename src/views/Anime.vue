<template>
  <div>
    <h1>{{ entry.entry.faTitle }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.$store.dispatch("fetchEntry", this.id);
  },
  computed: {
    ...mapState(["entry"])
  }
};
</script>

<style lang="scss" scoped></style>
