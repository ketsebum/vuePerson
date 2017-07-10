/**
 * Created by ketse on 7/8/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = {
  alert: {
    type: 'info',
    msg: 'No alert',
    countdown: 0
  },
  people: []
};

export const mutations = {
  decrementAlert: state => state.alert.countdown <= 0 ? state.alert.countdown = 0 : state.alert.countdown--,
  sendAlert: (state, alert) => state.alert = alert,
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
  updatePerson: (state, person) => {
    var id = person.id;
    state.people.forEach(function(v, i) {
      if (id === v.id) {
        v.firstName = person.firstName;
        v.lastName = person.lastName;
        v.dob = person.dob;
        v.zipCode = person.zipCode;
        v.phoneNumber = person.phoneNumber;
        v.edit = false;
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

export const actions = {
  decrementAsync ({ commit }) {
    setTimeout(() => {
      commit('decrementAlert')
    }, 1000)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

export default store
