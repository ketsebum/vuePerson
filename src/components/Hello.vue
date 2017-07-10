<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3" v-for="person in people">
          <b-card class="mb2">
            <div slot="header">
              <input v-if="person.edit" v-model.trim="person.fullName" placeholder="Full Name">
              <span v-else="person.edit" class="header" >{{person.firstName}} {{person.lastName}}</span>
            </div>

            <span class="title">Date of Birth: </span>
            <input v-if="person.edit" v-model="person.dob" placeholder="01/01/1900">
            <span v-else="person.edit">{{ person.dob }}</span>
            <br>

            <span class="title">Zip Code: </span>
            <input v-if="person.edit" type="number" v-model.number="person.zipCode" placeholder="12345">
            <span v-else="person.edit">{{ person.zipCode }}</span>
            <br>


            <span class="title">Phone Number: </span>
            <input v-if="person.edit" type="number" v-model.number="person.phoneNumber" placeholder="1234567890">
            <span v-else="person.edit">{{ person.phoneNumber }}</span>
            <br>
            <small slot="footer">
              <b-button v-if="person.edit" class="btn" @click="updatePerson(person)" variant="success">Update</b-button>
              <b-button v-else="person.edit" class="btn" @click="editPerson(person)" variant="success">Edit</b-button>
              <b-button v-if="person.edit" class="btn" @click="stopUpdate(person)" variant="danger">Cancel</b-button>
              <b-button v-else="person.edit" class="btn" @click="deletePerson(person)" variant="danger">Delete</b-button>
            </small>
          </b-card>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
          <b-card class="mb2">
            <div slot="header">
              <input v-if="create" v-model.trim="newPerson.fullName" placeholder="Full Name">
              <span class="header" v-else="create">New Person</span>
            </div>
            <span class="title">Date of Birth: </span><input v-if="create" v-model="newPerson.dob" placeholder="01/01/1900"><br>
            <span class="title">Zip Code: </span><input type="number" v-if="create" v-model.number="newPerson.zipCode" placeholder="12345"><br>
            <span class="title">Phone Number: </span><input type="number" v-if="create" v-model.number="newPerson.phoneNumber" placeholder="1234567890"><br>
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
  import { mapState } from 'vuex'
  import axios from 'axios'

export default {
  name: 'hello',
  data() {
    return {
      baseURL: '/_ah/api/person/v1/',
      getPeopleURL: 'all/users',
      addPersonURL: 'user',
      deletePersonURL: 'user/',
      updatePersonURL: 'update/user/',
      create: false,
      newPerson: {}
    };
  },
  computed: mapState([
      // map this.people to store.state.people
      'people'
  ]),
  created: function () {
      //Grab the people in the database if they exist
    this.peopleFetch();
  },
  methods: {

    //Alert Messaging
    sendAlert: function(type, msg) {
      var alert = {
        type: type,
        msg: msg,
        countdown: 5
      };
      this.$store.commit("sendAlert", alert);
    },
    sendSuccess: function(msg) {
      this.sendAlert('success', msg);
    },
    sendWarning: function(msg) {
      this.sendAlert('warning', msg);
    },
    sendError: function(msg) {
      this.sendAlert('danger', msg);
    },

    //State management for editing
    createPerson: function() {
      this.create = true;
    },
    editPerson: function(person) {
      this.$store.commit("editPerson", person);
    },
    stopUpdate: function(person) {
      this.$store.commit("stopPerson", person);
    },
    cancelCreate: function() {
      this.forget();
      this.create = false;
    },
    forget: function() {
      this.newPerson = {};
    },

    //wrapper functions for DOM interaction
    updatePerson: function(person) {
      this.updateInDatabase(person);
    },
    savePerson: function() {
      this.storeInDatabase();
    },
    deletePerson: function(person) {
      this.destroyPerson(person.id);
    },

    validate: function(person) {
      var nameArray = person.fullName.split(' ');
      if (nameArray.length > 2 || nameArray.length <= 1) {
        this.sendWarning("Must have First and Last Name please!");
        return false;
      }

      if(person.phoneNumber < 1000000000 || person.phoneNumber > 9999999999) {
        this.sendWarning("Need 10 digits for phone number!");
        return false;
      }

      if(person.zipCode < 10000 || person.zipCode > 99999) {
        this.sendWarning("Need 5 digits for zip code!");
        return false;
      }

      return true;
    },

    //Update person functions
    updateInDatabase: function(person) {
      var nameArray = person.fullName.split(' ');
      if (this.validate(person)) {
        person.firstName = nameArray[0];
        person.lastName = nameArray[1];
        this.newPerson = person;
        axios.post(this.baseURL + this.updatePersonURL, this.newPerson).then(this.updateSuccess).catch(this.updateFailure);
      }

    },
    updateSuccess: function(response) {
      this.$store.commit("updatePerson", this.newPerson);
      this.sendSuccess(response.data.message);
      this.forget();
    },
    updateFailure: function(error) {
      this.sendError(error.response.data.error.message);
      this.forget();
    },

    //Create new person functions
    storeInDatabase: function() {
      var nameArray = this.newPerson.fullName.split(' ');
      if (this.validate(this.newPerson)) {
        this.newPerson.firstName = nameArray[0];
        this.newPerson.lastName = nameArray[1];
        axios.post(this.baseURL + this.addPersonURL, this.newPerson).then(this.storageSuccess).catch(this.storageFailure);
      }
    },
    storageSuccess: function(response) {
      this.newPerson.id = response.data.id;
      this.$store.commit("addPerson", this.newPerson);
      this.sendSuccess(response.data.message);
      this.forget();
      this.create = false;
    },
    storageFailure: function(error) {
      this.sendError(error.response.data.error.message);
    },

    //Read people functions
    peopleFetch: function () {
      axios.get(this.baseURL + this.getPeopleURL).then(this.peopleSuccess).catch(this.peopleFailure);
    },
    peopleSuccess: function(response) {
      //Initializing edit as false to get Vue to condition properly
      response.data.items.forEach(function (v, i) {
         v.edit = false;
         v.fullName = v.firstName.concat(' ').concat(v.lastName);
      });
      this.$store.commit("loadPeople", response.data.items);
    },
    peopleFailure: function(error) {
      this.sendWarning(error.response.data.error.message);
    },

    //Delete person functions
    destroyPerson: function (id) {
      axios.delete(this.baseURL + this.deletePersonURL + id).then(this.destroySuccess).catch(this.destroyFailure);
    },
    destroySuccess: function(response) {
      this.$store.commit("removePerson", response.data.id);
      this.sendSuccess(response.data.message);
    },
    destroyFailure: function(error) {
      this.sendError(error.response.data.error.message);
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
