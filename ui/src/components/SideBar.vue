<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="#2784FF"
    mini-variant
    mini-variant-width="80"
  >
    <v-avatar class="d-block text-center mx-auto mt-4 mb-16" color="" size="40">
      <v-icon color="white" x-large>fab fa-artstation</v-icon>
    </v-avatar>

    <div
      style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
    ></div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mb-5"
            color="white"
            v-bind="attrs"
            v-on="on"
            style="font-size: 40px"
            >fa-light fa-circle-plus</v-icon
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Submission</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="link"
                    label="Link"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="submitType"
                    :items="sp_types"
                    label="Type"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="level"
                    :items="sp_levels"
                    label="Level"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="category"
                    :items="sp_categories"
                    label="Category"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeSub"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="saveSub"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  async mounted () {
    this.$store.dispatch('fetchMetadata');
  },
  data: () => ({
    link: '',
    submitType: '',
    level: '',
    category: '',
    dialog: false,
    isClickable: true,
    selectedItem: 3,
    drawer: null,
    items: [
      { icon: "fas fa-file-medical-alt" },
      { icon: "fas fa-user-nurse" },
      { icon: "fas fa-virus" },
      { icon: "fas fa-user-md" },
      { icon: "fas fa-comment-medical" },
    ]
  }),
  methods: {
    closeSub() {
      this.dialog = false;
    },
    saveSub() {
      const payload = {
        sp_category: this.category,
        sp_type: this.submitType,
        sp_level: this.level,
        link: this.link,
        rts: 1,
      }

      console.log(payload);
      this.$store.dispatch('insertSubmission', payload);

      this.dialog = false;
      this.category = '';
      this.submitType = '';
      this.level = '';
      this.link = '';
    },
  },
  computed: {
    sp_levels(){
      return this.$store.state.sp_levels;
    },
    sp_categories(){
      return this.$store.state.sp_categories;
    },
    sp_types(){
      return this.$store.state.sp_types;
    },
  },
};
</script>
<style>
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #529dff;
  border-radius: 50%;
  text-decoration: none;
}
.v-list-item-group .v-list-item--active {
  color: white !important;
}
</style>