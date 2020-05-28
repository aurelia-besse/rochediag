<template>
    <div id="prescription">
        <h2>Score de Glasgow</h2>
        <label class="label-select" for="ouverture-yeux">Ouverture des yeux</label>
        <select id="ouverture-yeux" v-if="isMobile">
            <option value="0" selected>Sélectionner</option>
            <option value="1">N'ouvre pas les yeux (pas de réponse occulaire)</option>
            <option value="2">Ouvre les yeux par stimulus de douleur</option>
            <option value="3">Ouvre les yeux sous commande verbale</option>
            <option value="4">Les yeux s'ouvrent spontanement</option>
        </select>
        <CustomSelect v-on:click.native="deselect=false"
                      v-else
                      id="ouverture-yeux"
                      :deselect="deselect"
                      :options="['N\'ouvre pas les yeux (pas de réponse occulaire)',
                                 'Ouvre les yeux par stimulus de douleur',
                                 'Ouvre les yeux sous commande verbale',
                                 'Les yeux s\'ouvrent spontanement']">
        </CustomSelect>

        <label class="label-select" for="reponse-verbale">Réponse Verbale</label>
        <select id="reponse-verbale" v-if="isMobile">
            <option value="0" selected>Sélectionner</option>
            <option value="1">Pas de réponse verbale</option>
            <option value="2">Sons imcompréhensibles</option>
            <option value="3">Mots inappropriés</option>
            <option value="4">Est désorienté et parle</option>
            <option value="5">Bien orienté</option>
        </select>
        <CustomSelect v-on:click.native="deselect=false"
                      v-else
                      id="reponse-verbale"
                      :deselect="deselect"
                      :options="['Pas de réponse verbale',
                                 'Sons imcompréhensibles',
                                 'Mots inappropriés',
                                 'Est désorienté et parle',
                                 'Bien orienté']">
        </CustomSelect>

        <label class="label-select" for="reponse-motrice">Réponse motrice</label>
        <select id="reponse-motrice" v-if="isMobile">
            <option value="0" selected>Sélectionner</option>
            <option value="1">Pas de réponse motrice</option>
            <option value="2">Extension à la douleur</option>
            <option value="3">Flexion à la douleur</option>
            <option value="4">Retrait à la douleur</option>
            <option value="5">Localise la douleur</option>
            <option value="6">Obéit aux commandes</option>
        </select>
        <CustomSelect v-on:click.native="deselect=false"
                      v-else
                      id="reponse-motrice"
                      :deselect="deselect"
                      :options="['Pas de réponse motrice',
                                 'Extension à la douleur',
                                 'Flexion à la douleur',
                                 'Retrait à la douleur',
                                 'Localise la douleur',
                                 'Obéit aux commandes']">
        </CustomSelect>

        <button class="btn-blue" @click="calculGlasgow">Valider</button>
        <div class="result-display">
            <span class="blue">score de Glasgow</span>
            <span class="result">{{ resultGlasgow }}</span>
        </div>
        <div class="reset-btn">
            <button @click="resetForm">Réinitialiser</button>
        </div>

        <div v-if="informationsVisible">
            <h2>Informations complémentaires</h2>
            <div @click="question1Handler" :class="{'inputMobile': isMobile}">
                <p class="question">Est ce que au moins l'un des critères suivant est rempli ?</p>

                <div class="question-selection">
                    <input type="radio" id="q1r1" name="question1" value="1">
                    <label for="q1r1">Crise convulsive post-traumatique</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q1r2" name="question1" value="1">
                    <label for="q1r2">Déficit neurologique focalisé</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q1r3" name="question1" value="1">
                    <label for="q1r3">Signes cliniques de fracture de la base du crane</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q1r4" name="question1" value="1">
                    <label for="q1r4">Traitement par anticoagulants ou trouble de la coagulation</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q1r5" name="question1" value="0">
                    <label for="q1r5">Aucun</label>
                </div>
            </div>

            <div @click="question2Handler" v-if="question2Visible" :class="{'inputMobile': isMobile}">
                <p class="question">Est ce que au moins l'un des critères suivant est rempli ?</p>

                <div class="question-selection">
                    <input type="radio" id="q2r1" name="question2" value="1">
                    <label for="q2r1">Amnésie des faits supérieur à 30min avant le TCL (amnésie Rétrograde)</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q2r2" name="question2" value="1">
                    <label for="q2r2">Perte de conscience ou amnésie des faits associée à : piéton renversé par un véhicule, patient éjécté d'un véhicule, chute d'une hauteur supérieur à 1m</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q2r3" name="question2" value="1">
                    <label for="q2r3">Vomissements supérieur à 2 épisodes</label>
                </div>
                <div class="question-selection">
                    <input type="radio" id="q2r4" name="question2" value="0">
                    <label for="q2r4">Aucun</label>
                </div>
            </div>

        </div>

        <div v-if="prescriptionResultVisible">
            <h2>Prescription</h2>
            <span class="msg-result">{{ prescriptionMessage }}</span>
        </div>

        <div class="footer"></div>
    </div>
