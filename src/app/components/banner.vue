<template>
    <div class="banner-wrapper image">
        <article class="banner image" id="banner">
            <div class="wrapper">
                <div class="logo image wow slide-in-up"></div>
                <div class="subtitle wow slide-in-up" data-wow-delay="0.5s">
                    {{lang.banner.SUB_TITLE}}
                </div>
                <div class="btn-group banner-btn-group image wow slide-in-up" data-wow-delay="0.7s">
                    <Btn :action="downloadMac" :value="lang.banner.DOWNLOAD_MAC_BUTTON" type="mac"/>
                    <Btn :action="downloadWin" :value="lang.banner.DOWNLOAD_WIN_BUTTON" type="win"/>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
    import getLang from '../../resources/lang';
    import * as Btn from './button.vue';

    export default {
        props: ['language'],
        data() {
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
            downloadMac: function () {
                window.open("./download/darwin_x64");
            },
            downloadWin: function () {
                window.open("./download/win32_x64");
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
        opacity: 0;
    }

    .banner .subtitle {
        margin: 25px auto 0 auto;
        color: #fffefe;
        font-size: 16px;
        background-size: 473px 29px;
        width: 473px;
        height: 29px;
        opacity: 0;
    }

    .banner .download-btn {
        margin-top: 40px;
    }

    .banner .banner-btn-group {
        margin-top: 40px;
        height: 130px;
        width: 515px;
        opacity: 0;
    }
</style>
