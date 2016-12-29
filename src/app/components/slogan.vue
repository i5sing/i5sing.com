<template>
    <div class="slogan">
        <div class="slogan-content">
            <div class="slogan-left">
                <div class="subtitle wow slide-in-right">
                    <span>{{lang.slogan.LEFT_SUB_TITLE_2}}</span>
                    <span>{{lang.slogan.LEFT_SUB_TITLE_1}}</span>
                </div>
                <div class="title wow slide-in-right">{{lang.slogan.LEFT_TITLE}}</div>
            </div>
            <div class="slogan-center image"></div>
            <div class="slogan-right">
                <div class="title wow slide-in-left">{{lang.slogan.RIGHT_TITLE}}</div>
                <div class="subtitle wow slide-in-left">
                    <span>{{lang.slogan.RIGHT_SUB_TITLE_1}}</span>
                    <span>{{lang.slogan.RIGHT_SUB_TITLE_2}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import getLang from '../lang';

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
        methods: {},
        components: {}
    }
</script>
<style lang="less" scoped>
    .slogan {
        position: relative;
        font-size: 13px;
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
        display: inline-block;
        background-size: 243px 243px;
        width: 243px;
        height: 243px;
    }

    .slogan .subtitle span {
        display: block;
        margin-bottom: 15px;
    }

    .slogan .title {
        font-size: 25px;
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