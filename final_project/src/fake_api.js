"use strict";

module.exports = {
    fetchItems() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(["eggs", "milk"])
            }, 3000)
        })
    }
}
