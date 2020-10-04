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
        @click.native="submit(directive.id)"
        :colors="{ background: '#33691e', text: '#ffffff' }"
        size="small"
        >ویرایش</BaseButton
      >
    </form>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    submit(id) {
      if (!this.isLoggedIn) {
        const notification = {
          type: "message",
          message: "برای این کار نیاز به عضویت دارید."
        };
        this.add(notification);
        return;
      }
      this.editEntry({
        id,
        updates: { faTitle: this.newTitle }
      });
    },
    ...mapActions("entries", ["editEntry"]),
    ...mapActions("notification", ["add"])
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
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
