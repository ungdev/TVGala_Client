<template>
    <transition-group name="fade" tag="table" class="g-schedules">
        <tr v-for="schedule in displayedSchedules" :key="schedule.name" class="g-schedules__line">
            <td class="g-schedules__line__start" v-if="!isPast(schedule.start)">{{ schedule.start | hour }}</td>
            <td class="g-schedules__line__start" v-else>En cours</td>
            <td class="g-schedules__line__name">{{ schedule.name }}</td>
            <td class="g-schedules__line__location">{{ schedule.location }}</td>
        </tr>
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
    border-spacing: 30px;
}

.g-schedules > .g-schedules__line {
    width: 100%;
    max-height: 12%;
    text-align: center;
    font-size: 3vmin;
}

.g-schedules__line > td {
    max-height: 11%;
}

.g-schedules__line > .g-schedules__line__start {
    width: 20%;
    font-weight: bold;
    font-size: 4vmin;
}

.g-schedules__line > .g-schedules__line__name {
    width: 50%;
    font-size: 4.1vmin;
}

.g-schedules__line > .g-schedules__line__location {
    width: 30%;
}
</style>