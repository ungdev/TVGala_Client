<template>
    <transition-group name="fade" tag="div" class="g-schedules">
        <div v-for="schedule in displayedSchedules" :key="schedule.name" class="g-schedules__line">
            <div class="g-schedules__line__start" v-if="!isPast(schedule.start)">À suivre ({{ schedule.start | hour }})</div>
            <div class="g-schedules__line__start" v-else>Maintenant</div>
            <div class="g-schedules__line__name"><span>{{ schedule.name }}</span></div>
        </div>
    </transition-group>
</template>

<script>
import './lib/dates';

export default {
    props: {
        schedules: Array
    },

    data () {
        return {
            currentDate: new Date(),
            timeout    : 0
        };
    },

    methods: {
        isPast(date) {
            return !(new Date(date) > this.currentDate);
        }
    },

    computed: {
        displayedSchedules() {
            return this.schedules
                .filter(schedule => !this.isPast(schedule.end))
                .sort((a, b) => (new Date(a.start) - new Date(b.start)));
        }
    },

    mounted () {
        this.timeout = setInterval(() => {
          this.currentDate = new Date();
        }, 1000);
    },

    beforeDestroy () {
        clearInterval(this.timeout);
    }
}
</script>

<style lang="css">
.g-schedules {
    width: 100%;
    height: 100%;
    border-spacing: 0px;
}

.g-schedules > .g-schedules__line {
    width: 100%;
    height: 42%;
    margin-bottom: 11%;
    text-align: center;
    font-size: 3vmin;
}

.g-schedules__line > td {
    max-height: 11%;
}

.g-schedules__line > .g-schedules__line__start {
    margin-top: 5%;
    margin-left: 12%;
    text-align: left;
    font-weight: bold;
    font-size: 3vmin;
}

.g-schedules__line > .g-schedules__line__name {
    margin-top: 3%;
    margin-left: 6%;
    margin-right: 7%;
    font-size: 6.5vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
}

@media screen and (max-height: 800px){
  .g-schedules > .g-schedules__line {
      margin-bottom: 19%;
  }
}

</style>