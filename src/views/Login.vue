<template>
  <div>
    <form @submit.prevent="submit">
      <label for="email">
        ایمیل:
      </label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">
        رمز عبور:
      </label>
      <input v-model="password" type="password" name="password" value />

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
import AuthService from "@/services/AuthService.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      AuthService.login({
        email: this.email,
        password: this.password
      }).then(({ data }) => {
        console.log(data);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
