/**
 * Created by ketse on 7/8/17.
 */
import { mutations } from '@/vuex'

const { decrementAlert, sendAlert, loadPeople, addPerson, updatePerson, toggleEditOn, toggleEditOff,
  turnLoadingOn, turnLoadingOff, removePerson} = mutations;

describe('mutations', () => {
  const state = {
    alert: {
      type: 'info',
      msg: 'No alert',
      countdown: 1
    },
    people: []
  };

  let personOne = {};
  let personTwo = {};
  let personThree = {};
  let alertOne = {};
  let people = [];

  let getIndex = function(person) {
    let index = -1;
    state.people.forEach(function(v, i) {
      if(v.id === person.id) {
        index = i;
      }
    });
    return index;
  };

  beforeEach(function() {
    //Reset
    loadPeople(state, []);
    sendAlert(state, {type:'info',msg:'No alert',countdown:1});
    personOne = {
      id: 1,
      firstName: 'firstName',
      lastName: 'lastName',
      dob: 'dob',
      phoneNumber: 'phoneNumber',
      zipCode: 'zipCode',
      edit: false,
      loading: false
    };
    personTwo = {
      id: 2,
      firstName: 'firstName',
      lastName: 'lastName',
      dob: 'dob',
      phoneNumber: 'phoneNumber',
      zipCode: 'zipCode',
      edit: false,
      loading: false
    };
    personThree = {
      id: 3,
      firstName: 'firstName',
      lastName: 'lastName',
      dob: 'dob',
      phoneNumber: 'phoneNumber',
      zipCode: 'zipCode',
      edit: false,
      loading: false
    };
    people = [];
    people.push(personOne);
    people.push(personTwo);
    people.push(personThree);
    alertOne = {
      type: 'warning',
      msg: 'new message',
      countdown: 5
    };
  });

  it('decrementAlert', () => {
    decrementAlert(state);
    expect(state.alert.countdown).to.equal(0);
  });

  it('sendAlert', () => {
    sendAlert(state, alertOne);
    expect(state.alert).to.equal(alertOne);
  });

  it('loadPeople', () => {
    loadPeople(state, people);
    expect(state.people).to.equal(people);
  });

  it('addPerson', () => {
    addPerson(state, personOne);
    expect(state.people.length).to.equal(1);
  });

  it('UpdatePerson', () => {
    loadPeople(state, people);
    personThree.dob = 'lab';
    updatePerson(state, personThree);
    expect(state.people[getIndex(personThree)].dob).to.equal(personThree.dob);
  });

  it('toggleEditOn', () => {
    loadPeople(state, people);
    toggleEditOn(state, personThree.id);
    expect(state.people[getIndex(personThree)].edit).to.equal(true);
  });

  it('toggleEditOff', () => {
    loadPeople(state, people);
    toggleEditOff(state, personThree.id);
    expect(state.people[getIndex(personThree)].edit).to.equal(false);
  });

  it('turnLoadingOn', () => {
    loadPeople(state, people);
    turnLoadingOn(state, personThree.id);
    expect(state.people[getIndex(personThree)].loading).to.equal(true);
  });

  it('turnLoadingOff', () => {
    loadPeople(state, people);
    turnLoadingOff(state, personThree.id);
    expect(state.people[getIndex(personThree)].loading).to.equal(false);
  });

  it('removePerson', () => {
    loadPeople(state, people);
    removePerson(state, personThree.id);
    expect(getIndex(personThree)).to.equal(-1);
  });
});
