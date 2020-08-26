<template>
<div>
    <h1>Details For {{item.value}}</h1>
    <p>Index: {{item.index}}</p>
    <button @click="onDelete">Delete {{item.value}}</button>
</div>
</template>


<script>
"use strict";

module.exports = {
    props: ["item"],
    methods: {
        onDelete() {
            this.$emit("deleteItem", this.item.index)
        }
    }
}
</script>
