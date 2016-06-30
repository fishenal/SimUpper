class Store {
    constructor (key, isObj) {
        this.key = key
        this.isObj = !!isObj
    }
    fetch () {
        let empty = this.isObj ? '{}' : '[]'
        return JSON.parse(window.localStorage.getItem(this.key) || empty)
    }
    save (items) {
        window.localStorage.setItem(this.key, JSON.stringify(items))
    }
}
export let itemStore = new Store('simupper-item-store')
export let dayStore = new Store('simupper-day-store')
export let myStore = new Store('simupper-my-store', true)