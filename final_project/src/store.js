"use strict";
const Vuex = require("vuex").default;

const fakeApi = require('./fake_api.js');

module.exports = new Vuex.Store({
    state: {
        items: []
    },
    getters: {

    },
    mutations: {
        addItem(state, item) {
            state.items.push(item);
        },
        deleteItem(state, index) {
            state.items.splice(index, 1);
        },
        replaceItems(state, items) {
            state.items = items
        }
    },
    actions: {
        fetchItems(context) {
            return fakeApi.fetchItems().then((items) => {
                context.commit("replaceItems", items);
            })
        }
    }
});
