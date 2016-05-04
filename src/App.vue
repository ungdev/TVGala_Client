<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  }
}


let socket = io.connect('http://localhost:9000');
socket.on('connect',() => {
  console.log('Client has connected to the server!');
});
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
