<template>
    <div id="interpretation">
        <h2>Quel est le résultat du test S100B ?</h2>
        <div class="range-container">
            <vue-range-slider :min="0" :max="1" :step="step" v-model="valueInputHTML" :tooltip-style="{display:'none'}" :dot-size="26" v-bind:class="[colorRange]"></vue-range-slider>
            <span>{{valueInterpretation}} μg/L</span>
        </div>
        <h2>Interprétation</h2>
        <p>
            {{ interpretation_msg }}
            <br>
            <br>
            <router-link to="sources" v-if="sourceLink">
                <span class="sources">Sources / CGU</span>
            </router-link>
        </p>
    </div>
</template>

<script>
    import 'vue-range-component/dist/vue-range-slider.css'
    import VueRangeSlider from 'vue-range-component'
    export default {
        name: 'interpretation',
        components: {
            VueRangeSlider
        },
        data: function () {
            return {
                step: 1/3 * 0.1,
                valueInputHTML: 0.0,
                valueInterpretation: 0.0,
                interpretation_msg: "Renseigner le résultat de votre test dans l'étape ci-dessus afin d'en connaître l'interprétation.",
                colorRange: 'color-gray',
                difUnTiers: 0.0,
                difDeuxTiers: 0.0,
                difTroisTiers: 0.0,
                sourceLink: false
            }
        },
        props: {
        },
        methods: {
        },
        watch: {
            valueInputHTML: function ()  {
                this.difDeuxTiers = ((1/3 / (((1/3 * 0.1) / 2) * 100)).toFixed(2) - (1/3 / (((1/3 * 0.1)) * 100)).toFixed(2)).toFixed(2)
                this.difTroisTiers = ((2/3 / (((1/3 * 0.1) / 7) * 100)).toFixed(2) - ((2/3 / (((1/3 * 0.1) / 2) * 100)) - this.difDeuxTiers).toFixed(2)).toFixed(2)
                if (this.valueInputHTML == 0) {
                    this.interpretation_msg = "Renseigner le résultat de votre test dans l'étape ci-dessus afin d'en connaître l'interprétation";
                    this.colorRange = "color-gray";
                    this.valueInterpretation =  0;
                    this.sourceLink= false;
                } else if (this.valueInputHTML <= 1/3) {
                    this.interpretation_msg = "";
                    this.colorRange = "color-green";
                    this.step = 1/3 * 0.1;
                    this.valueInterpretation = (this.valueInputHTML / (this.step * 100) - this.difUnTiers).toFixed(2);
                    this.interpretation_msg = "Un résultat inférieur au seuil de 0,10µg/L permet d’exclure une lésion cérébrale avec une VPN de 99% à 100% et ainsi éviter le recours au scanner. Un retour à domicile doit être envisagé.";
                    this.sourceLink = true;
                    if(this.valueInterpretation == 0.1) {
                        this.colorRange = "color-yellow";
                        this.interpretation_msg = "Possibilité d’une lésion cérébrale. Pratiquez un TDMc suivant les recommandations de prise en charge.";
                    }
                } else if (this.valueInputHTML <= 2/3) {
                    this.interpretation_msg = "Possibilité d’une lésion cérébrale. Pratiquez un TDMc suivant les recommandations de prise en charge.";
                    this.sourceLink = true;
                    this.colorRange = "color-yellow";
                    this.step = (1/3 * 0.1) / 2;
                    this.valueInterpretation = (this.valueInputHTML / (this.step * 100) - this.difDeuxTiers).toFixed(2);
                    if(this.valueInterpretation == 0.3) {
                        this.colorRange = "color-orange";
                        this.interpretation_msg = "Possibilité d’une lésion cérébrale. Pratiquez un TDMc suivant les recommandations de prise en charge.";
                    }
                } else if (this.valueInputHTML < 1) {
                    this.interpretation_msg = "Possibilité d’une lésion cérébrale. Pratiquez un TDMc suivant les recommandations de prise en charge.";
                    this.sourceLink = true;
                    this.colorRange = "color-orange";
                    this.step = (1/3 * 0.1) / 7;
                    this.valueInterpretation = (this.valueInputHTML / (this.step * 100) - this.difTroisTiers).toFixed(2);
                } else if (this.valueInputHTML == 1) {
                    this.interpretation_msg = "Possibilité d’une lésion cérébrale. Pratiquez un TDMc suivant les recommandations de prise en charge.";
                    this.sourceLink = true;
                    this.colorRange = "color-red";
                    this.valueInterpretation = 1;
                }
            },
        }
    }
