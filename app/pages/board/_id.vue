<template>
  <div v-if="$apollo.loading">
    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <h1 class="heading">{{board && board.name}}</h1>
    <div class="board-areas">
      <v-card v-for="area in board.areas" :key="area.id" class="mr-3 area elevation-1">
        <v-card-title primary-title>
          <div>
            <h3 class="title mb-0">{{area.name}}</h3>
          </div>
        </v-card-title>

        <v-card v-for="card in area.cards " :key="card.id" class="ma-2 pa-3 elevation-3 card" raised>
          <div class="subheading">{{card.title}}</div>
        </v-card>

      </v-card>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  async asyncData({ params }) {
    return {
      id: params.id,
      board: null
    };
  },
  apollo: {
    board: {
      query: gql`
        query getBoardById($id: ID!) {
          board(where: { id: $id }) {
            id
            name
            areas {
              id
              name
              id
              cards: cards(orderBy: index_ASC) {
                id
                title
                index
                content
              }
            }
          }
        }
      `,
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
.area {
  min-width: 300px;
  min-height: 400px;
}
.card {
  min-height: 100px;
}
</style>
