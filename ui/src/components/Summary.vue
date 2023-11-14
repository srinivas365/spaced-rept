<template>
  <div>
    <v-card color="white" class="rounded-lg" flat>
      <v-sheet tile height="64" class="d-flex">
        <v-toolbar flat>
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="type"
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="weekdays"
            class="ma-2"
          ></v-select>
          <v-select
            v-model="category_filter"
            :items="sp_categories"
            dense
            multiple
            outlined
            hide-details
            class="ma-2"
            label="category"
            @input="filterByCategory"
          >
            <template v-slot:selection="{ item, index }">
              <span
                size="x-small"
                v-if="index < 2"
                class="ml-1 text-grey text-caption align-self-center"
                >{{ index == 0 ? item + ", " : item + " ..." }}</span
              >
            </template>
          </v-select>
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="670">
        <v-calendar
          ref="calendar"
          color="primary"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="sp_summary"
          :event-overlap-mode="mode"
          :event-overlap-threshold="0"
          :event-color="getEventColor"
          :interval-minutes="30"
          :interval-count="48"
          @change="getEvents"
          :event-margin-bottom="5"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
        >
          <v-card color="grey lighten-4" min-width="200px" flat>
            <v-card-text>
              <!-- <span v-html="selectedEvent.link"></span> -->
              <a :href="selectedEvent.link" target="_blank">{{
                selectedEvent.link
              }}</a>
            </v-card-text>
            <v-row style="margin: 10px" v-if="selectedEvent.done !== 1">
              <v-col cols="12" sm="3">
                <v-select
                  v-model="selectedElementType"
                  :items="submitTypes"
                  label="Type"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  v-model="selectedElementLevel"
                  :items="levels"
                  label="Level"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-card-actions v-if="selectedEvent.done !== 1">
              <v-btn text color="primary" @click="onSubmit"> Submit </v-btn>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-card>
    <br /><br />
    <VueApexCharts
      type="treemap"
      height="600"
      :options="treeMapPendingOptions"
      :series="treeMapPendingSeries"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  async onActivated() {
    console.log(":::::::::::::::::on mounted");
    this.$refs.calendar.checkChange();
    await this.$store.dispatch("fetchMetadata");
  },
  components: {
    VueApexCharts,
  },
  data: () => ({
    selectedElementLevel: "",
    selectedElementType: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    category_filter: [],
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: ["red", "green"],
    names: ["Leetcode", "Pyspark", "HDFS", "Azure", "Databricks"],
    levels: ["Very Easy", "Easy", "Medium", "Hard"],
    submitTypes: ["Self", "Editorial"],
    categories: ["Leetcode", "Pyspark", "HDFS", "Azure", "Databricks"],
    treeMapOptions: {
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: "treemap",
      },
      title: {
        text: "Progess in each subject",
        align: "center",
      },
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
    },
    treeMapPendingOptions: {
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: "treemap",
      },
      title: {
        text: "Pending in each subject till now",
        align: "center",
      },
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
        },
        formatter: function (text, op) {
          return [text, op.value];
        },
        offsetY: -4,
      },
    },
  }),
  computed: {
    sp_levels() {
      return this.$store.state.sp_levels;
    },
    sp_categories() {
      return this.$store.state.sp_categories;
    },
    sp_types() {
      return this.$store.state.sp_types;
    },
    sp_summary() {
      return this.$store.state.sp_summary;
    },
    sp_pending_count() {
      return this.$store.state.sp_pending_count;
    },
    treeMapPendingSeries() {
      return [
        {
          data: this.$store.state.overall_pending,
        },
      ];
    },
  },
  methods: {
    async filterByCategory() {
      console.log(this.$refs.calendar);
      console.log(this.category_filter);
      this.getEvents({
        start: this.$refs.calendar.lastStart,
        end: this.$refs.calendar.lastEnd,
      });
    },

    onSubmit() {
      this.selectedEvent.type = this.selectedElementType;
      this.selectedEvent.level = this.selectedElementLevel;
      this.selectedEvent.done = 1;

      console.log(this.selectedEvent);
      this.$store.dispatch("updateSubmission", this.selectedEvent);
      this.selectedEvent.color = "green";

      this.selectedOpen = false;
      this.selectedElementType = "";
      this.selectedElementLevel = "";
    },
    getEvents({ start, end }) {
      console.log(start.date);
      console.log(end.date);
      console.log(this.category_filter);
      this.$store.dispatch("fetchSummary", {
        from: start.date,
        to: end.date,
        categories: this.category_filter,
      });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      console.log("Event:::::::::::::::::::::::::::::::::::::", event);
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => (this.selectedOpen = true));
        });
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => open());
        });
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style>
.v-event {
  margin-left: 5px;
  margin-top: 10px;
  border-radius: 100px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 20px;
  cursor: pointer;
  position: relative;
}
</style>