</script>

<style>
    #interpretation h2 {
        color: #fff;
        font-size: 16px;
        background-color: #808285;
        width: calc(95% - 20px);
        margin-left: 2.5%;
        padding: 10px 10px;
        border-radius: 4px;
        text-align: left;
    }

    #interpretation .range-container {
        width: 90%;
        margin-left: 5%;
        margin-bottom: 35px;
    }

    #interpretation .range-container span {
        display: block;
        margin-top: 15px;
    }

    #interpretation input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 3px;
        border-radius: 5px;
        background: #dfdfdf;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    #interpretation input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px #fff solid;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
    }

    #interpretation input[type="range"]::-moz-range-thumb {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #dfdfdf;
        border: 3px #fff solid;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
    }

    #interpretation .vue-range-slider {

    }
    #interpretation .vue-range-slider .slider-dot{
        top: -13px !important;
        border: 3px solid white;
    }
    #interpretation .vue-range-slider.color-gray .slider-dot,
    #interpretation .vue-range-slider.color-gray .slider-process {
        background-color: #dfdfdf;
    }
    #interpretation .vue-range-slider.color-green .slider-dot,
    #interpretation .vue-range-slider.color-green .slider-process {
        background-color: #00925b;
    }
    #interpretation .vue-range-slider.color-yellow .slider-dot,
    #interpretation .vue-range-slider.color-yellow .slider-process {
        background-color: #ffd400;
    }
    #interpretation .vue-range-slider.color-orange .slider-dot,
    #interpretation .vue-range-slider.color-orange .slider-process {
        background-color: #f68b1f;
    }
    #interpretation .vue-range-slider.color-red .slider-dot,
    #interpretation .vue-range-slider.color-red .slider-process {
        background-color: #af1e2b;
    }

    #interpretation input[type=range]::-moz-range-progress {
        height: 3px;
    }

    #interpretation input[type="range"].color-gray::-webkit-slider-thumb {
        background: #dfdfdf;
    }
    #interpretation input[type="range"].color-gray::-moz-range-progress,
    #interpretation input[type="range"].color-gray::-moz-range-thumb {
        background: #dfdfdf;
    }

    #interpretation input[type="range"].color-green::-webkit-slider-thumb {
        background: #00925b;
    }
    #interpretation input[type="range"].color-green::-moz-range-progress,
    #interpretation input[type="range"].color-green::-moz-range-thumb {
        background: #00925b;
    }

    #interpretation input[type="range"].color-yellow::-webkit-slider-thumb {
        background: #ffd400;
    }
    #interpretation input[type="range"].color-yellow::-moz-range-progress,
    #interpretation input[type="range"].color-yellow::-moz-range-thumb {
        background: #ffd400;
    }

    #interpretation input[type="range"].color-orange::-webkit-slider-thumb {
        background: #f68b1f;
    }
    #interpretation input[type="range"].color-orange::-moz-range-progress,
    #interpretation input[type="range"].color-orange::-moz-range-thumb {
        background: #f68b1f;
    }

    #interpretation input[type="range"].color-red::-webkit-slider-thumb {
        background: #af1e2b;
    }
    #interpretation input[type="range"].color-red::-moz-range-progress,
    #interpretation input[type="range"].color-red::-moz-range-thumb {
        background: #af1e2b;
    }

    #interpretation p {
        width: 90%;
        margin-left: 5%;
        color: #474747;
        text-align: left;
        font-size: 14px;
    }

    #interpretation .sources, #interpretation a{
        color: #0066cc !important;
        text-decoration: none !important;
    }
</style>
