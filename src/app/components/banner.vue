<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="banner-wrapper image">
        <article class="banner image" id="banner">
            <div class="wrapper">
                <div class="logo image wow slide-in-up"></div>
                <div class="subtitle wow slide-in-up" data-wow-delay="0.5s">
                    {{lang.banner.SUB_TITLE}}
                </div>
                <Btn v-on:click="download()">{{lang.about.DOWNLOAD_BUTTON}}</Btn>
            </div>
        </article>
    </div>
</template>
<script>
    import getLang from '../../resources/lang';
    import * as Btn from './button.vue';

    export default {
        props: ['language'],
        data (){
            return {
                lang: getLang("en-US")
            }
        },
        beforeUpdate: function () {
            this.lang = getLang(this.language);
        },
        mounted: function () {
            let bannerEl = document.getElementById('banner');

            bannerEl.setAttribute('style', `height: ${window.innerHeight}px`);
            window.addEventListener('resize', () => {
                bannerEl.setAttribute('style', `height: ${window.innerHeight}px`);
            });
        },
        methods: {
            download: function () {
                window.open("./download/darwin", "_blank");
            }
        },
        components: {Btn}
    }
</script>
<style lang="less" scoped>
    .banner {
        position: relative;
        width: 100%;
        background-size: cover;
        height: 1000px;
    }

    .banner-wrapper {
        background-size: cover;
    }

    .banner .wrapper {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .banner .logo {
        margin: 0 auto;
        background-size: 473px 95px;
        width: 473px;
        height: 95px;
    }

    .banner .subtitle {
        margin: 35px auto 0 auto;
        color: #fffefe;
        font-size: 18px;
        background-size: 473px 29px;
        width: 473px;
        height: 29px;
    }

    .banner .download-btn {
        margin-top: 85px;
    }
</style>