</template>

<script>
import CustomSelect from "./CustomSelect";
import {isMobile} from 'mobile-device-detect'
export default {
    name: 'interpretation',
    components: {CustomSelect},
    data: function () {
        return {
            resultGlasgow: 0,
            prescriptionResultVisible: false,
            prescriptionMessage: String,
            informationsVisible: false,
            question2Visible: false,
            deselect: false,
            isMobile
        }
    },
    props: {
    },
    methods: {
        resetForm: function () {
            this.informationsVisible = false;
            this.question2Visible = false;
            this.question3Visible = false;
            this.prescriptionResultVisible = false;

            if(isMobile) {
                document.getElementById("ouverture-yeux").value = "0";
                document.getElementById("reponse-verbale").value = "0";
                document.getElementById("reponse-motrice").value = "0";

                document.getElementById("ouverture-yeux").style.border = "1px #808285 solid";
                document.getElementById("reponse-verbale").style.border = "1px #808285 solid";
                document.getElementById("reponse-motrice").style.border = "1px #808285 solid";
            } else {
                this.deselect = true;

                document.getElementById("ouverture-yeux").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
                document.getElementById("reponse-verbale").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
                document.getElementById("reponse-motrice").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
            }
            this.resultGlasgow = 0;


        },
        calculGlasgow: function () {
            let valueOuverture;
            let valueMotrice;
            let valueVerbale;
            if(isMobile) {
                valueOuverture = Number(document.getElementById("ouverture-yeux").value);
                valueVerbale = Number(document.getElementById("reponse-verbale").value);
                valueMotrice = Number(document.getElementById("reponse-motrice").value);

                document.getElementById("ouverture-yeux").style.border = "1px #808285 solid";
                document.getElementById("reponse-verbale").style.border = "1px #808285 solid";
                document.getElementById("reponse-motrice").style.border = "1px #808285 solid";
            } else {
                valueOuverture = Number(document.getElementById("ouverture-yeux").getAttribute("value"));
                valueVerbale = Number(document.getElementById("reponse-verbale").getAttribute("value"));
                valueMotrice = Number(document.getElementById("reponse-motrice").getAttribute("value"));

                document.getElementById("ouverture-yeux").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
                document.getElementById("reponse-verbale").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
                document.getElementById("reponse-motrice").getElementsByClassName("selected")[0].style.border = "1px #808285 solid";
            }

            this.resultGlasgow = valueOuverture + valueVerbale + valueMotrice;

            this.informationsVisible = false;
            this.question2Visible = false;
            this.question3Visible = false;
            const radios = document.getElementsByName('question1');
            for (var i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                    radios[i].checked = false;
                }
            }

            if (this.resultGlasgow <= 8) {
                this.prescriptionMessage = "Se conformer aux recommandations de prise en charge pour un traumatisme cranien sévère.";
                this.prescriptionResultVisible = true;
                this.informationsVisible = false;
            } else if (this.resultGlasgow > 8 && this.resultGlasgow <= 13) {
                this.prescriptionMessage = "Réaliser un TDMc dans l'heure.";
                this.prescriptionResultVisible = true;
                this.informationsVisible = false;
            } else {
                this.prescriptionResultVisible = false;
                this.informationsVisible = true;
            }

            if (valueOuverture == 0){
                if(isMobile) {
                    document.getElementById("ouverture-yeux").style.border = "1px red solid";
                } else {
                    document.getElementById("ouverture-yeux").getElementsByClassName("selected")[0].style.border = "1px red solid";
                }
                this.resultGlasgow = 0;
                this.prescriptionResultVisible = false;
                this.informationsVisible = false;
            } if (valueVerbale == 0) {
                if(isMobile) {
                    document.getElementById("reponse-verbale").style.border = "1px red solid";
                } else {
                    document.getElementById("reponse-verbale").getElementsByClassName("selected")[0].style.border = "1px red solid";
                }
                this.resultGlasgow = 0;
                this.prescriptionResultVisible = false;
                this.informationsVisible = false;
            } if (valueMotrice == 0) {
                if(isMobile) {
                    document.getElementById("reponse-motrice").style.border = "1px red solid";
                } else {
                    document.getElementById("reponse-motrice").getElementsByClassName("selected")[0].style.border = "1px red solid";
                }
                this.resultGlasgow = 0;
                this.prescriptionResultVisible = false;
                this.informationsVisible = false;
            }
        },

        question1Handler: function() {
            const radios = document.getElementsByName('question1');

            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if (radios[i].value == "1") {
                        this.prescriptionMessage = "Réaliser un TDMc dans l'heure.";
                        this.prescriptionResultVisible = true;
                        this.question2Visible = false;
                    } else if (radios[i].value == "0" && this.resultGlasgow == 14) {
                        this.prescriptionMessage = "Si le délais entre le choc et le prélèvement est inférieur à 3h : réalisez le dosage de la S100B qui permettra si il est négatif d’éviter le scanner induisant des délais, des couts et des radiations inutiles. Information : la prise d'alcool ou la fonction rénale n'influencent pas l'interprétation du dosage.";
                        this.prescriptionResultVisible = true;
                    } else if (radios[i].value == "0" && this.resultGlasgow == 15) {
                        this.question2Visible = true;
                        this.prescriptionResultVisible = false;
                    }
                }
            }
        },

        question2Handler: function() {
            const radios = document.getElementsByName('question2');

            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if (radios[i].value == "0" && this.resultGlasgow == 15) {
                        this.prescriptionMessage = "Retour à domicile avec consignes de surveillance.";
                        this.prescriptionResultVisible = true;
                    } else if (radios[i].value == "1" && this.resultGlasgow == 15){
                        this.prescriptionMessage = "Si le délais entre le choc et le prélèvement est inférieur à 3h : réalisez le dosage de la S100B qui permettra si il est négatif d’éviter le scanner induisant des délais, des couts et des radiations inutiles. Information : la prise d'alcool ou la fonction rénale n'influencent pas l'interprétation du dosage.";
                        this.prescriptionResultVisible = true;
                    }
                }
            }
        },

    }
}
</script>

