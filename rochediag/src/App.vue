<template>
    <div id="app">
        <component :is="headerApp">
            {{headerTitle}}
        </component>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {
                headerHomepageVisible: true,
                headerSmallVisible: false,
                homepageVisible: true,
                interpretationVisible: false,
                prescriptionVisible: false,
                sourcesVisible: false,
            }
        },
        computed: {
            headerApp() {
                return (this.$route.meta.headerApp);
            },
            headerTitle() {
                return (this.$route.meta.headerTitle);
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Verdana, Geneva, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        min-height: 100vh;
        background-color: white;
        overflow: scroll;
    }
</style>
