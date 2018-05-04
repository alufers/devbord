<template>
  <v-card class="mr-3 area elevation-1">
    <v-card-title primary-title>
      <div>
        <h3 class="title mb-0">
          <EditableName :value="area.name" @input="renameBoardArea(area.id, $event)" />
        </h3>
      </div>
    </v-card-title>
    <div>
      <draggable v-model="draggableCards" :options="{group: 'cards'}" class="drag-area">
        <v-card v-for="card in area.cards" :key="card.id" class="ma-2 pa-3 elevation-3 card" raised>
          <div class="subheading">
            <EditableName :value="card.title" @input="renameCard(card.id, $event)" />
          </div>
        </v-card>
      </draggable>
      <v-btn color="primary" class="ma-2 add-button" @click="addCard(area)">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import draggable from "vuedraggable";
import EditableName from "./EditableName";
import gql from "graphql-tag";
import getBoardByIdQuery from "../lib/getBoardByIdQuery";

export default {
  components: {
    draggable,
    EditableName
  },
  props: {
    area: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    async renameBoardArea(areaId, newName) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation renameBoardArea($areaId: ID!, $newName: String!) {
            updateBoardArea(where: { id: $areaId }, data: { name: $newName }) {
              id
              name
            }
          }
        `,
        variables: {
          areaId,
          newName
        }
      });
    },
    async renameCard(cardId, newTitle) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation renameCard($cardId: ID!, $newTitle: String!) {
            updateCard(where: { id: $cardId }, data: { title: $newTitle }) {
              id
              title
            }
          }
        `,
        variables: {
          cardId,
          newTitle
        }
      });
    },
    async addCard(area) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation addCard($areaId: ID!, $index: Int!) {
            createCard(
              data: {
                title: "New card"
                content: ""
                index: $index
                area: { connect: { id: $areaId } }
              }
            ) {
              id
              title
              content
              index
              area {
                id
              }
            }
          }
        `,
        variables: {
          areaId: area.id,
          index: area.cards.length
        },
        update: (cache, { data }) => {
          let { board } = cache.readQuery({
            query: getBoardByIdQuery,
            variables: { id: this.board.id }
          });

          board.areas
            .find(a => a.id === this.area.id)
            .cards.push(data.createCard);
          cache.writeQuery({
            query: getBoardByIdQuery,
            variables: { id: this.board.id },
            data: { board }
          });
        }
      });
    }
  },
  computed: {
    draggableCards: {
      get() {
        return this.area.cards;
      },
      set(newOrder) {
        for (let i = 0; i < newOrder.length; i++) {
          let storedCard = this.$apollo.getClient().cache.readFragment({
            id: "Card:" + newOrder[i].id,
            fragment: gql`
              fragment myCard on Card {
                id
                index
                area {
                  id
                }
              }
            `
          });
          // do not mutate the card if nothing has changed
          if (storedCard.index === i && storedCard.area.id === this.area.id)
            continue;
          // don't await because we want to do everything in parallel
          this.$apollo.mutate({
            mutation: gql`
              mutation moveCard($cardId: ID!, $areaId: ID!, $index: Int!) {
                updateCard(
                  where: { id: $cardId }
                  data: { index: $index, area: { connect: { id: $areaId } } }
                ) {
                  id
                  index
                  area {
                    id
                  }
                }
              }
            `,
            variables: {
              cardId: newOrder[i].id,
              areaId: this.area.id,
              index: i
            },
            optimisticResponse: {
              updateCard: {
                __typename: "Card",
                id: newOrder[i].id,
                index: i,
                area: {
                  __typename: "BoardArea",
                  id: this.area.id
                }
              }
            },
            update: (cache, { data }) => {
              let { board } = cache.readQuery({
                query: getBoardByIdQuery,
                variables: { id: this.board.id }
              });

              board.areas.forEach(a => {
                a.cards = a.cards.filter(c => {
                  if (c.id === data.updateCard.id) {
                    c.index = data.updateCard.index;
                  }
                  if (c.area.id === a.id) {
                    // card is supposed to be here
                    return true;
                  }
                  // remove card from old area via filter and add to the nwe one
                  board.areas
                    .find(na => na.id === data.updateCard.area.id)
                    .cards.push(c);
                  return false;
                });
              });

              board.areas.forEach(a =>
                a.cards.sort((ca, cb) => ca.index - cb.index)
              ); // sort cards by indexes

              cache.writeQuery({
                query: getBoardByIdQuery,
                variables: { id: this.board.id },
                data: { board }
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.area {
  min-width: 300px;
  min-height: 400px;
}
.card {
  min-height: 100px;
  user-select: none;
}
.drag-area {
  min-height: 100px;
}
.add-button {
  width: calc(100% - 16px);
}
</style>
