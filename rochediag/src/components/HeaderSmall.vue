<template>
    <div class="headerSmall">
        <div @click="goBack">
            <font-awesome-icon :icon="['fas', 'angle-left']" />
        </div>
        <h1>
            <slot></slot>
        </h1>
    </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleLeft);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

export default {
    name: 'header',
    props: {
      title: String
    },
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
}
</script>

<style>
.headerSmall {
    width: 100%;

    background-color: #0066cc;
    align-items: center;
    display: flex;
}

.headerSmall h1 {
    text-align: center;
    width: 100%;
    color: white;
    font-size: 22px;
    text-transform: uppercase;
}

.headerSmall #logo {
    height: 30px;
    margin-left: 15px;
}

.headerSmall svg {
    font-size: 44px;
    padding: 0 12px;
    color: #fff;
    cursor: pointer;
}
</style>
