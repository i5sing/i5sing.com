<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <article class="about image">
        <div class="desc wow slide-in-up">
            {{lang.about.DESCRIPTION}}
        </div>
        <Btn v-on:click="download()">{{lang.about.DOWNLOAD_BUTTON}}</Btn>
    </article>
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
            this.lang = getLang(this.lang);
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
    .about {
        background-size: 100% 448px;
        width: 100%;
        height: 448px;
        color: #121f27;
        font-size: 25px;
        text-align: center;
    }

    .about .desc {
        padding-top: 180px;
        margin: 0 auto;
    }

    .about .download-btn {
        margin-top: 75px;
    }
</style>