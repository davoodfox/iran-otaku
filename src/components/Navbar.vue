<template>
  <nav>
    <ul>
      <li>
        <router-link to="/" exact>خانه</router-link>
      </li>
      <li>
        <router-link to="/list">لیست انیمه‌ها</router-link>
      </li>
      <li>
        <router-link to="/search" exact>جستجو</router-link>
      </li>
    </ul>
    <ul v-if="!isLoggedIn">
      <li>
        <router-link to="/login" exact>ورود</router-link>
      </li>
      <li>
        <router-link to="/register">ثبت نام</router-link>
      </li>
    </ul>
    <ul v-if="isLoggedIn">
      <li>{{ user.name }}</li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    ...mapGetters("user", ["isLoggedIn"])
  }
};
</script>

<style lang="scss">
nav {
  padding: 30px;
  text-align: right;
  background-color: var(--primary-color-dark);
  display: flex;
  justify-content: space-between;

  + div {
    padding: 30px;
  }

  a {
    font-weight: bold;
    color: var(--primary-text-color);
    text-decoration: none;

    &.router-link-active {
      color: var(--primary-color-text);
      border-bottom: 2px solid var(--primary-color-text);
    }
  }
  li {
    list-style: none;

    display: inline-block;
    margin-left: 1rem;
  }
}
</style>
