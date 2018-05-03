<template>
  <div v-if="$apollo.loading">
    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <h1 class="heading">
      <EditableName :value="board.name" @input="renameBoard($event)" />
    </h1>
    <div class="board-areas">
      <BoardArea v-for="area in board.areas" :key="area.id" :area="area" :board="board" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import EditableName from "../../components/EditableName";
import draggable from "vuedraggable";
import BoardArea from "../../components/BoardArea";
import getBoardByIdQuery from "../../lib/getBoardByIdQuery";

export default {
  components: {
    EditableName,
    draggable,
    BoardArea
  },
  async asyncData({ params }) {
    return {
      id: params.id,
      board: null
    };
  },
  methods: {
    async renameBoard(newName) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation renameBoard($boardId: ID!, $newName: String!) {
            updateBoard(where: { id: $boardId }, data: { name: $newName }) {
              id
              name
            }
          }
        `,
        variables: {
          boardId: this.id,
          newName
        }
      });
    }
  },
  apollo: {
    board: {
      query: getBoardByIdQuery,
      variables() {
        return { id: this.id };
      }
    }
  }
};
</script>

<style scoped>
.board-areas {
  display: flex;
  flex-direction: row;
}
</style>
