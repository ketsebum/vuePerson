<template>
  <div>
    <b-alert :show="alert.countdown" dismissible :variant="alert.type" @dismiss-count-down="countDownChanged">
      {{alert.msg}}
    </b-alert>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "vueAlert",
    data() {
        return {
          dismissCountDown: null,
          showDismissibleAlert: false
        }
    },
    computed: mapState([
      // map this.alert to store.state.alert
      'alert'
    ]),
    methods: {
      countDownChanged() {
        this.$store.dispatch('decrementAsync');
      }
    }
  }
</script>
