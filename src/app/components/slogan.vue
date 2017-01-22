<template>
    <article class="slogan">
        <div class="slogan-content">
            <div class="slogan-left">
                <div class="subtitle wow slide-in-right">
                    <span>{{lang.slogan.LEFT_SUB_TITLE_2}}</span>
                    <span>{{lang.slogan.LEFT_SUB_TITLE_1}}</span>
                </div>
                <div class="title wow slide-in-right">{{lang.slogan.LEFT_TITLE}}</div>
            </div>
            <div class="slogan-center image">
                <div class="flower_front image" id="flower_front" data-rotation="0"></div>
                <div class="flower_back image" id="flower_back" data-rotation="0"></div>
            </div>
            <div class="slogan-right">
                <div class="title wow slide-in-left">{{lang.slogan.RIGHT_TITLE}}</div>
                <div class="subtitle wow slide-in-left">
                    <span>{{lang.slogan.RIGHT_SUB_TITLE_1}}</span>
                    <span>{{lang.slogan.RIGHT_SUB_TITLE_2}}</span>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
    import getLang from '../../resources/lang';
    import TWEEN from 'tween.js';

    export default {
        props: ['language'],
        data (){
            return {
                lang: getLang("en-US")
            }
        },
        beforeUpdate: function () {
            this.lang = getLang(this.lang);
        },
        mounted: function () {
            const that = this;
            const flowerFrontEl = document.getElementById('flower_front');
            const flowerBackEl = document.getElementById('flower_back');
            const animationTime = 30000;

            new TWEEN.Tween(flowerFrontEl.dataset)
                .to({rotation: 360}, animationTime)
                .repeat(Infinity)
                .delay(0)
                .onUpdate(function () {
                    that.updateBox(flowerFrontEl, this);
                })
                .start();

            new TWEEN.Tween(flowerBackEl.dataset)
                .to({rotation: -360}, animationTime)
                .repeat(Infinity)
                .delay(0)
                .onUpdate(function () {
                    that.updateBox(flowerBackEl, this);
                })
                .start();

            this.animate();
        },
        methods: {
            animate: function (time) {
                requestAnimationFrame(this.animate);
                TWEEN.update(time);
            },
            updateBox: function (box, params) {
                let s = box.style,
                    transform = 'rotate(' + Math.floor(params.rotation) + 'deg)';
                s.webkitTransform = transform;
                s.mozTransform = transform;
                s.transform = transform;
            }
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .slogan {
        position: relative;
        font-size: 14px;
        text-align: center;
        background-color: rgba(243, 111, 135, 0.078);
        width: 100%;
        height: 450px;
        z-index: 43;
    }

    .slogan .slogan-content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 990px;
        transform: translate(-50%, -50%);
    }

    .slogan .slogan-center {
        position: relative;
        display: inline-block;
        width: 243px;
        height: 243px;
    }

    .flower_front, .flower_back {
        width: 243px;
        height: 243px;
        background-size: 243px 243px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .flower_front {
        z-index: 1;
    }

    .flower_back {
        opacity: 0.7;
    }

    .slogan .subtitle span {
        display: block;
        margin-bottom: 15px;
    }

    .slogan .title {
        font-size: 26px;
    }

    .slogan .slogan-left {
        margin-top: 80px;
        text-align: right;
        display: inline-block;
        vertical-align: top;
        width: 368px;
    }

    .slogan .slogan-left span:first-child {
        margin-top: 3px;
    }

    .slogan .slogan-right {
        margin-top: 80px;
        text-align: left;
        display: inline-block;
        vertical-align: top;
        width: 368px;
    }

    .slogan .slogan-right span:last-child {
        margin-bottom: 0;
    }

    .slogan .slogan-right .title {
        margin-bottom: 15px;
    }
</style>