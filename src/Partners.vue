<template>
    <transition name="fade">
        <div class="g-partners" v-show="show">
            <div v-if="partnerIndex > -1" class="g-partners__image"><img :src="displayedPartner" /></div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        images      : Array,
        partners: Array
    },

    data() {
        return {
            partnerIndex: -1,
            show            : false,
            timeBetweenPartners: 5000
        };
    },

    computed: {

        displayedPartner() {
            if (this.partnerIndex > -1 && this.partners.length > 0) {
                return this.partners[this.partnerIndex];
            }
            return '';
        },
    },

    methods: {
        displayNextPartner() {
            const testIndex = this.partnerIndex + 1;
            if (this.partners.length === 0) {
                return setTimeout(this.displayNextPartner, 5000);
            } else if (this.partners.length === 0 || !this.partners[testIndex]) {
                this.partnerIndex = -1;
                return this.displayNextPartner();
            }

            this.partnerIndex += 1;
            setTimeout(this.showpartner, 500);
            setTimeout(this.hidePartner, this.timeBetweenPartners - 500);
            setTimeout(this.displayNextPartner, this.timeBetweenPartners);
        },

        hidePartner() {
            this.show = false;
        },

        showPartner() {
            this.show = true;
        }
    },

    mounted () {
        this.displayNextPartner();
    }
}
</script>

<style lang="css">
.g-partners {
    height: 100%;
    width: 100%;
    display: block !important;
}
.g-partners > .g-partners__image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.g-partners > .g-partners__image > img {
  width: 83%;
  height: 83%;
}
</style>
