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

        },
        methods: {},
        components: {}
    }
</script>
<style lang="less">
    html, body {
        margin: 0;
        padding: 0;
        min-width: 1200px;
        font-family: "PingFangSC-Light", "Microsoft YaHei", "微软雅黑", sans-serif;
        color: #3a3b3c !important;
    }

    button {
        font-family: "PingFangSC-Light", "Microsoft YaHei", "微软雅黑", sans-serif;
    }

    @import "../resources/less/index.less";
</style>
