<template>
    <div>
        <v-btn fab color="primary" class="ma-3" @click="isOpen = true">
            <v-icon>add</v-icon>
        </v-btn>

        <v-dialog v-model="isOpen" max-width="500px">
            <v-card>
                <v-card-title>
                    <h3 class="heading">New board</h3>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="name" label="Board name" @keyup.enter="createBoard" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" flat @click="isOpen = false">Cancel</v-btn>
                    <v-btn color="primary" dark @click="createBoard">Create board</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import gql from "graphql-tag";
import getBoardsQuery from "../lib/getBoardsQuery";

export default {
  methods: {
    async createBoard() {
      if (this.name.trim() === "") {
        return;
      }
      await this.$apollo.mutate({
        mutation: gql`
          mutation createBoard($name: String!) {
            createBoard(data: { name: $name }) {
              id
              name
            }
          }
        `,
        variables: {
          name: this.name
        },
        update: (cache, { data }) => {
          let { boards } = cache.readQuery({ query: getBoardsQuery });

          cache.writeQuery({
            query: getBoardsQuery,
            data: { boards: [...boards, data.createBoard] }
          });
        }
      });
      this.isOpen = false;
    }
  },
  data() {
    return {
      isOpen: false,
      name: ""
    };
  }
};
</script>

<style>

</style>
