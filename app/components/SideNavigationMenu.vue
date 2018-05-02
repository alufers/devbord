<template>
    <v-navigation-drawer app clipped permanent>
        <BoardsList />
    </v-navigation-drawer>
</template>

<script>
import BoardsList from "./BoardsList";
export default {
  components: {
    BoardsList
  }
};
</script>

<style>

</style>
