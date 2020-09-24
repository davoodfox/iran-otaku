<template>
  <button :style="compStyle">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    colors: {
      type: Object,
      default: () => ({
        background: "initial",
        text: "initial"
      })
    },
    size: {
      type: String,
      default: "initial"
    },
    cursor: {
      type: String,
      default: "pointer"
    }
  },
  computed: {
    compSize() {
      if (this.size == "small") {
        return {
          height: "20px",
          font: "0.6rem",
          padding: "5px",
          radius: "2px"
        };
      } else if (this.size == "medium") {
        return {
          height: "30px",
          font: "0.9rem",
          padding: "13px",
          radius: "4px"
        };
      } else if (this.size == "large") {
        return { height: "50px", font: "1rem", padding: "20px", radius: "5px" };
      } else {
        return {
          height: "initial",
          font: "initial",
          padding: "initial",
          radius: "initial"
        };
      }
    },
    compStyle() {
      return {
        "--background-color": this.colors.background,
        "--color": this.colors.text,
        "--height": this.compSize.height,
        "--font-size": this.compSize.font,
        "--padding": this.compSize.padding,
        "--border-radius": this.compSize.radius,
        "--cursor": this.cursor
      };
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-size: var(--font-size);
  height: var(--height);
  padding: 0 var(--padding);
  border: none;
  border-radius: var(--border-radius);
  cursor: var(--cursor);
  background-color: var(--background-color);
  color: var(--color);
}
</style>
