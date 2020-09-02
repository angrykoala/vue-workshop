<template>
<div>
    <h1>Details for {{item.value}}</h1>
    <p>Index: {{item.index}}</p>
    <button @click="onDelete" class="delete-button">Delete {{item.value}}</button>
</div>
</template>

<script>
"use strict";

module.exports = {
    props: ["item"],
    methods: {
        onDelete() {
            // Emits custom event to be caught by parent component
            this.$emit("deleteItem", this.item.index)
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    background-color: #e2e2e2;

    .delete-button {
        background-color: #c90000;
    }
}
</style>
