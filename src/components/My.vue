<template>
  <div class="dt-box">
    <div class="dt-item-4">
        <img src="../img/avatar.jpg">
    </div>
    <div class="dt-item-8">
        <ul class="dt-list-3 dt-light">
          <li>name: {{name}}</li>
          <li>follower: {{follower}}</li>
          <li>publish: {{publishNum}}</li>
          <li>power: {{power}}</li>
          <li>gold: {{gold}}</li>
        </ul>
        <h2>技能</h2>
        <ul class="dt-list-3 dt-light">
          <li v-for="item in abilities">
            {{ item.label }} : {{ item.abi }}
          </li>
        </ul>   
    </div>  
  </div>
  <div class="dt-box">
      <div class="dt-item-8">
          <h3 class="dt-light">day {{day}}</h3>
      </div>
      <div class="dt-item-2">
          <div class="dt-button" @click="clickNextDay">
              <a href="#">next</a>
          </div>
      </div>  
  </div>
</template>

<script>
import { nextDay, randomAbilities, dailyChange } from '../vuex/actions'
export default {
  vuex: {
    getters: {
      day: state => state.day,
      name: state => state.name,
      follower: state => state.follower,
      power: state => state.power,
      gold: state => state.gold,
      abilities: state => state.abilities,
      publishNum: state => state.videoList.length
    },
    actions: {
      nextDay,
      randomAbilities,
      dailyChange
    }
  },
  ready: function () {
    this.randomAbilities()
  },
  methods: {
    clickNextDay: function () {
      this.nextDay();
      this.dailyChange();
    }
  }
}
</script>

<style scoped>
    .up-item {
        border-bottom: 2px solid;
        margin-bottom: 50px;
    }
    .up-detail span {
        margin-right: 15px;
    }
</style>