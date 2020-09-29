<template>
  <nav>
    <li>
      <router-link to="/" exact>خانه</router-link>
    </li>
    <li>
      <router-link to="/list">لیست انیمه‌ها</router-link>
    </li>
    <li>
      <router-link to="/search" exact>جستجو</router-link>
    </li>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
nav {
  padding: 30px;
  text-align: right;
  background-color: var(--primary-color-dark);

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
