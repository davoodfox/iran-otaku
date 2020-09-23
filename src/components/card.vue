<template>
  <li>
    <div class="details-container">
      <h4 v-if="isEntry(directive.mal_id)">
        {{ findEntry(directive.mal_id).faTitle }}
      </h4>
      <h4>{{ directive.title }}</h4>
      <p>
        {{ parseDate(directive.start_date).year }}
        <template v-if="directive.type == 'TV'"
          >- {{ parseDate(directive.end_date).year }}</template
        >
      </p>
      <p>{{ directive.type }}</p>

      <BaseButton
        v-if="!isEntry(directive.mal_id)"
        @click.native="subEvent(directive)"
        :colors="{ background: '#33691e', text: '#ffffff' }"
        size="small"
        >اضافه</BaseButton
      >

      <BaseButton
        v-else
        @click.native="deleteFromEntries(directive.mal_id)"
        :colors="{ background: '#bf360c', text: '#ffffff' }"
        size="small"
        >حذف</BaseButton
      >
    </div>
    <div class="image-container">
      <img :src="directive.image_url" :alt="directive.title" />
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    directive: {
      type: Object,
      required: true
    }
  },
  methods: {
    subEvent(directive) {
      this.$root.$emit("new-entry", directive);
    },
    parseDate(date) {
      var newDate;
      if (!date) {
        newDate = new Date();
      } else {
        newDate = new Date(date);
      }
      return {
        year: newDate.getFullYear()
      };
    },
    isEntry(id) {
      return this.$store.getters.ids.includes(id);
    },
    findEntry(id) {
      return this.entries.allEntries.find(entry => entry.id == id);
    },
    addToEntries(id) {
      this.$store.dispatch("addEntry", id);
    },
    deleteFromEntries(id) {
      this.$store.dispatch("deleteEntry", id);
    }
  },
  computed: {
    ...mapState({
      entries: state => state.entries
    })
  }
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin: 1rem 0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);

  .details-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    padding: 1rem;
  }

  h4,
  p {
    text-align: left;
  }

  button {
    margin: auto auto 0 0;
  }
  .image-container {
    max-width: 50%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 10px 10px 0;
    box-shadow: -1px 0 1px rgba(0, 0, 0, 0.15), -2px 0 2px rgba(0, 0, 0, 0.1),
      -4px 0 4px rgba(0, 0, 0, 0.05);
  }
}
</style>
