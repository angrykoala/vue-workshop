<template>
<div>
    <template v-if="ready">
        <form @submit.prevent="onNewItem" class="item-form">
            <input type="text" v-model="newItem" placeholder="Item" :class="{invalid: !canAddItem}" />
            <button type="submit" :disabled="!canAddItem">Add</button>

            <list :items="items" @itemSelected="selectItem"></list>
        </form>

        <detail v-if="showDetails" :item="selectedItem" @deleteItem="deleteItem"></detail>
    </template>

    <p v-else>LOADING</p>

</div>
</template>


<script>
"use strict";

const components = {
    'detail': require('./detail.vue'),
    'list': require('./list.vue')
}

module.exports = {
    components,
    data() {
        return {
            newItem: "",
            selectedItemIndex: null,
            ready: false
        }
    },
    mounted() {
        // this.$store.dispatch("fetchItems").then(() => {
            this.ready = true
        // })
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
        },
        items() {
            return this.$store.state.items
        },
        canAddItem() {
            return this.newItem && this.items.length < 10;
        }
    },
    methods: {
        onNewItem() {
            if (this.canAddItem) {
                this.$store.commit("addItem", this.newItem);
                this.newItem = ""
            }
        },
        deleteItem(index) {
            this.$store.commit("deleteItem", index);
            this.selectedItemIndex = null;
        },
        selectItem(index) {
            this.selectedItemIndex = index;
        }
    }
};
</script>

<style lang="scss" scoped>
.invalid {
    border-color: red;
}

.item-form {
    width: 100%;
}
</style>
