<template>
    <transition-group name="fade" tag="table" class="g-messages">
        <tr v-for="message in sms" :key="message.createdAt" class="g-messages__line">
            <td class="g-messages__line__hour">{{ message.createdAt | hour }}</td>
            <td class="g-messages__line__content">
                <span class="g-messages__line__content__name">@{{ message.from }} :</span><br />
                {{ message.message | censor(censors) }}
            </td>
        </tr>
    </transition-group>
</template>

<script>
import './lib/censor';
import './lib/dates';

export default {
    props: {
        censors : Array,
        sms: Array
    }
}
</script>

<style lang="css">
.g-messages {
    width: 100%;
    border-spacing: 5px;
}

.g-messages > .g-messages__line {
    width: 100%;
    padding: 1%;
}

.g-messages__line > .g-messages__line__hour {
    font-weight: bold;
    font-size: 2.8vmin;
    border-right: 1px double white;
    padding-right: 7px;
    padding-left: 7px;
    width: 10%;
    vertical-align: top;
}

.g-messages__line > .g-messages__line__content {
    font-size: 2.4vmin;
}

.g-messages__line__content > .g-messages__line__content__name {
    font-size: 2vmin;
    font-weight: bold;
}
</style>