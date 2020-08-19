"use strict";

module.exports = {
  fetchItems() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
          resolve(["eggs", "milk", "the crucible of the doomslayer"])
      }, 3000)
    })
  }
}
