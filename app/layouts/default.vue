<template>
  <v-app>

    <v-toolbar app clipped-left>
      <v-toolbar-title>DevBord</v-toolbar-title>
    </v-toolbar>
    <SideNavigationMenu />
    <v-content>

      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import SideNavigationMenu from "../components/SideNavigationMenu";
export default {
  components: {
    SideNavigationMenu
  }
};
</script>
<style>

</style>
