<template>
  <div :style="style">
    <p>{{ notification.message }}</p>
    <BaseButton @click.native="remove(notification)">✘</BaseButton>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("notification", ["remove"])
  },
  computed: {
    style() {
      if (this.notification.type == "success") {
        return {
          "--background-color": "green"
        };
      } else if (this.notification.type == "error") {
        return {
          "--background-color": "red"
        };
      } else {
        return {
          "--background-color": "initial"
        };
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.remove(this.notification);
    }, 4500);
  }
};
</script>

<style lang="scss" scoped>
div {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top-right-radius: 5px;
  padding: 1rem 2rem 1rem 1rem;
  background-color: var(--background-color);
  color: #ffffff;

  button {
    position: absolute;
    top: 3px;
    right: 3px;
  }
}
</style>
