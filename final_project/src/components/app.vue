<template>
<div>
    <template v-if="ready">
        <form @submit.prevent="onNewItem">
            <input type="text" v-model="newItem" placeholder="Item" />
            <button type="submit">Add</button>

            <ul>
                <li v-for="(item,i) in items" :key="i">
                    <a href="" @click.prevent="selectUser(i)">{{item}}</a>
                </li>
            </ul>
        </form>


        <div v-if="showDetails">
            <h1>Details For {{selectedItem}}</h1>
            <p>Index: {{selectedItemIndex}}</p>
            <button @click="deleteItem(selectedItemIndex)">Delete {{selectedItem}}</button>
        </div>
    </template>

    <p v-else>LOADING</p>

</div>
</template>


<script>
"use strict";

const {
    fetchItems
} = require('../fake_api.js')


module.exports = {
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
            return this.items[this.selectedItemIndex];
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
        selectUser(index) {
            this.selectedItemIndex = index;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
