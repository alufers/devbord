<template>
    <v-navigation-drawer app clipped permanent>
        <BoardList />
    </v-navigation-drawer>
</template>

<script>
import BoardList from "./BoardList";
export default {
  components: {
    BoardList
  }
};
</script>

<style>

</style>
