<template>
  <div id="app">
    <Navbar></Navbar>
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
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Notification,
    Navbar
  },
  methods: {
    ...mapActions("entries", ["fetchEntries"])
  },
  computed: {
    ...mapState({
      notification: state => state.notification
    })
  },
  mounted() {
    this.fetchEntries();
  }
};
</script>

<style lang="scss">
@import "./assets/styles/global.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100vh;
}
</style>
