/**
 * Created by ketse on 7/8/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  count: 0,
  people: []
};

export const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--,
  loadPeople: (state, people) => state.people = people,
  addPerson: (state, person) => state.people.push(person),
  editPerson: (state, person) => {
    var id = person.id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.edit = true;
      }
    });
  },
  stopPerson: (state, person) => {
    var id = person.id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.edit = false;
      }
    });
  },
  removePerson: (state, id) => {
    var index = -1;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        index = i;
      }
    });
    state.people.splice(index, 1);
  }
};

const store = new Vuex.Store({
  state,
  mutations,
});

export default store
