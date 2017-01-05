<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <article class="carousel">
        <div class="coming image">
            <div class="title wow slide-in-up" data-wow-delay="0.5s">轻盈上线</div>
            <div class="subtitle wow slide-in-up" data-wow-delay="1s">清新、极简，呈现全新体验方式</div>
        </div>
        <div class="carousel-arrows">
            <span class="arrow arrow-left image" v-on:click="next(loopIndex - 1)"></span>
            <span class="arrow arrow-right image" v-on:click="next(loopIndex + 1)"></span>
        </div>
        <div class="wrapper">
            <div class="carousel-wrapper">
                <img v-for="carousel in carousels"
                     :key="carousel.key" :class="carousel.className"
                     :data-original="carousel.url" width="650" height="450">
            </div>
        </div>
        <div class="carousel-bar">
            <span v-for="carousel in carousels" :class="carousel.className"
                  :key="carousel.key" v-on:click="next(carousel.key)"></span>
        </div>
    </article>
</template>
<script>
    import getLang from '../../resources/lang';

    export default {
        props: ['language'],
        data (){
            return {
                loopIndex: 1,
                loopId: null,
                lang: getLang("en-US"),
                carousels: [
                    {
                        key: 0,
                        url: 'http://static.i5sing.com/image/0.0.1/0.png',
                        className: 'current'
                    },
                    {
                        key: 1,
                        url: 'http://static.i5sing.com/image/0.0.1/1.png',
                        className: 'next'
                    },
                    {
                        key: 2,
                        url: 'http://static.i5sing.com/image/0.0.1/2.png',
                        className: 'none'
                    },
                    {
                        key: 3,
                        url: 'http://static.i5sing.com/image/0.0.1/3.png',
                        className: 'none'
                    },
                    {
                        key: 4,
                        url: 'http://static.i5sing.com/image/0.0.1/4.png',
                        className: 'none'
                    },
                    {
                        key: 5,
                        url: 'http://static.i5sing.com/image/0.0.1/5.png',
                        className: 'pre'
                    }
                ],
                carouselMap: {}
            }
        },
        beforeUpdate: function () {
            this.lang = getLang(this.lang);
        },
        created() {
            this.carousels.forEach(carousel => {
                this.carouselMap[carousel.key] = carousel;
            });
        },
        mounted() {
            this.loop();
        },
        methods: {
            loop() {
                this.loopId = setInterval(() => {
                    this.next(this.loopIndex);
                    this.loopIndex++;
                    if (this.loopIndex == this.carousels.length) this.loopIndex = 0;
                }, 5000);
            },

            reset() {
                this.carousels.forEach(carousel => {
                    carousel.className = 'none';
                });
            },

            next(key) {
                this.reset();
                if (this.loopId) clearInterval(this.loopId);

                key = parseInt(key);
                if (key < 0) this.loopIndex = this.carousels.length - 1;
                else if (key >= this.carousels.length) this.loopIndex = 0;
                else this.loopIndex = key;

                if (this.loopIndex - 1 >= 0) {
                    this.carouselMap[this.loopIndex - 1].className = 'pre';
                } else {
                    this.carouselMap[this.carousels.length - 1].className = 'pre';
                }

                if (this.loopIndex + 1 < this.carousels.length) {
                    this.carouselMap[this.loopIndex + 1].className = 'next';
                } else {
                    this.carouselMap[0].className = 'next';
                }

                this.carouselMap[this.loopIndex].className = 'current';
                this.loop();
                window.lazyload.update();
            }
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .carousel {
        position: relative;
        height: 870px;
    }

    .carousel .coming {
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translate(-50%, 0);
        background-size: 517px 76px;
        width: 517px;
        height: 76px;
        text-align: center;
    }

    .carousel .coming .title {
        font-size: 25px;
        padding-top: 5px;
    }

    .carousel .coming .subtitle {
        font-size: 13px;
        padding-top: 10px;
        opacity: 0.7;
    }

    .carousel .carousel-wrapper {
        position: absolute;
        top: 245px;
        left: 50%;
        width: 100%;
        transform: translate(-50%, 0);
    }

    .carousel .carousel-wrapper img {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        transition-property: transform;
        transition-duration: 0.2s;
        box-shadow: 0 0 20px 0 rgba(111, 111, 109, 0.2);
        transition-timing-function: linear;
    }

    .carousel .carousel-wrapper img.current {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        box-shadow: 0 0 40px 0 rgba(111, 111, 109, 0.2);
        z-index: 100;
    }

    .carousel .carousel-wrapper img.pre {
        position: absolute;
        top: 0;
        left: 50%;
        opacity: 0.5;
        transform: translate(-50%, 0) translate(-100px, 0) scale(0.9, 0.9);
    }

    .carousel .carousel-wrapper img.none {
        display: none;
    }

    .carousel .carousel-wrapper img.next {
        position: absolute;
        top: 0;
        left: 50%;
        opacity: 0.5;
        transform: translate(-50%, 0) translate(100px, 0) scale(0.9, 0.9);
    }

    .carousel .carousel-bar {
        text-align: center;
        position: absolute;
        top: 730px;
        left: 50%;
        width: 100%;
        transform: translate(-50%, 0);
    }

    .carousel .carousel-bar span {
        cursor: pointer;
        margin: 0 4px;
        display: inline-block;
        border-radius: 50%;
        background-color: rgb(215, 226, 230);
        width: 7px;
        height: 7px;
    }

    .carousel .carousel-bar span.current {
        background-color: rgb(123, 212, 244);
    }

    .carousel .carousel-arrows {
        position: absolute;
        width: 980px;
        top: 425px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .carousel .carousel-arrows .arrow {
        display: inline-block;
        width: 25px;
        height: 46px;
        cursor: pointer;
        opacity: 0.7;
    }

    .carousel .carousel-arrows .arrow:hover {
        opacity: 1;
    }

    .carousel .carousel-arrows .arrow-left {
        background-size: 25px 46px;
    }

    .carousel .carousel-arrows .arrow-right {
        display: inline-block;
        position: absolute;
        right: 0;
        background-size: 25px 46px;
    }
</style>