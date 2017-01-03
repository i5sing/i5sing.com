<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-left">
                <a href="http://i5sing.com">i5SING</a>&nbsp;&nbsp;
                <a href="https://github.com/i5sing" target="__blank">GITHUB</a>
            </div>
            <div class="footer-center">©2016. 辽ICP备16013530号</div>
            <div class="footer-right">
                Designed By <a href="http://weibo.com/323331314" target="_blank">宛安</a> &nbsp;&nbsp;
                Developed By <a href="http://miaowing.me" target="_blank">赵小峰</a>、
                <a href="http://yedaodao.com" target="_blank">叶刀刀</a>
            </div>
        </div>
    </footer>
</template>
<script>

</script>
<style lang="less" scoped>
    .footer {
        position: relative;
        background-color: #91b0c0;
        height: 80px;
        font-size: 10px;
        text-align: center;
        color: #fff;
    }

    .footer a {
        color: #fff;
        text-decoration: none;
    }

    .footer .footer-content {
        display: inline-block;
        width: 980px;
        line-height: 80px;

    }

    .footer .footer-content:after {
        content: '';
        clear: both;
        display: block;
    }

    .footer .footer-left {
        float: left;
    }

    .footer .footer-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .footer .footer-right {
        float: right;
    }
</style>