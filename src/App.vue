<template>
  <div id="app">
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}


let socket = io.connect('http://localhost:9000');
socket.on('connect',() => {
  console.log('Client has connected to the server!');
});
</script>

<style>
#app {
  background-image:url('../static/background.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
  width:100%;
  height:100%;
}
</style>
