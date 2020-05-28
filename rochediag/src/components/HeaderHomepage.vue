<template>
    <div class="headerHomepage">
        <img id="logo" src="../assets/rochelogo.png" alt="logo">
        <h1><slot></slot></h1>
        <a href="cmd://webview-close" class="close" v-if="isMobile">
            <font-awesome-icon :icon="['fas', 'times']" />
        </a>
    </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {isMobile} from 'mobile-device-detect'

library.add(faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

export default {
    name: 'header',
    props: {
    },
    data: function () {
        return {
            isMobile
        }
    }
}
</script>

<style>
.headerHomepage {
    width: 100%;

    background-color: #0066cc;
    align-items: center;
    display: flex;
}

.headerHomepage h1 {
    text-align: center;
    width: 100%;
    color: white;
    font-size: 26px;
}

.headerHomepage #logo {
    height: 30px;
    margin-left: 15px;
}

.headerHomepage .close {
    width: 32px;
    height: 32px;
    margin-right: 16px;
}

.headerHomepage .close svg {
    font-size: 32px;
    padding: 0 12px;
    color: #fff;
    cursor: pointer;
}
</style>
