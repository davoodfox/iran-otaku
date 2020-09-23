<template>
  <li>
    <h3>{{ directive.faTitle }}</h3>
    <router-link
      :to="{
        name: 'anime',
        params: { id: directive.id }
      }"
      >برو</router-link
    >
    <form @submit.prevent>
      <label>
        تغییر نام:
        <input type="text" v-model="newTitle" />
      </label>
      <BaseButton
        @click.native="
          editEntry({ id: directive.id, updates: { faTitle: newTitle } })
        "
        :colors="{ background: '#33691e', text: '#ffffff' }"
        size="small"
        >ویرایش</BaseButton
      >
    </form>
  </li>
</template>

<script>
export default {
  props: {
    directive: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTitle: ""
    };
  },
  methods: {
    editEntry({ id, updates }) {
      this.$store.dispatch("editEntry", { id, updates });
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  margin: 3px;
  border: 1px solid #333;
  padding: 5px 15px;
  border-radius: 3px;

  form {
    margin-right: auto;
  }
}
</style>
