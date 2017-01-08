<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <button type="button" data-wow-delay="0.5s"
            class="btn download-btn download-bg wow slide-in-up"
            v-on:click="action()">
        {{lang.about.DOWNLOAD_BUTTON}}
    </button>
</template>
<script>
    import getLang from '../../resources/lang';

    export default {
        props: ['language', 'action'],
        data (){
            return {
                lang: getLang("en-US")
            }
        },
        beforeUpdate: function () {
            this.lang = getLang(this.lang);
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .btn {
        outline: none;
        padding: 20px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .btn.download-btn {
        font-size: 18px;
        color: #fff;
        background-color: #f36f87;
        box-shadow: 2px 2px 30px 10px rgba(243, 111, 135, 0.1);
    }

    .btn.download-btn:hover {
        background-color: #ff6f87;
    }
</style>