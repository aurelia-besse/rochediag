<template>
    <div id="homepage">
        <p>
            <b>Dosage de la 100B aux urgences :</b>
            <br>
            Optimiser la prise en charge du TCL.
        </p>
        <router-link to="prescription"><button class="btn-blue" >Prescrire</button></router-link>
        <router-link to="interpretation"><button class="btn-blue">Interpréter</button></router-link>
        <a href="./depliant_S100B_TCL.pdf" target="_blank" @click="href('https://360medics.com/assets/media/roche/depliant_S100B_TCL.pdf')">
            <button class="btn-gray">En savoir plus</button>
        </a>
        <router-link to="sources"><span class="sources">Sources / CGU</span></router-link>
    </div>
</template>

<script>
    import {isIOS} from 'mobile-device-detect'
    export default {
        name: 'homepage',
        props: {
        },
        methods: {
            href: function (url) {
                if (isIOS){
                    let hrefTemp = 'medics://viewer?m_source=' + url;
                    window.open(hrefTemp, '_self')
                }
            }
        }
    }
</script>

<style>
    #homepage {
    }

    #homepage p {
        color: #808285;
        font-size: 18px;
    }

    #homepage button.btn-blue {
        text-transform: uppercase;
        width: 80%;
        color: #0066cc;
        font-size: 22px;
        font-weight: bold;
        border: 3px #0066cc solid;
        border-radius: 8px;
        background: none;
        padding: 15px 0px;
        margin-top: 20px;
        text-decoration: none;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        cursor: pointer;
    }

    #homepage button.btn-blue:hover {
        color: #fff;
        background-color: #0066cc;
    }

    #homepage button.btn-gray {
        width: 80%;
        color: #808285;
        font-size: 20px;
        font-weight: bold;
        border: 3px #808285 solid;
        border-radius: 8px;
        background: none;
        padding: 5px 0px;
        margin-top: 50px;
        text-decoration: none;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        cursor: pointer;
    }

    #homepage button.btn-gray:hover {
        color: #fff;
        background-color: #808285;
    }

    #homepage span {
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        font-size: 14px;
        color: #808285;
        font-weight: bold;
        text-decoration: none;
    }
    .sources {
        cursor: pointer;
    }
</style>
