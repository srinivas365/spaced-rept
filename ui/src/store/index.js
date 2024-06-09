import Vue from 'vue'
import Vuex from 'vuex'
import API_PATH from "@/constants/api_paths"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sp_tab_items: ['IP', 'GATE', 'DSA'],
    sp_categories: [],
    sp_levels: [],
    sp_types: [],
    sp_submissions: [],
    sp_pending_count: 0,
    sp_summary: [],
    pg_categories: [],
    pg_values: [],
    overall_progress: [],
    overall_pending: []
  },
  mutations: {
    FETCH_TABS: (state, payload) => {
      state.sp_tab_items = payload.sp_tab_items;
    },
    FETCH_METADATA: (state, payload) => {
      state.sp_categories = payload.sp_categories;
      state.sp_levels = payload.sp_levels;
      state.sp_types = payload.sp_types;
      state.overall_progress = payload.overall_progress;
      state.overall_pending = payload.overall_pending;
    },
    UPDATE_SUBMISSIONS: (state, payload) => {
      state.sp_submissions = [ ...state.sp_submissions, ...payload];
    },
    FETCH_SUBMISSIONS: (state, payload) => {
      state.sp_submissions = payload.submittedList;
      state.sp_pending_count = payload.pendingCount;
    },
    FETCH_SUMMARY: (state, payload) => {
      state.sp_summary = payload.submittedList;
      state.sp_pending_count = payload.pendingCount;
    },
    FETCH_PROGRESS: (state, payload) => {
      state.pg_categories = payload.map(item => item.category);
      state.pg_values = payload.map(item => parseInt(item.progress));
    },
  },
  actions: {
    async fetchTabs({commit}){
      const resp = await this.$axios.post(API_PATH.metadata.get.tabs);
      resp.data && commit('FETCH_TABS', resp.data);
    },
    async fetchMetadata({ commit }, payload){
      const resp = await this.$axios.post(API_PATH.metadata.get.all, payload);
      resp.data && commit('FETCH_METADATA', resp.data );
    },
    async insertSubmission({ commit }, payload){
      const resp = await this.$axios.post(API_PATH.submission.set.one, payload);
      resp.data && commit('UPDATE_SUBMISSIONS', resp.data);
    },
    async fetchSubmissions({ commit }, payload){
      const resp = await this.$axios.post(API_PATH.submission.get.all, payload);
      resp.data && commit('FETCH_SUBMISSIONS', resp.data);
    },
    async fetchSummary({ commit }, payload){
      const resp = await this.$axios.post(API_PATH.submission.get.summary, payload);
      resp.data && commit('FETCH_SUMMARY', resp.data);
    },
    async updateSubmission({ commit }, payload){
      const resp = await this.$axios.post(API_PATH.submission.update.one, payload);
      resp.data && commit('UPDATE_SUBMISSIONS', resp.data);
    },
    async fetchProgress({commit}, payload){
      const resp = await this.$axios.post(API_PATH.submission.get.progress, payload);
      resp.data && commit('FETCH_PROGRESS', resp.data);
    },
  },
  modules: {

  }
})
