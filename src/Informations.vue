<template>
    <transition name="fade">
        <div class="g-informations" v-show="show">
            <span v-if="informationIndex > -1" class="g-informations__message">{{ displayedInformation }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        images      : Array,
        informations: Array
    },

    data() {
        return {
            informationIndex: -1,
            show            : false,
            timeBetweenInfos: 5000
        };
    },

    computed: {

        displayedInformation() {
            if (this.informationIndex > -1 && this.informations.length > 0) {
                return this.informations[this.informationIndex].message;
            }

            return '';
        },
    },

    methods: {
        displayNextInformation() {
            const testIndex = this.informationIndex + 1;
            if (this.informations.length === 0) {
                return setTimeout(this.displayNextInformation, 2000);
            } else if (this.informations.length === 0 || !this.informations[testIndex]) {
                this.informationIndex = -1;
                return this.displayNextInformation();
            }

            this.informationIndex += 1;
            setTimeout(this.showInfo, 500);
            setTimeout(this.hideInfo, this.timeBetweenInfos - 500);
            setTimeout(this.displayNextInformation, this.timeBetweenInfos);
        },

        hideInfo() {
            this.show = false;
        },

        showInfo() {
            this.show = true;
        }
    },

    mounted () {
        this.displayNextInformation();
    }
}
</script>

<style lang="css">
.g-informations {
    padding-top: 18px;
    height: 100%;
    width: 98%;
    text-align: center;
    margin: auto;
    font-size: 3vmin;
}
</style>
