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
      <v-card class="new-area-placeholder">
        <v-btn flat class="new-area-button" block @click="addArea">
          <v-icon>
            add
          </v-icon>
        </v-btn>
      </v-card>
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
    },
    async addArea() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation addBoardArea($boardId: ID!) {
            createBoardArea(
              data: { name: "New area", board: { connect: { id: $boardId } } }
            ) {
              id
              name
              cards: cards(orderBy: index_ASC) {
                area {
                  id
                }
                id
                title
                index
                content
              }
            }
          }
        `,
        variables: {
          boardId: this.id
        },
        update: (cache, { data }) => {
          let { board } = cache.readQuery({
            query: getBoardByIdQuery,
            variables: {
              id: this.id
            }
          });
          board.areas.push(data.createBoardArea);
          cache.writeQuery({
            query: getBoardByIdQuery,
            variables: {
              id: this.id
            },
            data: { board }
          });
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
.new-area-placeholder {
  min-width: 300px;
  min-height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
}
.new-area-button {
  height: 100%;
}
</style>
