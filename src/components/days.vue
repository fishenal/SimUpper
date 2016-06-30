<template>
<div class="dt-box">
    <div class="dt-item-8">
        <h3 class="dt-light">day {{day}}</h3>
    </div>
    <div class="dt-item-2">
        <div class="dt-button" v-on:click="nextDay">
            <a href="#">next</a>
        </div>
        
    </div>  
</div>
  
</template>

<script>
import { dayStore } from '../module/store.js'
// let dayStore = new Store('simupper-day-store')

export default {
  data () {
    let day = 0
    if (dayStore.fetch().length !== 0) {
        day = dayStore.fetch()
    }
    return {
        day: day
    }
  },
  methods: {
    nextDay: function () {
        this.day ++
        dayStore.save(this.day)
    }
  }
}
</script>

<style scoped>
    .dt-box {
        width: 100%;
    }
</style>
