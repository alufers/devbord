<template>
  <section>
    <div v-for="board in boards" :key="board.id">
      {{board.name}}
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      boards: []
    };
  },
  components: {},
  apollo: {
    boards: gql`
      query getBoards {
        boards {
          id
          name
        }
      }
    `
  }
};
</script>

<style>

</style>
