<template>
  <div :class="homeClass">
    <form v-on:submit.prevent="sendQuery">
      <label>
        جستجو کن:
        <input type="text" v-model="queryInputText" />
      </label>
      <BaseButton :colors="{ background: '#ffe78f', text: '#333333' }" size="large">جستجو</BaseButton>
    </form>
    <div>
      <Spinner v-if="isLoading()" />
      <p v-if="isLoading()">در حال جستجوی {{ query }}</p>
      <template v-if="!isLoading() && results.length != 0">
        <p>نتایج جستجو برای {{ query }}:</p>
        <ul>
          <card v-for="result in results" :key="result.mal_id" :directive="result"></card>
        </ul>
      </template>
    </div>
    <modal />
  </div>
</template>

<script>
import jikanjs from "jikanjs";
import Spinner from "@/components/Spinner.vue";
import card from "@/components/card.vue";
import modal from "@/components/modal.vue";
import BaseButton from "@/components/BaseButton.vue";
export default {
  name: "Home",
  components: {
    Spinner,
    card,
    modal,
    BaseButton
  },
  data() {
    return {
      queryInputText: "",
      query: "",
      results: [],
      homeClass: "bg-dark"
    };
  },
  methods: {
    sendQuery() {
      if (this.queryInputText.length < 3) {
        alert("You should type at least 3 letters");
        return;
      }
      this.homeClass = "bg-light";
      this.$store.dispatch("setLoading", true);
      this.query = this.queryInputText;
      this.queryInputText = "";
      jikanjs
        .search("anime", this.query, [1])
        .then(res => {
          this.results = res.results;
          this.$store.dispatch("setLoading", false);
        })
        .catch(error => error);
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped lang="scss">
.bg-dark {
  background-color: #333;

  label {
    color: #fff;
  }
}
.bg-light {
  background-color: #ffc1fa22;

  * {
    color: #333;
  }
}
form {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 30px;

  label {
    display: flex;
    flex-direction: column;
    text-align: right;
    color: #fff;
    font-size: 2rem;
    input {
      width: 80vw;
      height: 50px;
      font-size: 2rem;
      direction: ltr;
      border: none;
      border-radius: 0 5px 5px 0;
      margin-top: 1rem;
      padding-left: 1rem;
      color: #333;
    }
  }
  button {
    border-radius: 5px 0 0 5px;
  }
  button,
  input {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }
}
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 250px;
  gap: 1rem;
  padding: 1rem;
}
</style>
