<template>
  <v-card color="white" class="rounded-lg mt-2" flat>
    <v-row justify="center" class="pt-2">
      <v-date-picker
        v-model="picker"
        color="#2784FF"
        width="260"
      ></v-date-picker>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
};
</script>

<style>
</style>