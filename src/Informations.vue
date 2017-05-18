<template>
    <transition name="fade">
        <div class="g-informations" v-show="show">
            <span v-if="informationIndex > -1" class="g-informations__message">{{ displayedInformation }}</span>
            <span v-if="imagesIndex > -1" class="g-informations__images">
                <img :src="image" v-for="image in displayedImages" class="g-informations__images__image" />
            </span>
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
            imagesIndex     : -1,
            imagesPerInfo   : 5,
            show            : false,
            timeBetweenInfos: 5000
        };
    },

    computed: {
        displayedImages() {
            if (this.imagesIndex > -1 && this.images.length > 0) {
                return this.paginatedImages[this.imagesIndex];
            }

            return [];
        },

        displayedInformation() {
            if (this.informationIndex > -1 && this.informations.length > 0) {
                return this.informations[this.informationIndex].message;
            }

            return '';
        },

        paginatedImages() {
            const pImages = [];

            for (let i = 0; i < this.pagesNumber; i++) {
                pImages[i] = [];

                for (let j = i * this.pagesNumber; j < (i + 1) * this.pagesNumber; j++) {
                    if (this.images[j]) {
                        pImages[i].push(this.images[j]);
                    }
                }
            }

            return pImages;
        },

        pagesNumber() {
            return Math.ceil(this.images.length / this.imagesPerInfo);
        }
    },

    methods: {
        displayNextInformation() {
            const testIndex = this.informationIndex + 1;
            if (this.informations.length === 0 && this.images.length === 0) {
                return setTimeout(this.displayNextInformation, 1000);
            } else if (this.informations.length === 0 || !this.informations[testIndex]) {
                this.informationIndex = -1;
                return this.displayNextImages();
            }

            this.informationIndex += 1;
            setTimeout(this.showInfo, 500);
            setTimeout(this.hideInfo, this.timeBetweenInfos - 500);
            setTimeout(this.displayNextInformation, this.timeBetweenInfos);
        },

        displayNextImages() {
            const testIndex = this.imagesIndex + 1;
            if (this.images.length === 0 || !this.paginatedImages[testIndex]) {
                this.imagesIndex = -1;
                return this.displayNextInformation();
            }
            this.imagesIndex += 1;
            setTimeout(this.showInfo, 500);
            setTimeout(this.hideInfo, this.timeBetweenInfos - 500);
            setTimeout(this.displayNextImages, this.timeBetweenInfos);
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
    height: 100%;
    width: 98%;
    text-align: center;
    margin: auto;
    font-size: 6vmin;
    line-height: 120%;
}

.g-informations__images > .g-informations__images__image {
    margin-top: 0.5%;
    max-height: 90%;
    max-width: 15%;
    margin-left: 2%;
    margin-right: 2%;
    vertical-align: middle;
    line-height: 100%;
}
</style>
