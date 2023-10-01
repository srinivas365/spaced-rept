<template>
  <v-app-bar color="white" app dark flat >  
    <v-spacer></v-spacer>

    <v-btn color="#2784FF" class="withoutupercase">
        <v-icon left>fas fa-plus</v-icon>
        New Task
    </v-btn>
    
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
<style>
.v-btn.withoutupercase {
  text-transform: none !important;
}</style>