<style>
#prescription {
}

#prescription h2 {
    color: #fff;
    font-size: 16px;
    background-color: #808285;
    width: calc(95% - 20px);
    margin-left: 2.5%;
    padding: 10px 10px;
    border-radius: 4px;
    text-align: left;
}

#prescription button.btn-blue {
    color: #fff;
    font-size: 16px;
    background-color: #0066cc;
    width: 90%;
    padding: 10px 0px;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    cursor: pointer;
}

#prescription label.label-select {
    width: 95%;
    display: block;

    text-align: left;
    padding-left: 5%;
    text-transform: uppercase;
    font-size: 12px;
    color: #808285;
    font-weight: bold;
}

#prescription select {
    width: 90%;
    -webkit-appearance: none;
    appearance: none;
    padding: 8px;
    background: none;
    border: 1px #808285 solid;
    border-radius: 0px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 12px;
}
#prescription .custom-select {
    width: 90%;
    margin: 5px auto 15px auto;
    font-size: 12px;
    font-weight: bold;
}

#prescription div.result-display {
    display: flex;
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    margin-bottom: 5px;
    justify-content: space-between;
}

#prescription span.blue {
    color: #0066cc;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
}

#prescription span.result {
    border: 1px #808285 solid;
    padding: 5px 25px;
}

#prescription span.msg-result {
    display: block;
    width: 90%;
    margin-left: 5%;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
}

#prescription p.question {
    display: block;
    width: 90%;
    margin-left: 5%;
    text-align: left;
    font-weight: bold;
}

#prescription div.question-selection {
    display: flex;
    text-align: left;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 15px;
}

#prescription div.question-selection input[type="radio"] {
    margin-right: 20px;
}

#prescription div.reset-btn {
    display: block;
    width: 90%;
    margin-left: 5%;
    text-align: right;
}

#prescription div.reset-btn button {
    font-size: 14px;
    text-decoration: underline;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
}

#prescription div.footer {
    height: 50px;
}

    #prescription .inputMobile input[type="radio" ]{
        flex: 7%;
        max-width: 7%;
    }
    #prescription .inputMobile label {
        flex: 93%;
        max-width: 93%;
    }
</style>
