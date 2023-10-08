<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <SideBar />
    <v-container style="padding-left: 0px; margin-left:20px; margin-right:10px;">
      <v-row justify="space-between" style="width: 1400px;">
        <v-col cols="12" sm="12">
          <v-row>
            <v-col cols="12" sm="12">
             <Summary />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Summary from '../components/Summary.vue';


export default {
  data: () => ({
    
  }),
  
  components: {
    SideBar,
    Summary,
  },
};
</script>
