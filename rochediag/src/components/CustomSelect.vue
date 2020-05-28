
<template>
        <div class="custom-select" :tabindex="tabindex" @blur="open = false" :value="value">
            <div class="selected" :class="{open: open}" @click="open = !open">
                {{ selected}}
            </div>
            <div class="items" :class="{selectHide: !open}">
                <div
                        v-bind:class="{'item-selected':((i+1)===value && deselect===false)}"
                        class="item"
                        v-for="(option, i) of options"
                        :key="i"
                        :value="i+1"
                        v-on:click="onSelected(option, i+1)"
                >{{ option }}</div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "CustomSelect",
        props: {
            options: {
                type: Array,
                required: true
            },
            tabindex: {
                type: Number,
                required: false,
                default: 0
            },
            deselect: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data: function() {
            return {
                value: 0,
                selected: "Sélectionner",
                open: false
            };
        },
        methods: {
            onSelected: function (option, value) {
                this.selected = option;
                this.value = value;
                this.open = false;
            }
        },
        watch: {
            deselect: function () {
                if (this.deselect) {
                    this.selected = "Sélectionner";
                    this.value = 0;
                }
            }
        }
    }

</script>

<style scoped>
    .custom-select {
        width: 100%;
        text-align: left;
        outline: none;
        line-height: 36px;
        position: relative;
    }

    .selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        border: 1px solid #808285;
        padding-left: 8px;
        padding-right: 8px;
        cursor: pointer;
        user-select: none;
    }

    .selected.open {
        border-radius: 6px 6px 0px 0px;
    }
    .selected.open:after {
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #474747;
        border-top: none;
    }
    .selected:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #474747;
    }

    .items {
        background-color: white;
        border-radius: 0px 0px 6px 6px;
        overflow: hidden;
        border-right: 1px solid #808285;
        border-left: 1px solid #808285;
        border-bottom: 1px solid #808285;
        position: absolute;
        z-index: 100;
        left: 0;
        right: 0;
    }

    .item {
        padding-left: 8px;
        cursor: pointer;
        user-select: none;

    }

    .item:hover, .item.item-selected:hover {
        background-color: #e1e1e1;
        color: black;
    }

    .item.item-selected {
        background-color: #0066cc;
        color: white;
    }
    .selectHide {
        display: none;
    }
</style>
