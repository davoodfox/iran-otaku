<template>
  <div>
    <h1>{{ entry.faTitle }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      entry: this.$store.state.entries.find(entry => (entry.id = this.id))
    };
  }
};
</script>

<style lang="scss" scoped></style>
