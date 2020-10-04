<template>
  <transition name="fade" appear>
    <div :style="style">
      <p>{{ notification.message }}</p>
      <BaseButton @click.native="remove(notification)">✘</BaseButton>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeout: null
    };
  },
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
      } else if (this.notification.type == "message") {
        return {
          "--background-color": "grey"
        };
      } else {
        return {
          "--background-color": "initial"
        };
      }
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.remove(this.notification);
    }, 4500);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
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
.fade-enter,
.fade-leave-to {
  left: -420px;
}
.fade-enter-to,
.fade-leave {
  left: 0;
}
.fade-enter-active {
  transition: left 0.5s ease-out;
}

.fade-leave-active {
  transition: left 0.5s ease-out;
}
</style>
