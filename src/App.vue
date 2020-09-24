<template>
  <div id="app">
    <nav id="nav">
      <li>
        <router-link to="/" exact>خانه</router-link>
      </li>
      <li>
        <router-link to="/list">لیست انیمه‌ها</router-link>
      </li>
    </nav>
    <!-- :key="$route.fullPath" => Reload components when the URL changes, including query parameters -->
    <router-view :key="$route.fullPath" />
    <Notification
      v-if="notification.notifications[0]"
      :notification="{
        ...notification.notifications[notification.notifications.length - 1]
      }"
    ></Notification>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Notification from "@/components/Notification.vue";
export default {
  components: {
    Notification
  },
  methods: {
    ...mapActions("entries", ["fetchAllEntries"])
  },
  computed: {
    ...mapState({
      notification: state => state.notification
    })
  },
  mounted() {
    this.fetchAllEntries();
    console.log(this.notification.notifications.length);
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: Shabnam;
  src: url("../node_modules/shabnam-font/dist/Shabnam.eot");
  src: url("../node_modules/shabnam-font/dist/Shabnam.eot?#iefix")
      format("embedded-opentype"),
    url("../node_modules/shabnam-font/dist/Shabnam.woff2") format("woff2"),
    url("../node_modules/shabnam-font/dist/Shabnam.woff") format("woff"),
    url("../node_modules/shabnam-font/dist/Shabnam.ttf") format("truetype");
  font-weight: normal;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  direction: rtl;
  font-family: "Shabnam", Helvetica, Arial, sans-serif;
}
input,
textarea,
button {
  font-family: inherit;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100vh;
  --primary-color-dark: #e64a19;
  --primary-color: #ff5722;
  --primary-color-light: #ffccbc;
  --primary-color-text: #ffffff;
  --accent-color: #cddc39;
  --primary-text-color: #212121;
  --secondary-text-color: #757575;
  --divider-color: #bdbdbd;
}

#nav {
  padding: 30px;
  text-align: right;
  background-color: var(--primary-color-dark);

  + div {
    padding: 30px;
  }

  a {
    font-weight: bold;
    color: var(--primary-text-color);

    &.router-link-active {
      color: var(--primary-color-text);
      border-bottom: 2px solid var(--primary-color-text);
    }
  }
  li {
    list-style: none;

    display: inline-block;
    margin-left: 1rem;
    a {
      text-decoration: none;
    }
  }
}
</style>
