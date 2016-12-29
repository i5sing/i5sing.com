<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data (){
            return {}
        },
        mounted() {
            new WOW().init();
        },
        methods: {},
        components: {}
    }
</script>
<style lang="less">
    html, body {
        margin: 0;
        padding: 0;
        min-width: 980px;
        font-family: "PingFangSC-Light", "Microsoft YaHei", "微软雅黑", sans-serif;
        color: #121f27;
    }

    @import "../../less/index.less";
</style>
