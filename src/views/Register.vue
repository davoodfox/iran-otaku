<template>
  <div>
    <h2>ثبت نام</h2>
    <form @submit.prevent="submit">
      <label for="name">
        نام:
        <input v-model="name" type="text" name="name" value />
      </label>

      <label for="email">
        ایمیل:
        <input v-model="email" type="email" name="email" value />
      </label>

      <label for="password">
        رمز عبور:
        <input v-model="password" type="password" name="password" value />
      </label>

      <button type="submit" name="button">
        ثبت نام
      </button>

      <router-link to="/login">
        حساب کاربری دارید؟
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
      AuthService.register({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(({ data }) => {
        console.log(data);
      });
    }
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
