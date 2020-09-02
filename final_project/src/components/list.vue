<template>
<ul>
    <!-- Renders multiple li items-->
    <!-- Key is required for rendering optimisations, index works fine in most cases-->
    <li v-for="(item,i) in items" :key="i">
        <!-- using a only for styling purposes -->
        <!-- href will make the link have clickable style -->
        <!-- .prevent avoids default link behavior -->
        <a href="" @click.prevent="onSelect(i)">{{item}}</a>
    </li>
</ul>
</template>

<script>
"use strict";

module.exports = {
    props: ['items'],
    methods: {
        onSelect(index) {
            this.$emit("itemSelected", index);
        }
    }
}
</script>
