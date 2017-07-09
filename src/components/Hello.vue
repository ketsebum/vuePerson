<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3" v-for="person in people">
          <b-card class="mb2">
            <div slot="header">
              <input v-if="person.edit" v-model.trim="person.fullName" :placeholder="person.firstName.concat(' ').concat(person.lastName)">
              <span v-else="person.edit" class="header" >{{person.firstName}} {{person.lastName}}</span>
            </div>

            <span class="title">Date of Birth: </span>
            <input v-if="person.edit" v-model="person.dob" :placeholder="person.dob">
            <span v-else="person.edit">{{ person.dob }}</span>
            <br>

            <span class="title">Zip Code: </span>
            <input v-if="person.edit" type="number" v-model.number="person.zipCode" :placeholder="person.zipCode">
            <span v-else="person.edit">{{ person.zipCode }}</span>
            <br>


            <span class="title">Phone Number: </span>
            <input v-if="person.edit" type="number" v-model.number="person.phoneNumber" :placeholder="person.phoneNumber">
            <span v-else="person.edit">{{ person.phoneNumber }}</span>
            <br>
            <small slot="footer">
              <b-button v-if="person.edit" class="btn" @click="updatePerson(person)" variant="success">Update</b-button>
              <b-button v-else="person.edit" class="btn" @click="editPerson(person)" variant="success">Edit</b-button>
              <b-button v-if="person.edit" class="btn" @click="stopUpdate(person)" variant="danger">Cancel</b-button>
              <b-button v-else="person.edit" class="btn" @click="destroyPerson(person.id)" variant="danger">Delete</b-button>
            </small>
          </b-card>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
          <b-card class="mb2">
            <div slot="header">
              <input v-if="create" v-model.trim="fullName" placeholder="Name">
              <span class="header" v-else="create">New Person</span>
            </div>
            <span class="title">Date of Birth: </span><input v-if="create" v-model="newPerson.dob" placeholder="01/01/1900"><br>
            <span class="title">Zip Code: </span><input type="number" v-if="create" v-model.number="newPerson.zipCode" placeholder="12345"><br>
            <span class="title">Phone Number: </span><input type="number" v-if="create" v-model.number="newPerson.phoneNumber" placeholder="123456789"><br>
            <small slot="footer">
              <b-button class="btn" v-if="create" @click="savePerson" variant="success">Save</b-button>
              <b-button class="btn" v-else="create" @click="createPerson" variant="success">Create</b-button>
              <b-button class="btn" v-if="create" @click="cancelCreate" variant="danger">Cancel</b-button>
            </small>
          </b-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
      mapState
  } from 'vuex'
  import axios from 'axios'

export default {
  name: 'hello',
  data() {
    return {
      baseURL: '/_ah/api/person/v1/',
      getPeopleURL: 'all/users',
      addPersonURL: 'user',
      deletePersonURL: 'user/',
      create: false,
      newPerson: {},
      fullName: ''
    };
  },
  computed: mapState([
      // map this.people to store.state.people
      'people'
  ]),
  created: function () {
    this.fetchPeople();
  },
  methods: {
    createPerson: function() {
      this.create = true;
    },
    editPerson: function(person) {
      this.$store.commit("editPerson", person);
    },
    stopUpdate: function(person) {
      this.$store.commit("stopPerson", person);
    },
    updatePerson: function(person) {
      person.edit = false;
    },
    savePerson: function() {
      this.storeInDatabase();
      this.forget();
      this.create = false;
    },
    cancelCreate: function() {
      this.forget();
      this.create = false;
    },
    forget: function() {
        this.newPerson = {};
    },
    storeInDatabase: function() {
      var nameArray = this.fullName.split(' ');
      this.newPerson.firstName = nameArray[0];
      this.newPerson.lastName = nameArray[1];
      axios.post(this.baseURL + this.addPersonURL, this.newPerson).then(this.storageSuccess).catch(this.storageFailure);
    },
    storageSuccess: function(response) {
      this.newPerson.id = response.data.message;
      this.$store.commit("addPerson", this.newPerson);
    },
    storageFailure: function(response) {
      console.log(response);
    },
    fetchPeople: function () {
      axios.get(this.baseURL + this.getPeopleURL).then(this.peopleSuccess).catch(this.peopleFailure);
    },
    peopleSuccess: function(response) {
        //Initializing edit as false to get Vue to condition properly
      response.data.items.forEach(function (v, i) {
         v.edit = false;
      });
      this.$store.commit("loadPeople", response.data.items);
    },
    peopleFailure: function(response) {
      console.log(response);
    },
    destroyPerson: function (id) {
      axios.delete(this.baseURL + this.deletePersonURL + id).then(this.destroySuccess).catch(this.destroyFailure);
    },
    destroySuccess: function(response) {
      this.$store.commit("removePerson", response.data.message);
    },
    destroyFailure: function(response) {
      console.log(response);
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
  color: #42b983;
}
.mb2 {
  margin-bottom: 2px;
}
</style>
