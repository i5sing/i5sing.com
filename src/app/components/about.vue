<template>
    <article class="about" id="about">
        <div id="wave"></div>
        <div class="wave-bg-external">
            <div class="wave-bg-inner"></div>
        </div>
        <div class="desc wow slide-in-up">
            {{lang.about.DESCRIPTION}}
        </div>
        <div class="btn-group about-btn-group image wow slide-in-up" data-wow-delay="0.5s">
            <Btn :action="downloadMac" :value="lang.about.DOWNLOAD_MAC_BUTTON" type="mac"/>
            <Btn :action="downloadWin" :value="lang.about.DOWNLOAD_WIN_BUTTON" type="win"/>
        </div>
    </article>
</template>
<script>
    import getLang from '../../resources/lang';
    import * as Btn from './button.vue';
    import Siren from 'siren-wave';

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
            const waveEl = document.getElementById('wave');
            this.siren = new Siren({
                target: 'wave',
                height: 200,
                color: '#96ddf6',
                width: waveEl.clientWidth,
                waves: [
                    // small
                    {
                        alpha: 0.1,
                        yOffset: 40,
                        speed: 0.02 * 0.4,
                        angleStep: 0.0075,
                        peak: 35,
                        isPositive: true
                    },
                    // large
                    {
                        alpha: 0.1,
                        yOffset: -20,
                        speed: 0.05 * 0.4,
                        angleStep: 0.0055,
                        peak: 45,
                        isPositive: true
                    },
                    // middle
                    {
                        alpha: 0.2,
                        yOffset: 0,
                        speed: 0.025 * 0.4,
                        angleStep: 0.0055,
                        peak: 30,
                        isPositive: true
                    }
                ]
            });
            this.siren.draw();

            window.onresize = () => {
                this.siren.update({
                    width: waveEl.clientWidth
                });

                this.siren.draw();
            }
        },
        methods: {
            downloadMac: function () {
                window.open("./download/darwin");
            },
            downloadWin: function () {
                window.open("./download/win32");
            }
        },
        components: {Btn}
    };
</script>
<style lang="less" scoped>
    .about {
        position: relative;
        background-size: 100% 448px;
        width: 100%;
        height: 600px;
        color: #3a3b3c;
        font-size: 26px;
        text-align: center;
    }

    #wave {
        position: absolute;
        top: -50px;
        width: 100%;
    }

    .wave-bg-external, .wave-bg-inner {
        width: 100%;
        height: 100%;
        opacity: 0.1;
        background-color: #7cd5f4;
    }

    .wave-bg-external {
        position: absolute;
        height: 450px;
        top: 150px;
        opacity: 0.3;
        z-index: -1;
    }

    .about .desc {
        padding-top: 266px;
        margin: 0 auto;
    }

    .about .download-btn {
        margin-top: 50px;
    }

    .about-btn-group {
        margin: 0 auto;
        height: 155px;
        width: 530px;
    }
</style>