/**
 * Created by ketse on 7/8/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  count: 0
};

export const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--,
};

const store = new Vuex.Store({
  state,
  mutations,
});

export default store
