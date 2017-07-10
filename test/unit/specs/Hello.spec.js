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

  const msg = "test";
  const errorGood = {
    response: {
      data: {
        error: {
          message: msg
        }
      }
    }
  };
  const errorBad = { };
  const systemMsg = 'System error occurred. Please try again later as we try to fix this quickly!';

  let personOne = {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 'phoneNumber',
    zipCode: 'zipCode',
    edit: false,
    loading: false
  };
  let personTwo = {
    id: 2,
    firstName: 'firstName',
    fullName: 'full Name',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 1234567890,
    zipCode: 12345,
    edit: false,
    loading: false
  };
  let personThree = {
    id: 3,
    firstName: 'firstName',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 'phoneNumber',
    zipCode: 'zipCode',
    edit: false,
    loading: false
  };
  let personFour = {
    id: 4,
    firstName: 'firstName',
    fullName: 'full Name',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 1234567890,
    zipCode: 12345,
    edit: false,
    loading: false
  };
  let badName = {
    id: 2,
    firstName: 'firstName',
    fullName: 'fullName',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 1234567890,
    zipCode: 12345,
    edit: false,
    loading: false
  };
  const badNameMsg = 'Must have First and Last Name please!';

  let badNumber = {
    id: 2,
    firstName: 'firstName',
    fullName: 'full Name',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 123456789,
    zipCode: 12345,
    edit: false,
    loading: false
  };
  const badNumberMsg = 'Need 10 digits for phone number!';

  const badZip = {
    id: 2,
    firstName: 'firstName',
    fullName: 'full Name',
    lastName: 'lastName',
    dob: 'dob',
    phoneNumber: 1234567890,
    zipCode: 1234,
    edit: false,
    loading: false
  };
  const badZipMsg = 'Need 5 digits for zip code!';

  let getIndex = function(person) {
    let index = -1;
    vm.$store.state.people.forEach(function(v, i) {
      if(v.id === person.id) {
        index = i;
      }
    });
    return index;
  };

  const responseGoodTwo = {
    data: {
      message: msg,
      id: personTwo.id
    }
  };

  const responseGoodFour = {
    data: {
      message: msg,
      id: personFour.id
    }
  };

  let peopleTest = [];
  peopleTest.push(personOne);
  peopleTest.push(personTwo);
  peopleTest.push(personThree);

  const responseRead = {
    data: {
      items: peopleTest
    }
  };

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
    vm = new Constructor({ store: new Vuex.Store(mockedStore)}).$mount();
    let people = [];
    people.push(personOne);
    people.push(personTwo);
    people.push(personThree);
    vm.$store.commit("loadPeople", people);
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
  it('should set create to true', () => {
    vm.createPerson();
    expect(vm.create).to.equal(true);
  });
  it('should set pageLoader to true', () => {
    vm.pageLoadingOn();
    expect(vm.pageLoader).to.equal(true);
  });
  it('should set pageLoader to false', () => {
    vm.pageLoadingOff();
    expect(vm.pageLoader).to.equal(false);
  });
  it('should set creating to true', () => {
    vm.creationLoadingOn();
    expect(vm.creating).to.equal(true);
  });
  it('should set creating to false', () => {
    vm.creationLoadingOff();
    expect(vm.creating).to.equal(false);
  });
  it('should forget newPerson', () => {
    vm.forget();
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });
  it('should set create to false', () => {
    vm.cancelCreate();
    expect(vm.create).to.equal(false);
  });
  it('should send alert to store', () => {
    let type = 'info';
    let msg = 'test';
    let alert = {
      type: type,
      msg: msg,
      countdown: 5
    };
    vm.sendAlert(type, msg);
    expect(JSON.stringify(vm.$store.state.alert)).to.equal(JSON.stringify(alert));
  });
  it('should send success alert to store', () => {
    let type = 'success';
    let msg = 'test';
    let alert = {
      type: type,
      msg: msg,
      countdown: 5
    };
    vm.sendSuccess(msg);
    expect(JSON.stringify(vm.$store.state.alert)).to.equal(JSON.stringify(alert));
  });
  it('should send warning alert to store', () => {
    let type = 'warning';
    let msg = 'test';
    let alert = {
      type: type,
      msg: msg,
      countdown: 5
    };
    vm.sendWarning(msg);
    expect(JSON.stringify(vm.$store.state.alert)).to.equal(JSON.stringify(alert));
  });
  it('should send error alert to store', () => {
    let type = 'danger';
    let msg = 'test';
    let alert = {
      type: type,
      msg: msg,
      countdown: 5
    };
    vm.sendError(msg);
    expect(JSON.stringify(vm.$store.state.alert)).to.equal(JSON.stringify(alert));
  });
  it('should set edit to true', () => {
    vm.editPerson(personTwo);
    expect(vm.$store.state.people[getIndex(personTwo)].edit).to.equal(true);
  });
  it('should set edit to false', () => {
    vm.stopUpdate(personTwo);
    expect(vm.$store.state.people[getIndex(personTwo)].edit).to.equal(false);
  });
  it('should validate person', () => {
    expect(vm.validate(personTwo)).to.equal(true);
  });
  it('should fail person bad name', () => {
    expect(vm.validate(badName)).to.equal(false);
    expect(vm.$store.state.alert.msg).to.equal(badNameMsg);
    expect(vm.$store.state.alert.type).to.equal("warning");
  });
  it('should fail person bad number', () => {
    expect(vm.validate(badNumber)).to.equal(false);
    expect(vm.$store.state.alert.msg).to.equal(badNumberMsg);
    expect(vm.$store.state.alert.type).to.equal("warning");
  });
  it('should fail person bad zip', () => {
    expect(vm.validate(badZip)).to.equal(false);
    expect(vm.$store.state.alert.msg).to.equal(badZipMsg);
    expect(vm.$store.state.alert.type).to.equal("warning");
  });
  it('should validate error and pass it', () => {
    vm.validFailure(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("danger");
  });
  it('should fail validate error and send error', () => {
    vm.validFailure(errorBad);
    expect(vm.$store.state.alert.msg).to.equal(systemMsg);
    expect(vm.$store.state.alert.type).to.equal("danger");
  });
  it('should validate warning and pass it', () => {
    vm.validWarning(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("warning");
  });
  it('should fail validate warning and send error', () => {
    vm.validWarning(errorBad);
    expect(vm.$store.state.alert.msg).to.equal(systemMsg);
    expect(vm.$store.state.alert.type).to.equal("danger");
  });

  //Delete Functions
  it('DELETE SUCCESS: should turn off loading, pass success, and remove person', () => {
    vm.newPerson = personTwo;
    vm.destroySuccess(responseGoodTwo);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("success");
    expect(vm.pageLoader).to.equal(false);
    expect(getIndex(personTwo)).to.equal(-1);
  });
  it('DELETE FAIL: should turn off loading, pass error, and forget', () => {
    vm.newPerson = personTwo;
    vm.destroyFailure(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("danger");
    expect(vm.pageLoader).to.equal(false);
    expect(vm.$store.state.people[getIndex(personTwo)].loading).to.equal(false);
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });

  //Create Functions
  it('CREATE SUCCESS: should turn off loading, pass success, and create person', () => {
    vm.newPerson = personFour;
    vm.storageSuccess(responseGoodFour);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("success");
    expect(vm.creating).to.equal(false);
    expect(vm.create).to.equal(false);
    expect(JSON.stringify(vm.$store.state.people[getIndex(personFour)])).to.equal(JSON.stringify(personFour));
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });
  it('CREATE FAIL: should turn off loading, pass error, and forget', () => {
    vm.newPerson = personTwo;
    vm.storageFailure(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("danger");
    expect(vm.creating).to.equal(false);
    expect(vm.$store.state.people[getIndex(personTwo)].loading).to.equal(false);
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });

  //Update Functions
  it('UPDATE SUCCESS: should turn off loading, pass success, and update person', () => {
    vm.newPerson = personTwo;
    vm.updateSuccess(responseGoodTwo);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("success");
    expect(vm.$store.state.people[getIndex(personTwo)].loading).to.equal(false);
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });
  it('UPDATE FAIL: should turn off loading, pass error, and forget', () => {
    personTwo.firstName = "Thomas";
    vm.newPerson = personTwo;
    vm.updateFailure(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("danger");
    expect(vm.$store.state.people[getIndex(personTwo)].loading).to.equal(false);
    expect(JSON.stringify(vm.$store.state.people[getIndex(personTwo)])).to.equal(JSON.stringify(personTwo));
    expect(JSON.stringify(vm.newPerson)).to.equal(JSON.stringify({}));
  });

  //Update Functions
  it('READ SUCCESS: should turn off loading, pass success, and read people', () => {
    vm.peopleSuccess(responseRead);
    expect(vm.$store.state.people).to.equal(peopleTest);
    expect(vm.pageLoader).to.equal(false);
  });
  it('READ FAIL: should turn off loading, pass error, and forget', () => {
    vm.peopleFailure(errorGood);
    expect(vm.$store.state.alert.msg).to.equal(msg);
    expect(vm.$store.state.alert.type).to.equal("warning");
    expect(vm.pageLoader).to.equal(false);
  });
});
