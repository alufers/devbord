<template>
  <v-card>
    <boardList />
    <newBoardDialog />
  </v-card>
</template>

<script>
import BoardList from "../components/BoardList";
import NewBoardDialog from "../components/NewBoardDialog";

export default {
  components: {
    BoardList,
    NewBoardDialog
  }
};
</script>

<style>

</style>
