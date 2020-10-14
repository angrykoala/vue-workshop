<template>
<!-- In Vue 2.x every component must have a single top-level item-->
<div>
    <!-- This if statement will affect any item inside template, template tag will not be render -->
    <template v-if="ready">
        <!-- @submit catches any submit event from the form, prevents will cancel any default browser behavior -->
        <form @submit.prevent="onNewItem" class="item-form">
            <!-- v-model binds a variable to the internal value of the input -->
            <!-- :class="{}" is one way of managing dynamic styles for components -->
            <input type="text" v-model="userInput" placeholder="Item" :class="{invalid: !canAddItem}" />
            <!-- We don't need @click event, as submit event will already take care of this click -->
            <button type="submit" :disabled="!canAddItem">Add</button>
        </form>
        <!-- Custom list component -->
        <list :items="items" @itemSelected="selectItem"></list>

        <!-- Custom detail component -->
        <detail v-if="showDetails" :item="selectedItem" @deleteItem="deleteItem"></detail>
    </template>
    <spinner v-else></spinner>

</div>
</template>


<script>
"use strict";

const components = {
    'detail': require('./detail.vue'),
    'list': require('./list.vue'),
    'spinner': require('./spinner.vue')
}

module.exports = {
    components,
    data() {
        return {
            userInput: "",
            selectedItemIndex: null,
            ready: false
        }
    },
    mounted() { // Called after the component is mounted (i.e. this is available)
        this.$store.dispatch("fetchItems").then(() => {
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
        },
        items() {
            return this.$store.state.items
        },
        canAddItem() {
            return this.userInput && this.items.length < 10;
        }
    },
    methods: {
        onNewItem() {
            if (this.canAddItem) {
                this.$store.commit("addItem", this.userInput);
                this.userInput = ""
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
