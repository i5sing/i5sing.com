<template>
    <main>
        <Banner/>
        <Slogan/>
        <Carousel/>
        <About/>
        <MyFooter/>
    </main>
</template>
<script>
    import * as Banner from '../components/banner.vue';
    import * as Slogan from '../components/slogan.vue';
    import * as About from '../components/about.vue';
    import * as MyFooter from '../components/footer.vue';
    import * as Carousel from '../components/carousel.vue';

    export default {
        data (){
            return {}
        },
        methods: {},
        components: {
            Banner,
            Slogan,
            About,
            MyFooter,
            Carousel
        }
    }
</script>
<style lang="less">

</style>
