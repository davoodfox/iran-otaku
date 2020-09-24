<template>
  <div>
    <h1>{{ entry.entry.faTitle }}</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions("entry", ["fetchEntry"])
  },
  computed: {
    ...mapState(["entry"])
  },
  mounted() {
    this.fetchEntry(this.id);
  }
};
</script>

<style lang="scss" scoped></style>
