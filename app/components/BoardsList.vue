<template>
    <v-list>
        <v-subheader>Boards</v-subheader>
        <v-divider></v-divider>
        <v-list-tile v-for="board in boards" :key="board.id" nuxt :to="'/board/' + board.id">
            <v-list-tile-title>{{board.name}}</v-list-tile-title>
            <v-list-tile-action>
                <v-btn fab small flat>
                    <v-icon>edit</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
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
