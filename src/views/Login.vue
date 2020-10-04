<template>
  <div>
    <h2>ورود به حساب کاربری</h2>
    <form @submit.prevent="submit">
      <label for="email">
        ایمیل:
        <input v-model="email" type="email" name="email" value />
      </label>

      <label for="password">
        رمز عبور:
        <input v-model="password" type="password" name="password" value />
      </label>

      <button type="submit" name="button">
        ورود
      </button>

      <router-link to="/register">
        ساخت حساب کاربری
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: "list" });
      });
    },
    ...mapActions("user", ["login"])
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: min-content;
  margin: auto;
  text-align: right;
}
</style>
