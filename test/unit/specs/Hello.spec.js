import Vue from 'vue';
import Vuex from 'vuex';
import Hello from '@/components/Hello';
import BoostrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import mapState from 'vuex'

Vue.use(Vuex);

describe('Hello.vue', () => {
  let mockedStore;
  let Constructor;
  let vm;

  beforeEach(function() {
    mockedStore = {
      state: {
        alert: {
          type: 'info',
          msg: 'No alert',
          countdown: 0
        },
        people: []
      },
      mutations: {
        decrementAlert: state => state.alert.countdown <= 0 ? state.alert.countdown = 0 : state.alert.countdown--,
        sendAlert: (state, alert) => state.alert = alert,
        loadPeople: (state, people) => state.people = people,
        addPerson: (state, person) => state.people.push(person),
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
              v.loading = false;
            }
          });
        },
        toggleEditOn: (state, id) => {
          var id = id;
          state.people.forEach(function(v, i) {
            if (id === v.id) {
              v.edit = true;
            } else {
              v.edit = false;
            }
          });
        },
        toggleEditOff: (state, id) => {
          var id = id;
          state.people.forEach(function(v, i) {
            if (id === v.id) {
              v.edit = false;
            }
          });
        },
        turnLoadingOn: (state, id) => {
          var id = id;
          state.people.forEach(function(v, i) {
            if (id === v.id) {
              v.loading = true;
            }
          });
        },
        turnLoadingOff: (state, id) => {
          var id = id;
          state.people.forEach(function(v, i) {
            if (id === v.id) {
              v.loading = false;
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
      },
      actions: {
        decrementAsync ({ commit }) {
          setTimeout(() => {
            commit('decrementAlert')
          }, 1000)
        }
      }
    };

    Constructor = Vue.extend(Hello);
    Vue.use(BoostrapVue);
    vm = new Constructor({ store: new Vuex.Store(mockedStore)}).$mount()
  });

  it('should render correct contents', () => {
    // const Constructor = Vue.extend(Hello);
    // const vm = new Constructor().$mount();
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .to.equal('Welcome to Your Vue.js App');
  });
  it('should have increment function', () => {
    expect(typeof Hello.methods.createPerson).to.equal('function');
  });
  it('should decrement properly', () => {
    vm.createPerson();
    expect(vm.create).to.equal(true);
  });
});
