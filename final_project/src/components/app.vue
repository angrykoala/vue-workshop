<template>
<div>
    <template v-if="ready">
        <form @submit.prevent="onNewItem">
            <input type="text" v-model="newItem" placeholder="Item" />
            <button type="submit">Add</button>

            <list :items="items" @itemSelected="selectItem"></list>
        </form>

        <detail v-if="showDetails" :item="selectedItem" @deleteItem="deleteItem"></detail>
    </template>

    <p v-else>LOADING</p>

</div>
</template>


<script>
"use strict";

const {
    fetchItems
} = require('../fake_api.js')

const components = {
    'detail': require('./detail.vue'),
    'list': require('./list.vue')
}

module.exports = {
    components,
    data() {
        return {
            newItem: "",
            items: [],
            selectedItemIndex: null,
            ready: false
        }
    },
    mounted() {
        fetchItems().then((items) => {
            this.items = items
            this.ready = true
        })
    },
    computed: {
        showDetails() {
            return this.selectedItemIndex !== null;
        },
        selectedItem() {
            if (this.selectedItemIndex === null) return null;
            return {
                index: this.selectedItemIndex,
                value: this.items[this.selectedItemIndex]
            }
        }
    },
    methods: {
        onNewItem() {
            if (this.newItem)
                this.items.push(this.newItem);
            this.newItem = ""
        },
        deleteItem(index) {
            this.items.splice(index, 1);
            this.selectedItemIndex = null;
        },
        selectItem(index) {
            this.selectedItemIndex = index;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
