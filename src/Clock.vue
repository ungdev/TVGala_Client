<template>
    <span>{{ currentHour | hour }}</span>
</template>

<script>
import './lib/dates.js';

export default {
    data () {
        return {
            currentHour: new Date(),
            timeout    : 0
        };
    },

    mounted () {
        this.timeout = setInterval(() => {
          this.currentHour = new Date();
        }, 1000);
    },

    beforeDestroy () {
        clearInterval(this.timeout);
    }
}
</script>