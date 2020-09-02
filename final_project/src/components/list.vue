<template>
<ul>
    <li v-for="(item,i) in items" :key="i">
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
