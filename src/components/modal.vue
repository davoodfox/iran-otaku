<template>
  <div class="modal-mask" v-if="showModal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <form @submit.prevent>
          <div>
            <h3>نام اصلی: {{ entry.title }}</h3>
          </div>

          <label>
            نام فارسی:
            <input type="text" v-model="faTitle" />
          </label>
          <div class="button-container">
            <BaseButton
              @click.native="bundleEntry(entry, faTitle)"
              :colors="{ background: '#33691e', text: '#ffffff' }"
              size="medium"
              >ثبت</BaseButton
            >
            <BaseButton
              @click.native="hideModal"
              :colors="{ background: '#bf360c', text: '#ffffff' }"
              size="medium"
              >لغو</BaseButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showModal: false,
      entry: {},
      faTitle: ""
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    bundleEntry(entry, faTitle) {
      this.addEntry({
        enTitle: entry.title,
        faTitle,
        id: entry.mal_id
      });
      this.faTitle = "";
      this.showModal = false;
    },
    ...mapActions("entries", ["addEntry"])
  },
  mounted() {
    this.$root.$on("new-entry", directive => {
      this.entry = directive;
      this.showModal = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  max-width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

form {
  flex-direction: column;
  display: flex;
  align-items: flex-start;

  .button-container {
    align-self: flex-end;
    button:not(:last-child) {
      margin-left: 1rem;
    }
  }
}
</style>
