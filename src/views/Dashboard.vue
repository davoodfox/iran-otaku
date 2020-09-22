<template>
  <div>
    <h1>انیمه‌های اضافه شده:</h1>
    <ul>
      <!-- <card v-for="entry in this.$store.state.entries" :key="entry.mal_id" :directive="entry"></card> -->
      <!-- <li v-for="entry in this.$store.state.entries" :key="entry.id">
        <h3>{{ entry.faTitle }}</h3>
        <label>
          تغییر نام:
          <input type="text" :v-model="newTitle" />
        </label>
        <BaseButton
          @click.native="
            editEntry({ id: entry.id, updates: { faTitle: newTitle } })
          "
          :colors="{ background: '#33691e', text: '#ffffff' }"
          size="small"
        >ویرایش</BaseButton>
      </li>-->
      <entry v-for="entry in this.$store.state.entries" :key="entry.id" :directive="entry" />
    </ul>
    <modal></modal>
  </div>
</template>

<script>
import modal from "@/components/modal.vue";
import entry from "@/components/entry.vue";
export default {
  components: {
    modal,
    entry
  }
};
</script>

<style lang="scss" scoped>
ul {
  text-align: right;
  display: flex;
  flex-direction: column;
}
</style>
