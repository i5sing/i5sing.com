<template>
    <article class="carousel-component">
        <div class="coming image">
            <div class="title wow slide-in-up" data-wow-delay="0.5s">轻盈上线</div>
            <div class="subtitle wow slide-in-up" data-wow-delay="1s">清新、极简，呈现全新体验方式</div>
        </div>
        <!--<div class="carousel-arrows">-->
        <!--<span class="arrow arrow-left image" v-on:click="next(loopIndex - 1)"></span>-->
        <!--<span class="arrow arrow-right image" v-on:click="next(loopIndex + 1)"></span>-->
        <!--</div>-->
        <div class="wrapper">
            <div class="carousel-wrapper">
                <div id="carousel-hook"></div>
            </div>
        </div>
    </article>
</template>
<script>
    import getLang from '../../resources/lang';
    import carouselImages from '../../resources/images/carousel';
    import Carousel from '../service/carousel';

    export default {
        props: ['language'],
        data (){
            return {
                carousels: carouselImages,
                current: 0,
                carousel: null,
                intervalId: null,
            }
        },
        beforeUpdate: function () {
            this.lang = getLang(this.lang);
        },
        created() {

        },
        mounted() {
            this.carousel = new Carousel({
                wrap: $('#carousel-hook'),
                data: carouselImages
            });
        }
    }
</script>
<style lang="less" scoped>
    .carousel-component {
        position: relative;
        height: 870px;

        .coming {
            position: absolute;
            top: 120px;
            left: 50%;
            transform: translate(-50%, 0);
            background-size: 517px 76px;
            width: 517px;
            height: 76px;
            text-align: center;

            .title {
                font-size: 25px;
                padding-top: 5px;
            }

            .subtitle {
                font-size: 14px;
                padding-top: 10px;
                opacity: 0.7;
            }
        }

        .carousel-wrapper {
            position: absolute;
            top: 245px;
            left: 50%;
            width: 100%;
            transform: translate(-50%, 0);
        }

        .carousel-arrows {
            //TODO 暂时关闭左右箭头
            display: none;
            position: absolute;
            width: 1050px;
            top: 425px;
            left: 50%;
            transform: translate(-50%, 0);

            .arrow {
                display: inline-block;
                width: 25px;
                height: 46px;
                cursor: pointer;
                opacity: 0.7;
            }

            .arrow:hover {
                opacity: 1;
            }

            .arrow-left {
                cursor: pointer;
                background-size: 25px 46px;
            }

            .arrow-right {
                cursor: pointer;
                display: inline-block;
                position: absolute;
                right: 0;
                background-size: 25px 46px;
            }
        }
    }
</style>