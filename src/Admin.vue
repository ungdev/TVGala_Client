<template>
Admin
</template>

<script>
import config from './config';

export default {
  data () {
    return {
      informations: [],
      schedules: []
    }
  },
  methods: {

  },
  attached() {
    fetch(`http://${config.server.host}:${config.server.port}/informations`)
      .then(res => res.json())
      .then(results => {
        this.informations = results;
      });

    fetch(`http://${config.server.host}:${config.server.port}/schedules`)
      .then(res => res.json())
      .then(results => {
        this.schedules = results;
      });
  }
}
</script>

<style>
</style>
